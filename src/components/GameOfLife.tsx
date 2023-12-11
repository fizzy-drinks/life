'use client';

import { useState } from 'react';
import ClickListener from './ClickListener';
import Grid from './Grid';
import LiveCells from './LiveCells';
import { GameState } from '@/types/GameState';
import { useInterval } from 'usehooks-ts';
import getNextState from '@/helpers/getNextState';
import Controls from './Controls';
import GameProvider from './GameContext';
import VisualisationProvider from './VisualisationContext';

const GameOfLife = () => {
  return (
    <GameProvider>
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
