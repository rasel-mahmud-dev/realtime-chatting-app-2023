import express from "express";
import client from "../prisma/client";

const router = express.Router()


router.get("/:roomId",   async (req, res, next) => {

    const {roomId} = req.params

    try {
        let messages = await client.message.findMany({
            where: {
                roomId: roomId
            },
            select: {
                text: true,
                createdAt: true,
                id: true,
                seen: true,
                senderId: true,
                files: true,
                sender: {
                    select: {
                        id: true,
                        username: true
                    }
                }
            },
        })
       res.status(200).json(messages)

    } catch (ex) {
        res.send(ex.message)
    }
})





export default router