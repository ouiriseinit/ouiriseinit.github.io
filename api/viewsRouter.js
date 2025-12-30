module.exports = app = require('express').Router();
const path = require('path');
require('dotenv').config
const local = process.env.LOCAL || false
const cloud = "https://ouiriseinit.github.io/views"

app.get('/', (req, res) => {
    if (local) res.sendFile(path.resolve(process.env.HOME_PATH, 'index.html'))
    res.redirect('https://ouiriseinit.')
})
app.get('/users', ( req, res) => {
    const file_route = 'views/users.html'
    if (local) res.sendFile(path.resolve(__dirname, file_route))
    res.redirect(cloud + file_route)
})
app.get('/messages', ( req, res) => {
    const file_route = 'views/messages.html'
    if (local) res.sendFile(path.resolve(__dirname, 'api/' +file_route))
    res.redirect(cloud + file_route)
});
app.get('/user/:id', (req, res) => {
    const file_route = 'views/user.html'
    if (local) res.sendFile(path.resolve(__dirname, file_route))
    res.redirect(cloud + file_route)
});
app.get('/user/:id/messages', (req, res) => {
    const file_route = 'views/messages.html'
    if (local) res.sendFile(path.resolve(__dirname, file_route))
    res.redirect(cloud + file_route)
})

app.get('/vendor', (req, res) => {
    const file_route = 'views/clients/mellow/index.html'
    if (local) res.sendFile(path.resolve(process.env.HOME_PATH, file_route))
    res.redirect(cloud + file_route)
})

app.get('/mellow', (req, res) => {
    const file_route = 'views/clients/mellow/index.html'
    if (local) res.sendFile(path.resolve(process.env.HOME_PATH, file_route))
    res.redirect(cloud + file_route)
});