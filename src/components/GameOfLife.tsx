import ClickListener from './ClickListener';
import Controls from './Controls';
import GameProvider from './GameContext';
import Grid from './Grid';
import LiveCells from './LiveCells';
import VisualisationProvider from './VisualisationContext';

const GameOfLife = ({ gameId }: { gameId?: string }) => {
  return (
    <GameProvider gameId={gameId}>
      <VisualisationProvider>
        <Grid />
        <LiveCells />
        <ClickListener />
        <Controls />
      </VisualisationProvider>
    </GameProvider>
  );
};

export default GameOfLife;
