import express from "express";
import client from "../prisma/client";
import auth from "../middleware/auth";
import {createToken} from "../services/jwt";

const router = express.Router()


router.get("/fetch-auth", auth, async (req, res, next) => {
    try {

        let user = await client.user.findUnique({
            where: {
                id: Number(req.user.id)
            },
            select: {
                id: true,
                username: true,
                email: true
            }
        })

        if (!user) {
            return res.status(404).json({message: "User not found"})
        }

        res.send(user)

    } catch (ex) {
        res.send(ex.message)
    }
})


router.get("/profile", auth, async (req, res, next) => {
    try {

        let user = await client.user.findUnique({
            where: {
                id: Number(req.user.id)
            },
            select: {
                id: true,
                username: true,
                email: true,
                createdAt: true
            }
        })

        if (!user) {
            return res.status(404).json({message: "User not found"})
        }

        res.send(user)

    } catch (ex) {
        res.send(ex.message)
    }
})



router.post("/login", async (req, res, next) => {
    try {
        const {email, password} = req.body
        let user = await client.user.findUnique({
            where: {
                email
            }
        })

        if (!user) {
            return res.status(404).json({message: "Please Register first"})
        }

        if (user.password !== password) {
            return res.status(409).json({message: "Please Provide valid password"})
        }

        let token = createToken(user.id)
        res.json({user: {...user, password: ""}, token})

    } catch (ex) {
        res.send(ex.message)
    }
})


router.post("/register", async (req, res, next) => {
    try {
        const {username, email, password} = req.body
        let user = await client.user.findUnique({
            where: {
                email
            }
        })

        if (user) {
            return res.status(404).json({message: "Already Register, Please Login"})
        }

        let newUser = await client.user.create({
            data: {
                username,
                email,
                password
            }
        })

        if (newUser) {
            let token = createToken(newUser.id)
            res.json({
                user: {...user, password: ""},
                token
            })
        } else {
            res.send("Registration fail")
        }

    } catch (ex) {
        res.send(ex.message)
    }
})


export default router