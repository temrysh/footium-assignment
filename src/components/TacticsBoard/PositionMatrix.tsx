import { Player } from "../../utility/types";

type MtxRow = number[];
type Matrix = MtxRow[];
type PositionMatrixProps = {
  field: Player[];
  renderItem: (p: Player) => React.ReactNode;
};

// Hardcoded formation 4-3-3 WIDE
const get433WideFormationMtx = (): Matrix => [
  [0, 1, 1, 1, 0],
  [0, 0, 0, 0, 0],
  [0, 1, 1, 1, 0],
  [0, 0, 0, 0, 0],
  [1, 1, 0, 1, 1],
  [0, 0, 0, 0, 0],
  [0, 0, 1, 0, 0],
];

const mapToMatrix = (mtx: Matrix) => (field: Player[]) =>
  mtx.map((row) =>
    row.map((shouldFill) => (shouldFill ? field.shift() : null))
  );

const PositionMatrix: React.FC<PositionMatrixProps> = ({
  field,
  renderItem,
}) => {
  const formationMtx = get433WideFormationMtx();
  const matrix = mapToMatrix(formationMtx)([...field]);

  return (
    <div className="relative w-full h-full grid grid-flow-row grid-cols-5 gap-x-[4px]">
      {matrix.map((row, ridx) =>
        row.map((player, cidx) => (
          <div
            key={player?.id || `${ridx}-${cidx}`}
            className="flex justify-center items-center min-h-[100px] overflow-hidden"
          >
            {player ? renderItem(player) : null}
          </div>
        ))
      )}
    </div>
  );
};

export default PositionMatrix;
