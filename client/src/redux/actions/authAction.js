import {createAsyncThunk} from "@reduxjs/toolkit";

const API  = "http://localhost:2000"


export const fetchCurrentAuth = createAsyncThunk("authState/login", async (payload, ThunkApi)=>{
    try{

        let token = localStorage.getItem("token") || ""
       let res = await fetch(API + "/api/auth/fetch-auth", {
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


export const loginAction = createAsyncThunk("authState/login", async (payload, ThunkApi)=>{
    try{

       let res = await fetch(API + "/api/auth/login", {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(payload)

        })

        let result = await res.json()

        if(res.status > 400){
            throw Error(result.message)
        } else{
            localStorage.setItem("token", result.token)
            return result.user
        }

    }catch (ex){
       throw Error(ex.message)
    }
})

export const registerAction = createAsyncThunk("authState/register", async (payload, ThunkApi)=>{
    try{

       let res = await fetch(API + "/api/auth/register", {
            method: "POST",
            headers: {
              "Content-type": "application/json"
            },
            body: JSON.stringify(payload)
        })

        let result = await res.json()

        if(res.status > 400){
            throw Error(result.message)
        } else{
            localStorage.setItem("token", result.token)
            return result.user
        }

    }catch (ex){
       throw Error(ex.message)
    }
})



export const fetchProfileAction = createAsyncThunk("/auth/profile", async ()=>{
    try{

        let token = localStorage.getItem("token") || ""
        let res = await fetch(API + "/api/auth/profile", {
            method: "GET",
            headers: {
                token
            }
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