import getNextState from '@/helpers/getNextState';
import { GameState } from '@/types/GameState';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { v4 } from 'uuid';

const gamesStore: Record<string, { state: GameState; name: string }> =
  existsSync('games.dat')
    ? JSON.parse(readFileSync('games.dat').toString())
    : {};

export function newGame() {
  const newId = v4();
  gamesStore[newId] = { state: {}, name: newId };

  writeFileSync('games.dat', JSON.stringify(gamesStore));

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

  writeFileSync('games.dat', JSON.stringify(gamesStore));

  return gamesStore[id];
}

export function next(id: string) {
  gamesStore[id].state = getNextState(gamesStore[id].state);

  return gamesStore[id];
}
