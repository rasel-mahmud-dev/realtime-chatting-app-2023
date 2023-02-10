import http from "http";
import express from "express";

import morgan from "morgan";
import cors from "cors"
import client from "./prisma/client";
import routes from "./routes";


require("dotenv").config({})

const {Server} = require("socket.io")


const app = express();
app.use(express.json())
app.use(morgan("dev"));
app.use(cors())


app.use(routes)


app.get("/", async (req, res, next) => {
    res.send("hello")
})


const httpServer = http.createServer(app);

let io = new Server(httpServer, {
    cors: {
        origin: [process.env.FRONTEND],
    }
})


io.on("connection", (socket) => {
    console.log(socket.id, " - connected")

    socket.on("send-message", ({text, senderId, roomId}) => {
        // for send all listener
        // io.emit("received-msg", {
        //     text: payload,
        //     roomId: "sdfffffffffff"
        // })


        io.to(roomId).emit("received-msg", {
            text: text,
            roomId: roomId,
            senderId: senderId
        })
    })



    // when user join private room for one to one chatting
    socket.on("join-private-room", async (roomId) => {
        socket.join(roomId)
        // try{
        //     let update = await client.user.update({
        //         where: {
        //             id: Number(userId)
        //         },
        //         data: {
        //             isOnline: true
        //         }
        //     })
        //     io.emit("join-online-response", userId)
        //
        // } catch (ex){
        //     console.log(ex)
        // }
    });



    // when user join site or login then this event listener fn call
    socket.on("join-online", async (userId) => {
        try{
            let update = await client.user.update({
                where: {
                    id: Number(userId)
                },
                data: {
                    isOnline: true
                }
            })
            io.emit("join-online-response", userId)

        } catch (ex){
            console.log(ex)
        }
    });


    // when user leave site or logout then this event listener fn call
    socket.on("leave-online", async (userId) => {
        try{
            let update = await client.user.update({
                where: {
                    id: Number(userId)
                },
                data: {
                    isOnline: false
                }
            })
            io.emit("leave-online-response", userId)

        } catch (ex){
            console.log(ex)
        }
    });



    socket.on("disconnect", async () => {
        console.log(socket.id, " leave")
    });
})

const PORT = 2000

httpServer.listen(PORT, () => console.info(`server is running on port http://localhost:${PORT}`))


