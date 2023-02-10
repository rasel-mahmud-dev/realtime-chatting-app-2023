import {createSlice} from "@reduxjs/toolkit";
import {loginAction} from "../actions/authAction";

const authSlice = createSlice({
    name: 'authState',
    initialState: {
        auth: null,
        authLoading: false
    },
    reducers: {
        incremented: state => {
            state.value += 1
        },
        decremented: state => {
            state.value -= 1
        }
    },
    extraReducers: (builder)=> {
        builder.addCase(loginAction.fulfilled, (state, action) => {
            if(action.payload){
                state.auth = action.payload
            }
            state.authLoading = true
        })
    }
})


export const {} = authSlice.actions
export default authSlice