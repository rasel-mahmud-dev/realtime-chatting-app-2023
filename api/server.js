import http from "http";
import express from "express";

import morgan from "morgan";
import cors from "cors"
import client from "./prisma/client";
import routes from "./routes";


import fileUpload from "./services/fileUpload";
import saveMessage from "./services/saveMessage";
import { parseToken } from "./services/jwt";


require("dotenv").config({})

const {Server} = require("socket.io")


const app = express();
app.use(express.json())
app.use(morgan("dev"));
app.use(cors())

app.use("/public/", express.static("public"))


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
    socket.on("leave-online", async ({token, userId}) => {
        try{
            console.log(token, userId);
            let id = userId 
            if(token){
                let data =  parseToken(token) 
                if(!data) return 
                id = data.userId
            } else{
                return;
            }

             console.log(userId +"leave");  
            
            let update = await client.user.update({
                where: {
                    id: Number(id)
                },
                data: {
                    isOnline: false,
                    lastActive: new Date()
                }
            })
            io.emit("leave-online-response", userId)

        } catch (ex){
            console.log(ex)
        }
    });
})



const messengerNamespace = io.of("/messenger");

messengerNamespace.on("connection", (socket) => {
    console.log(socket.id, " - messenger namespace")


    socket.on("send-message", async ({text, senderId, roomId, ...files}) => {
        let promises = []

        for (let filesKey in files) {
            if(files[filesKey]){
                promises.push(fileUpload(files[filesKey], filesKey))
            }
        }

        let filePath = []
        let result = await Promise.allSettled(promises)
        if(result){
            result.forEach(item=>{
                if(item.status === "fulfilled"){
                    filePath.push(item.value)
                }
            })
            // also store in database
            await saveMessage(roomId, text, filePath, senderId)
        } else {
            await saveMessage(roomId, text, [], senderId)
        }


        // broadcast to other participant
        messengerNamespace.to(roomId).emit("received-msg", {
            senderId,
            roomId,
            text,
            files: filePath
        })
    })



    // when user join private room for one to one chatting
    socket.on("join-private-room", async (roomId) => {
        try{
            await socket.join(roomId)
            let newRoom = await client.room.upsert({
                where: {
                    roomId: roomId
                },
                update: {},
                create: {
                    roomId: roomId
                }
            })

        } catch (ex){
            console.log(ex)
        }
    });

    // when user join private room for one to one chatting
    socket.on("leave-private-room", async (roomId) => {
        try{
            await socket.leave(roomId)
            console.log("leave ", roomId)
        } catch (ex){
            console.log(ex)
        }
    });

    // socket.on("disconnect", async () => {
    //     console.log(socket.id, " leave")
    // });
})

const PORT = 2000

httpServer.listen(PORT, () => console.info(`server is running on port http://localhost:${PORT}`))


