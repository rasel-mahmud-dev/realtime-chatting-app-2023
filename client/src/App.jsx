import {useContext, useEffect, useState} from 'react'
import './App.scss'

import io from "socket.io-client"
import Login from "./components/Login";
import Navigation from "./components/Navigation";
import {Outlet} from "react-router-dom";
import {fetchCurrentAuth} from "./redux/actions/authAction";
import {useDispatch, useSelector} from "react-redux";

import SocketContext from "./socket/SocketContext";
import {addMessageAction, updateFriendStatus} from "./redux/ slices/authSlice";


function App() {

    let {socket, setSocket} = useContext(SocketContext)

    const {auth} = useSelector(state => state.authState)


    const dispatch = useDispatch()


    const [messages, setMessages] = useState([])

    useEffect(() => {
        if (auth) {
            let s = io("http://localhost:2000")
            s.emit("join-online", auth.id)

            // event listener for join user notification
            s.on("join-online-response", (userId) => {
                console.log("successfully join on online " + userId)
                dispatch(updateFriendStatus({
                    id: userId,
                    isOnline: true
                }))
            })
            setSocket(s)
        }
    }, [auth])




    useEffect(() => {
        if (socket) {
            // received message event listener
            socket.on("received-msg", (s) => {
                dispatch(addMessageAction({text: s.text, roomId: s.roomId}))
            })

            // event listener for user leave notification
            socket.on("leave-online-response", (userId)=>{
                console.log("successfully leave from online ", userId)
                dispatch(updateFriendStatus({id: userId, isOnline: false}))
            })
        }
    }, [socket])

    function storeMessage(text) {
        setMessages([
            ...messages,
            {text: text}
        ])
    }


    function sendMessage(e) {
        e.preventDefault()
        if (!socket) return;
        let msg = e.target.message.value
        e.target.message.value = ""
        socket.emit("send-message", msg)
    }


    function toggleConnection() {
        if (!socket) return;

        // if(socketId){
        //     socket.disconnect()
        //     setSocketId(0)
        //     setMessages([])
        // } else {
        //     // re connect socket connection
        //
        // }
    }

    useEffect(() => {
        dispatch(fetchCurrentAuth())
    }, [])


    return (
        <div className="App">

            <Navigation/>
            <div className="header-space"></div>

            <Outlet/>

        </div>
    )
}

export default App
