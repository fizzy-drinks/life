# Conway's Game of Life

This is an implementation of Conway's Game of Life using Next.js.

# Running the app

It's available [online](https://life-indol-seven.vercel.app/life) if you want to run it without installing!

If you want to run it locally however, you can generate a production build by having Node.js installed in your machine and following the steps below on terminal:

```sh
npm i
npm run build
npm start
```

# Requirements

* Build a web version of Conway's Game of Life that:
  * Has a UI that allows turning squares on and off;
  * Allows step-by-step navigation (advance both single and multiple steps); and
  * Allows playing Life forever given the provided state
* Simulate an API service that provides the game's back end.

# Tech stack

The challenge's only requirements with regards to technology are that it is a web-based game and that it simulates an API connection. Therefore, the tech stack was chosen as follows:

* TypeScript, to ensure faster development of communications between the API and front end;
* Next.js for quick project scaffolding and built-in API and server-side rendering;
* TailwindCSS for quick visual prototyping
