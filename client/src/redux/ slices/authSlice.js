import {createSlice} from "@reduxjs/toolkit";
import {loginAction, registerAction} from "../actions/authAction";
import {fetchCurrentChatFriendProfileAction, fetchUsersAction} from "../actions/usersAction";
import {fetchMessageAction} from "../actions/messageAction"; 

import { fetchProfileAction } from "../actions/authAction";

const authSlice = createSlice({
    name: 'authState',
    initialState: {
        auth: null,
        profile: null,
        authLoading: false,
        users: [],
        messages: {}, // caching for all roomId
        currentChatFriend: {}
    },
    reducers: {
        logoutAction: state => {
            localStorage.removeItem("token")
            state.auth = null
            state.authLoading = true
        },

        // update friend online active status
        updateFriendStatus: (state, action)=>{
            let findFriend = state.currentChatFriend && state.currentChatFriend.id === action.payload.id
            if(findFriend){
                state.currentChatFriend = {
                    ...state.currentChatFriend,
                    ...action.payload
                }
            }
        },

        addMessageAction: (state, action) => {
            let updatedMessage = {...state.messages}
            if(action.payload.roomId){
                if(updatedMessage[action.payload.roomId]){
                    updatedMessage[action.payload.roomId] = [
                        ...updatedMessage[action.payload.roomId],
                        action.payload
                    ]
                } else {
                    updatedMessage[action.payload.roomId] = [action.payload]
                }
                state.messages = updatedMessage
            }
            return state
        },

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

        builder.addCase(fetchMessageAction.fulfilled, (state, action) => {
            if(action.payload?.roomId){
                state.messages[action.payload.roomId] = action.payload.messages
            }
        })

        builder.addCase(fetchCurrentChatFriendProfileAction.fulfilled, (state, action) => {
            if(action.payload){
                state.currentChatFriend = action.payload
            }
        })

        builder.addCase(fetchProfileAction.fulfilled, (state, action) => {
            if(action.payload){
                state.profile = action.payload
            }
        })
    }
})


export const {logoutAction, addMessageAction, updateFriendStatus} = authSlice.actions
export default authSlice