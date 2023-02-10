import express from "express";

import authRoute from "./authRoute";

const router = express.Router()


router.use("/api/auth", authRoute)



export default router