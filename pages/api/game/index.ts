import { getGames, newGame, setGame } from '@/services/GameService';
import { NextApiHandler } from 'next';

const handler: NextApiHandler = async function POST(req, res) {
  if (req.method === 'POST') {
    const id = newGame();
    const { name, state } = JSON.parse(req.body);
    setGame(id, name, state || {});

    res.json(id);
    return;
  }

  res.json(getGames());
};

export default handler;
