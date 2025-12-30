const app = require('express').Router();
const { User, Message } = require('./db/models');

// --- API ROUTES ---
app.use('/contacts', require('./routes/user'));
app.use('/messages', require('./routes/message'));
app.use('/admin', require('./routes/admin'))

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

module.exports = app;