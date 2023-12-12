import GameOfLife from '@/components/GameOfLife';

export default function GamePage({
  params: { gameId },
}: {
  params: { gameId: string };
}) {
  return (
    <main className='w-full h-[100vh] relative'>
      <GameOfLife gameId={gameId} />
    </main>
  );
}
