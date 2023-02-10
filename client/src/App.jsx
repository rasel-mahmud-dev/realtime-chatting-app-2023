import {useEffect, useState} from 'react'
import './App.css'

import io from "socket.io-client"
import Login from "./components/Login";
import Navigation from "./components/Navigation";
import {Outlet} from "react-router-dom";

let socket = io("http://localhost:2000")

function App() {

    const [socketId, setSocketId] = useState(socket?.id)

    const [messages, setMessages] = useState([])

    useEffect(() => {
        socket.once("connect", (s) => {
            setSocketId(socket.id)
        })

        socket.on("received-msg", (s) => {
            storeMessage(s)
        })

    }, [])

    function storeMessage(text){
        setMessages([
            ...messages,
            {text: text}
        ])
    }


    function sendMessage(e) {
        e.preventDefault()
        if(!socket) return;
        let msg = e.target.message.value
        e.target.message.value = ""
        socket.emit("send-message", msg)
    }



    function toggleConnection(){
        if(!socket) return;

        if(socketId){
            socket.disconnect()
            setSocketId(0)
            setMessages([])
        } else {
            // re connect socket connection

        }
    }

    return (
        <div className="App">

            <Navigation />
            <div className="header-space"></div>

            {/*<div className="bg-blue-600 mt-3 flex justify-between p-4 items-center text-white rounded">*/}
            {/*    <h2 className="text-center">{socketId ? "Connected" : "Not connected"}</h2>*/}
            {/*    <button className="btn" onClick={toggleConnection}>{socketId ? "Disconnect" : "Connect Now"}</button>*/}
            {/*</div>*/}




            <Outlet />

        </div>
    )
}

export default App
