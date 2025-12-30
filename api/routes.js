const app = require('express').Router();
const { User, Message } = require('./db/models');

// --- API ROUTES ---
app.use('/contacts', require('./routes/user'));
app.use('/messages', require('./routes/message'));

// DB ADMIN ROUTES
app.get('/db/load', async (req, res) => {
    const users = require('./data/users.json');
    users.map(async (user) => {
        const newUser = new User(user);
        await newUser.save();
    })
    res.redirect('https://ouiriseinit.github.io/');
})
app.get('/db/clear', async (req, res) => {
    await User.deleteMany({});
    await Message.deleteMany({});
    res.redirect('/');
})

module.exports = app;