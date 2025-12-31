'use client'
import '../global.module.css'
import Head from 'next/head';
import styles from '../css/Home.module.css';
import { useState } from 'react'


export default function Home() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const business = 'ouirise'
  const [content, setContent] = useState('')

  const [showForm, setShowForm] = useState(false)

  const handleSubmit = async (e) => {
  e.preventDefault();
  
  try {
    const response = await fetch('/api/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, phone, email, business, content }), 
    });

    // Check if the response is actually JSON before parsing
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
      const data = await response.json();
      if (response.ok) {
        alert("Message sent!");
      } else {
        alert("Error: " + data.error);
      }
      return data;
    } else {
      const errorText = await response.text();
      console.error("Server returned non-JSON response:", errorText);
      alert("Server Error: Check console for details");
    }
  } catch (error) {
    console.error('Error creating message:', error);
  }
};
  return (
    <div className={styles.container}>
      <Head className={styles.header}>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>

        <p className={styles.description}>
          Launch Your Business with Ouirise
        </p>

        <h2 className={styles.centerText}>✨🌟🚀</h2>

        <button className={styles.button} onClick={() => setShowForm(!showForm)}>Contact</button>

        <ul className={styles.services}>
          <li>Software engineering custom solutions</li>
          <li>SEO web application development</li>
          <li>Cloud infrastructure deployment</li>
          <li>Database creation and analyitics</li>
        </ul>
        { showForm && 
          <form className='form' onSubmit={async (e) => await handleSubmit(e)}> 
              <h2>Contact Us</h2>
              <input type="text" placeholder="name" onChange={(e => setName(e.target.value))} />
              <input type="phone" placeholder="phone" onChange={(e => setPhone(e.target.value))} />
              <input type="email" placeholder="email (optional)"onChange={(e => setEmail(e.target.value))}  />
              <input type="message" placeholder="send a message (optional)" onChange={(e => setContent(e.target.value))} />
              <input type="submit"  value="enter"  />
          </form>
        }
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

      

      <footer>
        
        <code className={styles.address}>
          <p>Built by Ouirise Initiative</p>
          <a href="tel:+19804867595">(980) 486 - 7595</a>
          <a href="mailto:ouiriseinitiative@yahoo.com">ouiriseinitiative@yahoo.com</a>
          
      </code>
      </footer>

      <style jsx>{`

        
      `}</style>
    </div>
  );
}

function Package({ title, description, price }) {
  return (
    <div className={styles.card}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>{description}</p>
      <p className={styles.price}>Price: ${price}</p>
      <button className={styles.button}>Get Started</button>
    </div>
  );
}