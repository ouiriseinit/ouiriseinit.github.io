const app = require('express').Router()

const { User, Message } = './db/models'
const cloud = "https://ouriseinit.github.io/"

// DB ADMIN ROUTES
app.get('/db/load', async (req, res) => {
    const users = require('./data/users.json');
    users.map(async (user) => {
        const newUser = new User(user);
        await newUser.save();
    })
    res.redirect(cloud);
})
app.get('/db/clear', async (req, res) => {
    await User.deleteMany({});
    await Message.deleteMany({});
    res.redirect(cloud);
})

module.exports = app