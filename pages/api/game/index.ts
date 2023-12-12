import { getGames, newGame, setGame } from '@/services/GameService';
import { NextApiHandler } from 'next';

const handler: NextApiHandler = async function POST(req, res) {
  if (req.method === 'POST') {
    const id = newGame();
    setGame(id, id, req.body || {});

    res.json(id);
    return;
  }

  res.json(getGames());
};

export default handler;
