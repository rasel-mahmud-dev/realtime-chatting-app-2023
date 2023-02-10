import jwt from "jsonwebtoken"

export const createToken  = (userId) =>{

    let token = jwt.sign({
        userId
    }, process.env.SECRET, {expiresIn: "1h"})

    return token

}



export const parseToken  = (token) =>{

    let data = jwt.decode(token, process.env.SECRET)

    return data

}