const http = require("http");
const express = require("express");
const morgan = require("morgan");
const cors = require('cors')


require("dotenv").config({})

const {Server}  = require("socket.io")


const app = express();
app.use(morgan("dev"));
app.use(cors())

const httpServer = http.createServer(app);


let io = new Server(httpServer, {
    cors: {
        origin: [process.env.FRONTEND],
    }
})

io.on("connection", (socket)=>{
    console.log(socket.id, " -connected")

    socket.on("send-message", (payload)=>{
        console.log(payload)
        io.emit("received-msg", payload)
    })

    socket.on("disconnect", async () => {
        console.log(socket.connected)
        console.log(socket.id)
    });

})

const PORT = 2000

httpServer.listen(PORT, () =>console.info(`server is running on port http://localhost:${PORT}`))

