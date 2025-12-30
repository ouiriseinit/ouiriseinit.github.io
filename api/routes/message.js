module.exports = app = require('express').Router();
const { Message, User } = require('../db/models')
const cloud = 'https://ouiriseinit.github.io/'






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
    res.redirect(cloud);
})
