import express from "express";

import authRoute from "./authRoute";
import usersRoute from "./usersRoute";

const router = express.Router()


router.use("/api/auth", authRoute)
router.use("/api/users", usersRoute)



export default router