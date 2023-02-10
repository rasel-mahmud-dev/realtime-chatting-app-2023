
import express from "express";
import client from "../prisma/client";

const router = express.Router()


router.get("/",   async (req, res, next) => {
    try {

        let users = await client.user.findMany({
            where: {
                NOT: {

                }
            },
            select: {
                id: true,
                username: true,
                email: true,
                isOnline: true
            }
        })

        if(!users){
            return res.status(404).json({message: "User not found"})
        }

        res.send(users)

    } catch (ex) {
        res.send(ex.message)
    }
})


router.get("/:friendId",   async (req, res, next) => {

    const {friendId} = req.params
    try {
        let friend = await client.user.findUnique({
            where: {
                id: Number(friendId)
            },
            select: {
                username: true,
                email: true,
                id: true,
                lastActive: true,
                isOnline: true,
            }
        })
        if(friend){
            res.status(200).json(friend)
        } else {
            res.status(404).json({message: "People not found"})
        }

    } catch (ex) {
        res.send(ex.message)
    }
})








export default router