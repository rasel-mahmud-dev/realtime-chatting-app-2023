import {createAsyncThunk} from "@reduxjs/toolkit";

const API  = "http://localhost:2000"


export const fetchUsersAction = createAsyncThunk("authState/users", async (payload, ThunkApi)=>{
    try{

        let token = localStorage.getItem("token") || ""
        let res = await fetch(API + "/api/users", {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                token: token
            },
            body: JSON.stringify(payload)

        })

        let result = await res.json()

        if(res.status > 400){
            throw Error(result.message)
        } else{
            return result
        }

    }catch (ex){
        throw Error(ex.message)
    }
})



export const fetchCurrentChatFriendProfileAction = createAsyncThunk("authState/currentChatFriendProfile", async (payload, ThunkApi)=>{
    try{

        let res = await fetch(API + "/api/users/"+payload)

        let result = await res.json()

        if(res.status > 400){
            throw Error(result.message)
        } else{
            return result
        }

    }catch (ex){
        throw Error(ex.message)
    }
})
