import { GameState } from '@/types/GameState';

const games: Record<string, { name: string; state: GameState }> = {
  'aebd13a2-2f8e-4556-9fd7-513068ee668f': {
    name: 'Glider',
    state: {
      '0': {
        '0': true,
        '-3': false,
      },
      '1': {
        '0': true,
        '-2': true,
      },
      '2': {
        '0': true,
        '-1': true,
      },
      '3': {
        '1': false,
      },
      '13': {
        '12': false,
        '13': false,
      },
      '-2': {
        '0': false,
      },
      '-1': {
        '0': false,
      },
    },
  },
  '54fb4d51-3025-4caf-9555-3efa71079aee': {
    name: 'Infinite 2',
    state: {
      '0': {
        '-4': true,
      },
      '-7': {
        '0': true,
      },
      '-5': {
        '0': true,
        '-1': true,
      },
      '-3': {
        '-2': true,
        '-3': true,
        '-4': true,
      },
      '-1': {
        '-3': true,
        '-4': true,
        '-5': true,
      },
    },
  },
  'bb52fd62-5761-42b3-a99c-56f407acc210': {
    name: 'Infinite',
    state: {
      '-7': {
        '0': true,
        '-3': true,
        '-4': true,
      },
      '-6': {
        '-1': true,
        '-4': true,
      },
      '-5': {
        '0': true,
        '-1': true,
        '-4': true,
      },
      '-3': {
        '0': true,
        '-1': true,
        '-2': true,
        '-4': true,
      },
      '-4': {
        '-2': true,
      },
    },
  },
};

export default games;
