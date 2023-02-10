import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchCurrentChatFriendProfileAction} from "../redux/actions/usersAction";
import getFirstLetter from "../utils/getFirstLetter";
import {BiSend, HiEllipsisVertical} from "react-icons/all";
import socketContext from "../socket/SocketContext";
import {fetchMessageAction} from "../redux/actions/messageAction";

const Messenger = () => {


    const {friendId} = useParams()
    const dispatch = useDispatch()
    const [room, setRoom] = useState("")

    const {auth, currentChatFriend, messages} = useSelector(state => state.authState)

    const {socket, setSocket} = useContext(socketContext)

    // fetch old message
    useEffect(() => {
        if (auth && friendId) {
            let roomId = (auth.id + friendId).split("").sort().join("")
            setRoom(roomId)
            dispatch(fetchMessageAction(roomId))
        }

        if (friendId) {
            dispatch(fetchCurrentChatFriendProfileAction(friendId))
        }

    }, [friendId, auth])


    // join private group for one to one
    useEffect(() => {
        if (socket && room) {
            socket.emit("join-private-room", room)
        }
    }, [socket, room])


    function handleSendMessage(e) {
        e.preventDefault()

        let value = e.target.message.value
        if (!room) return alert("No room selected")


        // send message to server to broadcast to other participant
        socket.emit("send-message", {
            text: value,
            roomId: room,
            senderId: auth.id,
        })
        e.target.message.value = ""
    }

    function isYour(msg) {
        return msg.senderId === auth.id
    }

    return (
        <div className="container">
            <div className="messenger">
                <div className="message-sidebar">
                    <h3>Sider item</h3>
                    <h3>Sider item</h3>
                    <h3>Sider item</h3>
                    <h3>Sider item</h3>
                    <h3>Sider item</h3>
                    <h3>Sider item</h3>
                    <h3>Sider item</h3>
                    <h3>Sider item</h3>
                    <h3>Sider item</h3>
                    <h3>Sider item</h3>
                    <h3>Sider item</h3>
                </div>
                <div className="chatting-box">
                    <div>
                        {currentChatFriend && (
                            <div className="flex justify-between items-center bg-dark-30 rounded-lg px-4">
                                <div className="list-item">
                                    <div className="circle">{getFirstLetter(currentChatFriend.username)}</div>
                                    <div className="text-3xl font-semibold">{currentChatFriend.username}</div>
                                    <span
                                        className={`bullet ${currentChatFriend.isOnline ? "active" : "inactive"}`}></span>
                                </div>
                                <div className="circle !bg-transparent hover:!bg-dark-50 cursor-pointer">
                                    <HiEllipsisVertical/>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="message-list">
                        <div className="">
                            {messages.map((msg) => (
                                <div
                                    className={`message-item  ${isYour(msg) ? "message-item-own" : "message-item-friend"}`}>
                                    <div className="circle !w-8 !h-8 !text-xs">{getFirstLetter(currentChatFriend.username)}</div>
                                    <p className="whitespace-pre-line">{msg.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="message-fixed-input">
                        <div className="container">
                            <form onSubmit={handleSendMessage} className="w-full flex gap-x-2 items-center">
                                <textarea className="input" name="message"></textarea>
                                <button type="submit" className="btn flex items-center gap-x-1">Send <BiSend/></button>
                            </form>
                        </div>
                    </div>



                </div>
            </div>
        </div>
    );
};

export default Messenger;