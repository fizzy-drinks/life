'use client';

import ClickListener from './ClickListener';
import Grid from './Grid';
import LiveCells from './LiveCells';
import { GameState } from '@/types/GameState';
import { useInterval } from 'usehooks-ts';
import getNextState from '@/helpers/getNextState';
import Controls from './Controls';
import GameProvider from './GameContext';
import VisualisationProvider from './VisualisationContext';
import { useEffect, useState } from 'react';

const GameOfLife = ({ gameId }: { gameId?: string }) => {
  const [id, setId] = useState<string>(gameId || '');

  return (
    <GameProvider gameId={id}>
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
