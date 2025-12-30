module.exports = app = require('express').Router();
const path = require('path');
app.get('/', (req, res) => {
    res.sendFile(path.resolve(process.env.HOME_PATH, 'index.html'))
})
app.get('/users', ( req, res) => {
    res.sendFile(path.resolve(__dirname, 'views/users.html'))
})
app.get('/messages', ( req, res) => {
    res.sendFile(path.resolve(__dirname, 'views/messages.html'))
});
app.get('/user/:id', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'views/user.html'))
});
app.get('/user/:id/messages', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'views/messages.html'))
})

app.get('/vendor', (req, res) => {
    res.sendFile(path.resolve(process.env.HOME_PATH, 'views/clients/mellow/index.html'))
})

app.get('/mellow', (req, res) => {
    res.sendFile(path.resolve(process.env.HOME_PATH, 'views/clients/mellow/index.html'))
});