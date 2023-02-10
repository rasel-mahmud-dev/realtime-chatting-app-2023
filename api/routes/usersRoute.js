
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
                email: true
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





export default router