const express = require('express')
const http = require('http')
const app = express()
const server = http.createServer(app)
const { Server } = require('socket.io')
const { MongoClient } = require("mongodb");
const client = new MongoClient(process.env.DB_URI);
const db = client.db('ChessMateMain');
let collection = db.collection('Games');
const io = new Server(server)
const port = process.env.PORT || 3001
io.on('connection', (socket) => {
    socket.emit('ack', { 'connected': socket.id })
})

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})