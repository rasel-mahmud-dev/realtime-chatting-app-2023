import {useEffect, useState} from 'react'
import './App.css'

import io from "socket.io-client"

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

            <div className="bg-blue-600 mt-3 flex justify-between p-4 items-center text-white rounded">
                <h2 className="text-center">{socketId ? "Connected" : "Not connected"}</h2>
                <button className="btn" onClick={toggleConnection}>{socketId ? "Disconnect" : "Connect Now"}</button>
            </div>

            <form className="max-w-sm mx-auto shadow p-2 rounded mt-10" onSubmit={sendMessage}>
                <div>
                    <label htmlFor="" className="font-medium text-sm my-2">Message</label>
                    <textarea  className="w-full outline-none bg-gray-100 p-2 text-sm text-gray-700" rows={5}
                              name="message"></textarea>
                </div>
                <button type="submit" className="btn mt-2">Send Message</button>
            </form>


            <div className="bg-gray-100 p-4 rounded-lg mt-5">
                <div className="">
                    {messages.map((msg) => (
                        <div className={`mt-2 py-2 break-words px-4 w-1/2 rounded-lg text-white bg-blue-500 w-auto ${msg.userId === socketId ? "ml-auto ": "mr-auto "}`}>
                            <p className="whitespace-pre-line">{msg.text}</p>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}

export default App
