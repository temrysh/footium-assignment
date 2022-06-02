import Pitch from "./Pitch/Pitch";
import Substitute from "./Substitute/Substitute";
import PlayerCard from "./PlayerCard/PlayerCard";
import classes from "./TacticsBoard.module.css";
import { Player } from "../../utility/types";
import PositionMatrix from "./PositionMatrix";
import WithDnD from "./WithDnD";
import { useStream, field$, subs$, replace$ } from "../../utility/streams";

const TacticsBoard: React.FC = () => {
  const [field] = useStream<Player[]>(field$);
  const [subs] = useStream<Player[]>(subs$);

  return (
    <div className={classes.container}>
      <div className={classes.board}>
        <Pitch />
        <div className="absolute top-0 left-0 right-0 bottom-0">
          <PositionMatrix
            field={field}
            renderItem={(player) => (
              <WithDnD
                key={player.id}
                player={player}
                onDrop={(r) => replace$.next(r)}
              >
                <PlayerCard player={player} />
              </WithDnD>
            )}
          />
        </div>
      </div>
      <div className={classes.subsCol}>
        {subs.map((player) => (
          <WithDnD
            key={player.id}
            player={player}
            onDrop={(r) => replace$.next(r)}
          >
            <Substitute player={player} />
          </WithDnD>
        ))}
      </div>
    </div>
  );
};

export default TacticsBoard;
