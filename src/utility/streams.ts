import { useEffect, useState } from "react";
import { BehaviorSubject, Subject, pipe } from "rxjs";
import { withLatestFrom, filter, map } from "rxjs/operators";
import { team1 } from "../data";
import { Player, Replace } from "../utility/types";

export const field$ = new BehaviorSubject<Player[]>(team1.firstEleven);
export const subs$ = new BehaviorSubject<Player[]>(team1.subs);
export const replace$ = new Subject<Replace>();

export const useStream = <T>(
  stream$: BehaviorSubject<T>
): [T, (s: T) => void] => {
  const [state, setState] = useState<T>(stream$?.getValue());

  useEffect(() => {
    const subscription = stream$.subscribe(setState);
    return () => subscription.unsubscribe();
  }, [stream$]);

  return [state, (s: T) => stream$.next(s)];
};

const filterDrop = ([r, arr]: [Replace, Player[]]) => {
  const rids = [r.replace.id, r.with.id];
  const ids = arr.map(({ id }) => id);
  return rids.some((id) => ids.includes(id));
};

const replacePlayersWhenFound = ([r, arr]: [Replace, Player[]]) => {
  const cloneArr = [...arr];
  const ridx = cloneArr.findIndex((p) => p.id === r.replace.id);
  const widx = cloneArr.findIndex((p) => p.id === r.with.id);
  if (ridx >= 0) cloneArr[ridx] = r.with;
  if (widx >= 0) cloneArr[widx] = r.replace;
  return cloneArr;
};

const filterAndReplacePipe = pipe(
  filter(filterDrop),
  map(replacePlayersWhenFound)
);

replace$.pipe(withLatestFrom(field$), filterAndReplacePipe).subscribe(field$);
replace$.pipe(withLatestFrom(subs$), filterAndReplacePipe).subscribe(subs$);
