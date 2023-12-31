import { v4 } from 'uuid';

import gamesStore from '@/helpers/games';
import getNextState from '@/helpers/getNextState';
import { GameState } from '@/types/GameState';

export function newGame() {
  const newId = v4();
  gamesStore[newId] = { state: {}, name: newId };

  return newId;
}

export function getGame(id: string) {
  return gamesStore[id];
}

export function getGames() {
  return gamesStore;
}

export function setGame(id: string, name: string, state: GameState) {
  gamesStore[id] = { name, state };

  return gamesStore[id];
}

export function next(id: string) {
  gamesStore[id].state = getNextState(gamesStore[id].state);

  return gamesStore[id];
}
