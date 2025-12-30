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
    .then(() => console.log('✅'))
    .catch(err => console.error('❌ MongoDB Connection Error:', err));

app.use('/', require('./api/viewsRouter'))
app.use('/api', require('./api/routes'));

app.post('/send', async (req, res) => {
    try {
    const { name, email, phone, content, business } = req.body;
    let user_id = null;
    // Extract the user data from req.body and create a new User instance
    const newUser = new User({ name, email, phone, business });

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
        const newMessage = new Message({ name, user_id, content, business });
        await newMessage.save();
        res.redirect(cloud)
    }
    else res.send('user not created')
  } catch (error) {
    console.error('Error creating user:', error);
    // Send error response
    // res.status(500).json({ error: 'Failed to ping database' });
    res.redirect(cloud)
  }
})

// --- START SERVER ---
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});