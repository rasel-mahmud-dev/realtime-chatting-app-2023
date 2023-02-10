import {createSlice} from "@reduxjs/toolkit";
import {loginAction, registerAction} from "../actions/authAction";
import {fetchCurrentChatFriendProfileAction, fetchUsersAction} from "../actions/usersAction";
import {fetchMessageAction} from "../actions/messageAction";

const authSlice = createSlice({
    name: 'authState',
    initialState: {
        auth: null,
        authLoading: false,
        users: [],
        messages: [],
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
            let updatedMessage = [...state.messages]
            updatedMessage.push(action.payload)
            state.messages = updatedMessage
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
            if(action.payload){
                state.messages = action.payload
            }
        })

        builder.addCase(fetchCurrentChatFriendProfileAction.fulfilled, (state, action) => {
            if(action.payload){
                state.currentChatFriend = action.payload
            }
        })
    }
})


export const {logoutAction, addMessageAction, updateFriendStatus} = authSlice.actions
export default authSlice