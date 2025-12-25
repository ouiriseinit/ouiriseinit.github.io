const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path')
const bodyParser = require('body-parser')
require('dotenv').config()

const app = express();

// --- CONFIGURATION ---
const PORT = 5000;
// Note: In production, always move this URI to a .env file for security
// const MONGO_URI = 'mongodb+srv://kalebkandake_db_user:0C5Q7rnRLKjKaHTo@ouriseinit-contact.6e4kcjk.mongodb.net/?appName=ouriseinit-contact';

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
    date: { type: Date, default: Date.now }
})

const Message = mongoose.model('Message', messageSchema);
const User = mongoose.model('User', userSchema)

// --- API ROUTE ---
app.post('/api/submit', async (req, res) => {
    console.log(req.body)
});

app.post('/api/send', async (req, res) => {
    console.log(req.body)

    try {
        const { name, email, phone, message } = req.body;

        // Validation
        console.log(name, email, phone, message)

        // Save to Database
        //await new Message({ name, message }).save();
        await new User({ name, email, phone }).save()

        res.status(201).json({ success: true, message: "Form submitted successfully!" });
    } catch (error) {
        console.error("Save Error:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
})

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'index.html'))
})
app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.error("Fetch Error:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});

// --- START SERVER ---
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});