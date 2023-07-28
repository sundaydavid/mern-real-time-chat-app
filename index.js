const express = require('express');
const cors = require('cors')
require('dotenv').config()
const connectDb = require('./config/config')

const userRoute = require('./routes/userRoute')
const chatRoute = require('./routes/chatRoute')
const messageRoute = require('./routes/messageRoute')

const app = express()

//middleware
app.use(express.json())
app.use(cors()) 
app.use("/api/users", userRoute)
app.use("/api/chats", chatRoute)
app.use("/api/messages", messageRoute)

app.get('/api', (req, res)=>{
    res.send("Welcome to our chat app")
})

connectDb()
const port  = process.env.PORT || 5000

app.listen(port, (_)=>{
    console.log(`Server running on port: ${port}`)
})