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

    socket.on('newDeskRegister', async (data) => {
        let [deskData, ownerId] = [data[0], data[1]]
       let newDesk = await deskOps.createDesk(deskData, ownerId)
       socketIo.to(socket.id).emit('newDeskAdded', (newDesk))
    })

    socket.on('deleteDesk', async (data) => {
        let [deskId, ownerId] =[data[0], data[1]]
        let updatedDesks = await deskOps.deleteDesk(deskId, ownerId)
        socketIo.to(socket.id).emit('receiveDesks', (updatedDesks))
    })

    socket.on('editDesk', async (data) => {
        let [deskId, ownerId, editValues] = [data[0], data[1], data[2]]
        let updatedDesks = await deskOps.updateDesk(deskId, ownerId, editValues)
        socketIo.to(socket.id).emit('receiveDesks', (updatedDesks))
    })

    socket.on('getUsers', async () => {
        let users = await userAuth.getUsers()
        socketIo.to(socket.id).emit('receiveUsers', (users))
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