import express from "express";

import authRoute from "./authRoute";
import usersRoute from "./usersRoute";
import messageRoute from "./messageRoute";

const router = express.Router()


router.use("/api/auth", authRoute)
router.use("/api/users", usersRoute)
router.use("/api/messages", messageRoute)



export default router