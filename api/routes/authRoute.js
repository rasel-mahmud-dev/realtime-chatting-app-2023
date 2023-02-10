
import express from "express";
import client from "../prisma/client";

const router = express.Router()


router.post("/login", async (req, res, next) => {
    try {
        const {email, password} = req.body
        let user = await client.user.findUnique({
            where: {
                email
            }
        })

        if(!user){
            return res.status(404).json({message: "Please Register first"})
        }

        if(user.password !== password){
            return res.status(409).json({message: "Please Provide valid password"})
        }

        res.send(user)

    } catch (ex) {
        res.send(ex.message)
    }
})



export default router