import { NextApiHandler } from 'next';

import { getGame, setGame } from '@/services/GameService';

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
    const { name, state } = JSON.parse(req.body);
    res.json(setGame(req.query.gameId as string, name, state));
  }
};

export default handler;
