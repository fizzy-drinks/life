import getNextState from '@/helpers/getNextState';
import { GameState } from '@/types/GameState';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { v4 } from 'uuid';

const gamesStore: Record<string, GameState> = existsSync('games.dat')
  ? JSON.parse(readFileSync('games.dat').toString())
  : {};

export function newGame() {
  const newId = v4();
  gamesStore[newId] = {};

  writeFileSync('games.dat', JSON.stringify(gamesStore));

  return newId;
}

export function getGame(id: string) {
  return gamesStore[id];
}

export function getGames() {
  return gamesStore;
}

export function setGame(id: string, state: GameState) {
  gamesStore[id] = state;

  writeFileSync('games.dat', JSON.stringify(gamesStore));

  return gamesStore[id];
}

export function next(id: string) {
  gamesStore[id] = getNextState(gamesStore[id]);

  return gamesStore[id];
}
