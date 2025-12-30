module.exports = app = require('express').Router();
const { User, Messages } = require('../db/models');

app.get('/', async (req, res) => {
    const result = await User.find({});
    console.log(result)
    res.json(result);
});
app.get('/:id', async (req, res) => {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
})
app.get('/:id/delete', async (req, res) => {
    const userId = req.params.id;
    await User.findByIdAndDelete(userId);
    res.redirect('/users');
})
app.get('/:id/messages', async (req, res) => {
    const userId = req.params.id;
    const messages = await Message.find({ user_id: userId });
    res.json(messages);
});