const express = require('express');
const bodyParser = require('body-parser');
const path = require('path')
require('dotenv').config()

// Databse Config
const { Pool } = require('pg')
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false}
});
async function testConnection() {
  console.log('--- Testing Supabase Connection ---');
  console.log('Attempting to connect to pooler...');

  try {
    const client = await pool.connect();
    console.log('✅ Successfully connected to the Pooler.');

    const res = await client.query('SELECT NOW() as current_time, current_database() as db_name');
    console.log('✅ Query successful!');
    console.log('Database Time:', res.rows[0].current_time);
    console.log('Database Name:', res.rows[0].db_name);

    client.release(); // Return the client to the pool
  } catch (err) {
    console.error('❌ Connection failed!');
    console.error('Error details:', err.message);
    
    if (err.message.includes('ENOTFOUND')) {
      console.log('\nTip: Check if your DATABASE_URL is correct or if you have an internet connection.');
    } else if (err.message.includes('password authentication failed')) {
      console.log('\nTip: Double check your database password in Supabase.');
    }
  } finally {
    await pool.end();
    process.exit();
  }
}

const messages = []
const users = []

// Create an instance of Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})
app.get('/api', (req, res) => {
    console.log('/api')
    res.redirect('/')
})
// Endpoint to handle the submission of the contact form
app.post('/api/submit', (req, res) => {
    const { username, email, phone, message } = req.body;
    
    // Here you can log or process the received data
    // {
    //     username,
    //     email,
    //     phone,
    //     message
    // }

    if (username && (email || phone || message)) {
        // send to db
        const user_id = users.length
        const message_id = messages.length
        users.push({ user_id, username, email, phone })
        messages.push({ user_id, username, message })
        
        // output success
        console.log(`Received a message`)
        console.log(req.body)
        return res.redirect('/api')
        
    } else {
        console.log('incomplete data (no db): ' + { username, email, phone, message})
        return res.redirect('/api')
    }
});

app.get('/api/messages', (req, res) => {
    console.log(messages)
    return res.json(messages)
})
app.get('/api/messages/:id', (req, res) => {
    if (req.params.id < messages.length) {
        console.log(messages[req.params.id])
        return res.json(messages[req.params.id])
    }
    return res.send('Error. invalid id. must be between (0, ' + messages.length - 1 + ')')
})
app.get('/api/messages/latest', (req, res) => {
    if (0 < messages.length) {
        console.log(messages[messages.length - 1])
        return res.json(messages[messages.length - 1])
    }
    return res.send('No recent messages')
})
app.get('/api/users', (req, res) => {
    if (0 < users.length) {
        console.log(users)
        return res.json(users)
    }
    return res.send('empty users')
})
app.get('/api/users/latest', (req, res) => {
    if (0 < users.length) {
        console.log(users[users.length - 1])
        return res.json(users[users.length - 1])
    }
    return res.send('empty users')
})
// Start the server
app.listen(PORT, () => {
    // testConnection()
    console.log(`Server is running on port ${PORT}`);
});
