import expressConfig from "./config/express"
import mongoConfig from "./config/mongoDB"
import cors from "cors"
import { keyConstants } from "./config/constants"
import express from 'express'
import { Socket } from "socket.io"

const app = express()
const http = createServer(app)

const socketIo = require("socket.io")(http, {
    cors : {
        origin : "http://localhost:3000"
    }
})

expressConfig(app)
app.use(cors())