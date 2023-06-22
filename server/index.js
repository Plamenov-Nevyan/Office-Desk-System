const expressConfig = require("./config/express.js")
const mongoConfig = require("./config/dbConfig.js")
const cors = require("cors")
const keyConstants =  require("./config/constants.js")
const express = require('express')
const {createServer}  = require('http')
const userAuth = require("./services/authServices.js")
const deskOps = require('./services/deskServices.js')

const app = express()
const http = createServer(app)

const socketIo = require('socket.io')(http, {
    cors : {
        origin : "http://localhost:3000"
    }
})


socketIo.on('connection', (socket) => {
    socket.on('disconnect', () => {
        socket.disconnect()
    })

    socket.on('userSignUp', async (userData) => {
        try{
        let session = await userAuth.registerUser(userData, keyConstants)
        socketIo.to(socket.id).emit('userRegistered', (session))
        }catch(err){
            socketIo.to(socket.id).emit('error', (err))
        }
    })

    socket.on('userLogin', async (userData) => {
        try{
        let session = await userAuth.loginUser(userData, keyConstants)
        socketIo.to(socket.id).emit('userLoggedIn', (session))
        }catch(err){
            socketIo.to(socket.id).emit('error', (err))
        }
    })

    socket.on('getDesks', async (ownerId) => {
       let desks = await deskOps.getDesks(ownerId)
       socketIo.to(socket.id).emit('receiveDesks', desks)
    })

    socket.on('newDeskRegister', async (deskData) => {
       let newDesk = await deskOps.createDesk(deskData[0], deskData[1])
       socketIo.to(socket.id).emit('newDeskAdded', (newDesk))
    })

    socket.on('deleteDesk', async (data) => {
        let updatedDesks = await deskOps.deleteDesk(data[0], data[1])
        socketIo.to(socket.id).emit('receiveDesks', (updatedDesks))
    })
})
expressConfig(app)
app.use(cors())


mongoConfig()
.then(() => http.listen(keyConstants.SERVER_PORT, () => {
    console.log(`Surver is running on port ${keyConstants.SERVER_PORT}...`)
 })  
)
.catch((err) => console.log(err))