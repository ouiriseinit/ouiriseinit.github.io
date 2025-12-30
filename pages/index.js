import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className={styles.title}>
          Ouirise Initiative
        </h1>

        <p className={styles.description}>
          Oui Launch Your Project 🚀
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h3>Documentation &rarr;</h3>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h3>Learn &rarr;</h3>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className={styles.card}
          >
            <h3>Examples &rarr;</h3>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h3>Deploy &rarr;</h3>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel" className={styles.logo} />
        </a>
      </footer>

      <style jsx>{`
        
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        footer img {
          margin-left: 0.5rem;
        }
        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          color: inherit;
        }
        code {
          background: rgba(212,212,212, 0.1);
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family:
            Menlo,
            Monaco,
            Lucida Console,
            Liberation Mono,
            DejaVu Sans Mono,
            Bitstream Vera Sans Mono,
            Courier New,
            monospace;
        }
      `}</style>

      <style jsx global>{`
      :root {
  --font-em: 'Ojuju', cursive;
  --font-heading: 'Ojuju', cursive;
  --font-strong: 'Bebas Neue', sans-serif;
  --font-body: 'Kedebideri', sans-serif;
  --font-ital: 'Shadows Into Light', cursive;
  /* --- The Canvas (Backgrounds) --- */
  /* That rich dark charcoal from the card background */
  --bg: #111;
  /* Slightly lighter for cards/sections */
  --bg-panel: rgba(38, 38, 38, 0.5);

  /* --- The 'Gold' (Accents) --- */
  /* The Terracotta/Clay from the headwrap - USE FOR BUTTONS */
  --accent-primary: #ed672e;
  /* A lighter version for hover states */
  --accent-hover: #ed672e;

  /* --- The Culture (Secondary) --- */
  /* The deep mahogany/wood red from the borders */
  --wood-red: #5e1e1e;
  /* The skin tone bronze for subtle details */
  --highlight: rgb(237, 185, 80);
  --text-main: #eaeaea;
}
        html,
        body {
          padding: 0;
          margin: 0;
          font-family:
            -apple-system,
            BlinkMacSystemFont,
            Segoe UI,
            Roboto,
            Oxygen,
            Ubuntu,
            Cantarell,
            Fira Sans,
            Droid Sans,
            Helvetica Neue,
            sans-serif;
            background: var(--bg);
            color: var(--text-main);
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
