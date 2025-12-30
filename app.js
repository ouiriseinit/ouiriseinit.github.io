const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path')
const bodyParser = require('body-parser')
require('dotenv').config()

const app = express();

// --- CONFIGURATION ---
const PORT = 5000;

// --- MIDDLEWARE ---
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// --- DATABASE CONNECTION ---
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ Connected to MongoDB Atlas'))
    .catch(err => console.error('❌ MongoDB Connection Error:', err));

// --- DATABASE SCHEMA & MODEL ---
const messageSchema = new mongoose.Schema({
    name: { type: String, required: true },
    message: { type: String, required: true },
    date: { type: Date, default: Date.now }
});
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: false },
    email: { type: String, required: false },
    business: { type: String, required: false },
    date: { type: Date, default: Date.now }
})

const Message = mongoose.model('Message', messageSchema);
const User = mongoose.model('User', userSchema)

// --- API ROUTES ---

app.post('/api/send', async (req, res) => {
    if (req.body) {
        console.log(req.body)
    }
    res.redirect('/')
//     try {
//     const { name, email, phone, message } = req.body;
//     // Extract the user data from req.body and create a new User instance
//     const newUser = new User({ name, email, phone, business });

//     // Save the new user to the database
//     await newUser.save();

//     const found = await User.findOne(newUser);
//     if (found) {
//         const newMessage = new Message({ name, user_id: found._id, message });
//         await newMessage.save();
//         res.redirect('/')
//         //res.status(201).json({ message: 'User created successfully', userId: newUser.id });
//     }
//     // Send success response
    
//   } catch (error) {
//     console.error('Error creating user:', error);
//     // Send error response
//     res.status(500).json({ error: 'Failed to create user' });
//   }
})
app.get('/api/send', async (req, res) => {

    console.log(req)
    res.redirect('/')
    //?name=kanna &email=test&phone=test&business=ouirise&message=test
    
    
    
    // const { name, email, phone, message } = req.body;
//     try {
    
//     // Extract the user data from req.body and create a new User instance
//     const newUser = new User({ name, email, phone, business });

//     // Save the new user to the database
//     await newUser.save();

//     const found = await User.findOne(newUser);
//     if (found) {
//         const newMessage = new Message({ name, user_id: found._id, message, business });
//         await newMessage.save();
//         res.redirect('/')
//         //res.status(201).json({ message: 'User created successfully', userId: newUser.id });
//     }
//     // Send success response
    
//   } catch (error) {
//     console.error('Error creating user:', error);
//     // Send error response
//     res.status(500).json({ error: 'Failed to create user' });
//   }
}
res.redirect('/')
})

app.get('/api/users', async (req, res) => {
    const result = await User.find({});
    console.log(result)
    res.json(result);
});
app.get('/api/user/:id', async (req, res) => {
    const userId = req.params.id;
    const user = await User.findById(userId);
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
    res.redirect('/');
})

// DB ADMIN ROUTES
app.get('/api/db/load', async (req, res) => {
    const users = require('./data/users.json');
    users.map(async (user) => {
        const newUser = new User(user);
        await newUser.save();
    })
    res.redirect('/');
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


// --- START SERVER ---
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});