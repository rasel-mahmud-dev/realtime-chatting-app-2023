import express from "express";
import client from "../prisma/client";

const router = express.Router()


router.get("/:roomId",   async (req, res, next) => {

    const {roomId} = req.params

    try {
        let messages = await client.message.findMany({
            where: {
                roomId: roomId
            }
        })
        console.log(messages)

    } catch (ex) {
        res.send(ex.message)
    }
})





export default router