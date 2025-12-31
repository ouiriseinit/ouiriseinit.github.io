import Head from 'next/head';
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
      // CHANGE: Use 'content' instead of 'message' to match backend
      body: JSON.stringify({ name, phone, email, business, content: message }), 
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
      <div>
        <header>
          <h1>Ouirise Initiative</h1>
          <button onClick={() => setShowForm(!showForm)}>Contact</button>
          { showForm &&
          <form id="contact-form" class="hidden" action="https://ouiriseinit-i6u11c0i7-ouiriseinits-projects.vercel.app/api/send">
          <input placeholder="name" name="name" type="text" />
          <input placeholder="phone" name="phone" type="text" />
          <input placeholder="email" name="emai" type="email" />
          <input placeholder="message" name="message" type="text" />
          <input type="submit" value-enter onClick={() => setShowForm(false)} />
      </form>}
      </header>
      <main>
      <h2>Launch and Scale Your Business</h2>
  <section>
      <h3>Our Software Engineers</h3>
      <p>Developed React, Angular, HTML, CSS, and Wordpress applications for industry innovators in FinTech Entreprenuership and Startups.</p>
      <p>Incorporate modern cloud practices for data security and analytics. Use agentic workflows for smooth deployment timelines.</p>
      <p>Well versed in building custom interfaces and dashboards for a wide variety of industries.</p>
      <p>Placed in Hackathons and Tutored while developing solutions for business students first year at HPU.</p>
      <h3>over 6 years of industry experience</h3>
  </section>

  <section>
  <h2>Project Plans</h2>
  <h3>Deploy and Scale</h3>

  <div class="card plan">
      <h3>Single Page Application Plan</h3>
      <p>Run a project in single page using modern cloud deployment tech.</p>
      <h3>$1,500</h3>
      <p>
          The SPA Plan is built to draft ideas and to assist clients seeking cost-effective solutions without compromising quality.
      </p>
  </div>  
  </section>
  <div class="card plan">
      <h3>Most Value Plan</h3>
      <p>Expert software engineers scale your business with an interactive cloud solution.</p>
      <p>Low cost database providers and server included (usage rates apply)</p>
      <p>Our Developers have industry experience in FinTech, Startups and specialize in building custom software solutions for small businesses and enterprises</p>
      <h3>$2,000</h3>
      <p>
          The MVP offers a balanced approach between availability and flexibility, suitable for projects that require consistent but not full-time effort.
      </p>
  </div>

  <div class="card plan">
      <h3>Big Data Plan</h3>
      <h4>$5,000</h4>
      <p>
          The Big Data Plan is tailored for clients who require comprehensive support and prioritized attention. This model ensures full-time focus on the client's needs without interruptions from other engagements.
      </p>
  </div>
  </main>
  <footer>
      <p>Built by Ouirise.</p>
  </footer>
  

      
      <style jsx>{`
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 0;
            color: #333;
            overflow-x: hidden;
        }
      
        

        body.dark {
            background: rgb(12,12,12);
            
            color: #eaeaea;
        }
        body > * {
            max-width: calc(100% - 2rem);
        }
        .card {
            padding: 1rem;
            border-radius: 4px;
            margin-bottom: 1rem;
        }
        header {
            margin-top: -1rem;
            position: sticky;
            top: -1rem;
            right: 0;
            left: 0;
            height: fit-content;
            padding-top: 2rem;
            z-index: 3;
            display: grid; grid-template-columns: 1fr 1fr;
            column-gap: auto;
            border-radius: 8px;
            background: rgb(12,12,12);
            width: 100%;
        }
        h1 {
            font-size: 1.45rem;
        }
        h2 {
            font-size: 1.3;

        }
        h3 {
            font-size: 1.15;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 12px;
            text-align: left;
        }
        th {
            background-color: #3498db;
            color: white;
        }
        tr:nth-child(even) {
            background-color: #f2f2f2;
        }
        .warning {
            background-color: #fff3cd;
            border-left: 4px solid #ffc107;
            padding: 15px;
            margin: 20px 0;
        }
        .cta-button {
            display: inline-block;
            background-color: #3498db;
            color: white;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 5px;
            margin: 10px 5px;
        }
        .tier-card {
            border: 2px solid #ddd;
            padding: 20px;
            margin: 15px 0;
            border-radius: 8px;
        }
        .price {
            font-size: 2em;
            color: #3498db;
            font-weight: bold;
        }

        footer {
            text-align: center;
        }
        header, main, footer {
            margin-left: 1rem !important;
        }
        button {
            padding: 1rem 2rem;
            background: rgb(12,12,12);
            border: solid #5e1e1e 1px;
            color: #eaeaea;
            width: fit-content;
            border-radius: 8px 8px 8px 0;
        }
        .hidden {
            display: none;
        }
        form {
            width: fit-content;
            max-width: 80%;
            margin: 1rem 0;
            display: flex; flex-direction: column; align-items: center;
            padding: 1rem;
            gap: 0.5rem;
            border: solid 1px #333;
            border-radius: 8px;
            grid-column: 1/3;
        }
        input {
            padding: 1rem;
            background: rgb(12,12,12);
            border: solid 1px #111;
            padding: 1rem;
            color: #eaeaea;
            border-radius: 8px;
        }
        input:focus {
            border: solid 1px #eaeaea;
            padding: 1.25rem
        }
        input[type="submit"] {
            color: #eaeaea;
            padding: 1rem 3rem;
        }
    `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0.5rem 1rem;
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
  padding: 1rem 2rem 2rem;
  border: solid 1px #5e1e1e;
  border-radius: 0.5rem;
  max-width: 24rem;
  width: 100%;
  margin: 2rem auto;
}
  input {
  margin-right: 1rem;
  background: #111;
  color: #eaeaea;
  padding: 1rem 0.5rem;
  border: solid 1px #5e1e1e;
  border-radius: 0.25rem;
  width: 100%;
  }
  input:hover {
     padding: 1rem 1rem;  

  }

  footer {
        border-top: solid 1px #5e1e1e;
        margin-top: 3rem;
  }
        

  code {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
  }
      `}</style>
    </div>
  );
}
