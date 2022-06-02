import { useDrag, useDrop } from "react-dnd";
import { Player, Replace } from "../../utility/types";

type WithDnDProps = {
  children: React.ReactNode;
  player: Player;
  onDrop: (arg: Replace) => void;
};

const WithDnD: React.FC<WithDnDProps> = ({ children, player, onDrop }) => {
  const [, drop] = useDrop(() => ({
    accept: player?.isGk ? "GK" : "MORTAL",
    drop: (dropped: Player) => onDrop({ replace: player, with: dropped }),
  }));

  const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
    type: player?.isGk ? "GK" : "MORTAL",
    item: player,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div ref={drop} className="flex w-[130px] h-[105px]">
      <div
        ref={dragPreview}
        className={`w-full h-full transition ${
          isDragging ? "opacity-[0.5] scale-[0.8]" : "opacity-1 scale-1"
        }`}
      >
        <div
          ref={drag}
          className="w-full h-full flex justify-center items-center"
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default WithDnD;
