import Link from 'next/link';
import { FC, HTMLAttributes } from 'react';

import Button from '@/components/Button';
import { Heading, Heading2, Paragraph } from '@/components/Typography';

const Li: FC<HTMLAttributes<HTMLLIElement>> = (props) => (
  <li className='list-outside list-disc mb-3' {...props} />
);

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-center mx-auto w-[840px]'>
      <Heading id='conway-s-game-of-life'>Conway&#39;s Game of Life</Heading>
      <Link href='/life'>
        <Button className='text-2xl p-4 my-4'>Run the app</Button>
      </Link>
      <Paragraph>
        This is an implementation of Conway&#39;s Game of Life using Next.js.
      </Paragraph>
      <Heading2 id='requirements'>Requirements</Heading2>
      <ul>
        <Li>
          Build a web version of Conway&#39;s Game of Life that:
          <ul>
            <Li>Has a UI that allows turning squares on and off;</Li>
            <Li>
              Allows step-by-step navigation (advance both single and multiple
              steps); and
            </Li>
            <Li>Allows playing Life forever given the provided state</Li>
          </ul>
        </Li>
        <Li>Simulate an API service that provides the game&#39;s back end.</Li>
      </ul>
      <Heading2 id='tech-stack'>Tech stack</Heading2>
      <Paragraph>
        The challenge&#39;s only requirements with regards to technology are
        that it is a web-based game and that it simulates an API connection.
        Therefore, the tech stack was chosen as follows:
      </Paragraph>
      <ul>
        <Li>
          TypeScript, to ensure faster development of communications between the
          API and front end;
        </Li>
        <Li>
          Next.js for quick project scaffolding and built-in API and server-side
          rendering;
        </Li>
        <Li>TailwindCSS for quick visual prototyping</Li>
      </ul>
    </main>
  );
}
