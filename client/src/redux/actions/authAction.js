import {createAsyncThunk} from "@reduxjs/toolkit";

const API  = "http://localhost:2000"


export const loginAction = createAsyncThunk("", async (payload, ThunkApi)=>{
    try{

       let res = await fetch(API + "/api/auth/login", {
            method: "POST",
            headers: {
              "Content-type": "application/json"
            },
            body: JSON.stringify(payload)

        })

        let result = await res.json()
        console.log(result)
    }catch (ex){
        console.log(ex)
    }
})