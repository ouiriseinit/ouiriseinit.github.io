const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path')
const bodyParser = require('body-parser')
require('dotenv').config()

const app = express();

// --- CONFIGURATION ---
const PORT = process.env.PORT || 5000;

// --- MIDDLEWARE ---
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// --- DATABASE CONNECTION ---
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ Connected to MongoDB Atlas'))
    .catch(err => console.error('❌ MongoDB Connection Error:', err));

// --- DATABASE SCHEMA & MODEL ---
const messageSchema = new mongoose.Schema({
    name: { type: String, required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    business: { type: String },
    date: { type: Date, default: Date.now }
});
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: false },
    email: { type: String, required: false },
    business: { type: String },
    date: { type: Date, default: Date.now }
})

const Message = mongoose.model('Message', messageSchema);
const User = mongoose.model('User', userSchema)

// --- API ROUTES ---
app.get('/api/send', (req, res) => {
    res.redirect("/")
})
app.post('/api/send', async (req, res) => {
    try {
    const { name, email, phone, content } = req.body;
    let user_id = null;
    // Extract the user data from req.body and create a new User instance
    const newUser = new User({ name, email, phone });

    let found = await User.findOne({ email });
    if (!found) found = await User.findOne({ phone });

    // Save the new user to the database only if doesn't exist
    if (found) user_id = found._id;
    else {
        const created = await newUser.save();
        user_id = created._id;
    }

    if (user_id) {
        console.log('User ID:', user_id);
        const newMessage = new Message({ name, user_id, content });
        await newMessage.save();
        res.redirect('https://ouiriseinit.github.io/')
    }
    else res.send('user not created')
  } catch (error) {
    console.error('Error creating user:', error);
    // Send error response
    // res.status(500).json({ error: 'Failed to ping database' });
    res.redirect('https://ouiriseinit.github.io/')
  }
})

app.get('/api/users', async (req, res) => {
    const result = await User.find({});
    console.log(result)
    res.json(result);
});
app.get('/api/user/:id', async (req, res) => {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
})
app.get('/api/user/:id/delete', async (req, res) => {
    const userId = req.params.id;
    await User.findByIdAndDelete(userId);
    res.redirect('/users');
})

app.get('/api/messages', async (req, res) => {
    const result = await Message.find({});
    res.json(result);
})

app.get('/api/message/:id', async (req, res) => {
    const messageId = req.params.id;
    const message = await Message.findById(messageId);
    res.json(message);
})
app.get('/api/message/:id/delete', async (req, res) => {
    const messageId = req.params.id;
    await Message.findByIdAndDelete(messageId);
    res.redirect('https://ouiriseinit.github.io/');
})
app.get('/api/user/:id/messages', async (req, res) => {
    const userId = req.params.id;
    const messages = await Message.find({ user_id: userId });
    res.json(messages);
});

// DB ADMIN ROUTES
app.get('/api/db/load', async (req, res) => {
    const users = require('./data/users.json');
    users.map(async (user) => {
        const newUser = new User(user);
        await newUser.save();
    })
    res.redirect('https://ouiriseinit.github.io/');
})
app.get('/api/db/clear', async (req, res) => {
    await User.deleteMany({});
    await Message.deleteMany({});
    res.redirect('/');
})

// --- VIEW ROUTES ---
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'index.html'))
})
app.get('/users', ( req, res) => {
    res.sendFile(path.resolve(__dirname, 'pages/users.html'))
})
app.get('/messages', ( req, res) => {
    res.sendFile(path.resolve(__dirname, 'pages/messages.html'))
});
app.get('/user/:id', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'pages/user.html'))
});
app.get('/user/:id/messages', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'pages/messages.html'))
})

// --- START SERVER ---
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});