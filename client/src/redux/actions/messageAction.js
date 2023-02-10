import {createAsyncThunk} from "@reduxjs/toolkit";
const API  = "http://localhost:2000"


export const fetchMessageAction = createAsyncThunk("authState/message", async (roomId, ThunkAPI)=>{
    try{

        let state = ThunkAPI.getState()

        if(state?.authState?.messages?.[roomId]){
            return;
        }

        let token = localStorage.getItem("token") || ""
        let res = await fetch(API + "/api/messages/"+roomId, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                token: token
            },
        })

        let result = await res.json()

        if(res.status > 400){
            throw Error(result.message)
        } else{
            return {
                messages: result,
                roomId: roomId
            }
        }

    }catch (ex){
        throw Error(ex.message)
    }
})