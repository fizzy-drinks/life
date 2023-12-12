import Link from 'next/link';

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-center p-24'>
      <h1>Hello world!</h1>
      <p>This is where the Readme content will go later.</p>
      <p>
        The app is{' '}
        <Link href='/life' className='text-blue-300'>
          here
        </Link>
        .
      </p>
    </main>
  );
}
