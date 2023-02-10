import {parseToken} from "../services/jwt";

function auth(req, res, next) {
    let token = req.headers["token"] || ""

    if (!token) {
        return res.status(401).json({message: "Unauthorized, Please login"})
    }

    let tokenData = parseToken(token)
    if (!tokenData) {
        return res.status(401).json({message: "Unauthorized, Please login"})
    }
    req.user = {id: tokenData.userId}
    next()
}

export default auth