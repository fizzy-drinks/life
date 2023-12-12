import { getGame, newGame, setGame } from '@/services/GameService';
import { NextApiHandler } from 'next';
import { NextRequest, NextResponse } from 'next/server';

const handler: NextApiHandler = async function (req, res) {
  const game = getGame(req.query.gameId as string);
  if (!game) {
    res.status(404);
    res.send('Not found');
    return;
  }

  if (req.method === 'GET') {
    res.json(game);
    return;
  }

  if (req.method === 'PUT') {
    res.json(setGame(req.query.gameId as string, JSON.parse(req.body)));
  }
};

export default handler;
