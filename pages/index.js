import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useState } from 'react'

export default function Home() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const business = 'ouirise'
  const [message, setMessage] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(json.stringify({name, phone, email, business, message}))
    alert("ping from " + name)
  }
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
          We Launch Businesses 🚀
        </p>

        <form className="form"> 
            <h2>Contact Us</h2>
            <input type="text" placeholder="name" onChange={(e => setName(e.target.value))} />
            <input type="phone" placeholder="phone" onChange={(e => setPhone(e.target.value))} />
            <input type="email" placeholder="email (optional)"onChange={(e => setEmail(e.target.value))}  />
            <input type="message" placeholder="send a message (optional)" onChange={(e => setMessage(e.target.value))} />
            <input type="submit"  value="enter" onSubmit={(e) => handleSubmit(e)} />
        </form>

        <div className={styles.grid}>
          <a href="https://ouiriseinit.github.io/miyu/" className={styles.card}>
            <p>Miyu</p>
          </a>

          

          <a
            href="https://ouiriseinit.github.io/culturalgold/"
            className={styles.card}
          >
          
            <p>Cultural Gold</p>
          </a>

          <a
            href="https://ouiriseinit.github.io/thejugobar/"
            className={styles.card}
          >
            <p>
              theJugoBar
            </p>
          </a>
        </div>
      </main>

      <code className={styles.address}>
        ouiriseinitiative@yahoo.com
        (980) 486 - 7595
      </code>

      <footer>
        Built by Ouirise Initiative
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
          background: #111;
          color: #eaeaea;
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
            h1{ font-size: 1.6rem;}
      `}</style>

      <style jsx global>{`
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
          background: #111;
          color: #eaeaea;
        }
        * {
          box-sizing: border-box;
        }
          form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: rgba(38, 38, 38, 0.5);
  padding: 1rem 1.5rem 2rem;
  border: solid 1px #5e1e1e;
  border-radius: 0.5rem;
  max-width: 24rem;
  width: 100%;
  margin: auto;
}
  input {
  margin-right: 1rem;
  background: #111;
  color: #eaeaea;
  padding: 1rem 0.5rem;
  border: solid 1px #5e1e1e;
  border-radius: 0.25rem;
  max-width: 26rem;
  }
  input:hover {
     padding: 1rem 1rem;  
  }

  footer {
        border-top: solid 1px #5e1e1e;
  }
        h2 {
          text-align: center;
        }
      `}</style>
    </div>
  );
}
