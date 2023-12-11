import { GameState } from '@/types/GameState';

const neighbourCoords = (x: number, y: number): [number, number][] => [
  [x, y - 1],
  [x + 1, y - 1],
  [x + 1, y],
  [x + 1, y + 1],
  [x, y + 1],
  [x - 1, y + 1],
  [x - 1, y],
  [x - 1, y - 1],
];

const neighbourCount = (state: GameState, x: number, y: number): number => {
  const all = neighbourCoords(x, y).map(([x, y]) => state[x]?.[y] === true);

  return all.reduce((a, i) => a + Number(i), 0);
};

const getNextState = (state: GameState): GameState => {
  const newState: GameState = {};

  Object.entries(state).forEach(([x, row]) => {
    Object.entries(row)
      .filter(([, active]) => active)
      .forEach(([y]) => {
        const nx = Number(x);
        const ny = Number(y);

        const deadNeighbours = neighbourCoords(nx, ny).filter(
          ([x, y]) => state[x]?.[y] !== true,
        );

        deadNeighbours.forEach(([x, y]) => {
          const liveNeighbours = neighbourCount(state, x, y);
          if (liveNeighbours !== 3) return;

          if (!newState[x]) newState[x] = {};

          newState[x][y] = true;
        });

        const liveNeighbours = neighbourCount(state, nx, ny);
        if (liveNeighbours < 2 || liveNeighbours > 3) return;

        if (!newState[nx]) newState[nx] = {};

        newState[nx][ny] = true;
      });
  });

  return newState;
};

export default getNextState;
