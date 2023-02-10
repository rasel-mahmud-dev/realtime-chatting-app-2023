import {createSlice} from "@reduxjs/toolkit";
import {loginAction, registerAction} from "../actions/authAction";
import { fetchUsersAction} from "../actions/usersAction";

const authSlice = createSlice({
    name: 'authState',
    initialState: {
        auth: null,
        authLoading: false,
        users: []
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
        builder.addCase(loginAction.rejected, (state, action) => {
            state.auth = null
            state.authLoading = true
        })


        builder.addCase(registerAction.fulfilled, (state, action) => {
            if(action.payload){
                state.auth = action.payload
            }
            state.authLoading = true
        })
        builder.addCase(registerAction.rejected, (state, action) => {
            state.auth = null
            state.authLoading = true
        })

        builder.addCase(fetchUsersAction.fulfilled, (state, action) => {
            if(action.payload){
                state.users = action.payload
            }
        })
    }
})


export const {} = authSlice.actions
export default authSlice