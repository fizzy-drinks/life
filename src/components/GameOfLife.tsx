'use client';

import { useEffect, useState } from 'react';

import ClickListener from './ClickListener';
import Controls from './Controls';
import GameProvider from './GameContext';
import Grid from './Grid';
import LiveCells from './LiveCells';
import Tutorial from './Tutorial';
import VisualisationProvider from './VisualisationContext';

const GameOfLife = ({ gameId }: { gameId?: string }) => {
  const [tutorial, setTutorial] = useState(false);
  const toggleTutorial = () =>
    setTutorial((p) => {
      localStorage.setItem('tutorial-ok', 'ok');
      return !p;
    });

  useEffect(() => {
    setTutorial(!localStorage.getItem('tutorial-ok'));
  }, []);

  return (
    <GameProvider gameId={gameId}>
      <VisualisationProvider>
        <Grid />
        <LiveCells />
        <ClickListener />
        <Controls onHelp={toggleTutorial} />
        <Tutorial visible={tutorial} onClose={toggleTutorial} />
      </VisualisationProvider>
    </GameProvider>
  );
};

export default GameOfLife;
