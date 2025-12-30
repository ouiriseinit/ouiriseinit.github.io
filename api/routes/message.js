module.exports = app = require('express').Router();
const { Message, User } = require('../db/models')

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



app.get('/', async (req, res) => {
    const result = await Message.find({});
    res.json(result);
})

app.get('/:id', async (req, res) => {
    const messageId = req.params.id;
    const message = await Message.findById(messageId);
    res.json(message);
})
app.get('/:id/delete', async (req, res) => {
    const messageId = req.params.id;
    await Message.findByIdAndDelete(messageId);
    res.redirect('https://ouiriseinit.github.io/');
})
