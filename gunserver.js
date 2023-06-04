// const express = require('express')
const Gun = require('gun')

// const app = express()
const port = 8005

// app.use(Gun.serve)

// const server = app.listen(port, () => {
//     console.log("Listening at: http://localhost://" + port)
// })
const server = require('http').createServer().listen(port);
const gun = Gun({file:'db/data.json', web: server, radisk: false, localStorage: true});