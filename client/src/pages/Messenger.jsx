import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchCurrentChatFriendProfileAction} from "../redux/actions/usersAction";
import getFirstLetter from "../utils/getFirstLetter";
import {HiEllipsisVertical} from "react-icons/all";

const Messenger = () => {
    let messages = []

    const {friendId} = useParams()
    const dispatch = useDispatch()
    const [room, setRoom] = useState("")

    const {auth, currentChatFriend} = useSelector(state=>state.authState)

    // fetch old message
    useEffect(()=>{
        if(auth && friendId){

            let roomId = (auth.id + friendId).split("").sort().join("")
            setRoom(roomId)
            // dispatch(fetchMessageAction(roomId))
        }

        if(friendId){
            dispatch(fetchCurrentChatFriendProfileAction(friendId))
        }

    }, [friendId, auth])


    function handleSendMessage(e){
        e.preventDefault()

        let value = e.target.message.value
        // if(!room){
        //     alert("No room selected")
        // }
        console.log(room)
        console.log(value)
    }


    return (
        <div className="relative h-screen">
            <div>
                {currentChatFriend && (
                    <div className="flex justify-between items-center bg-dark-30 rounded-lg px-4">
                        <div className="list-item" >
                            <div className="circle">{getFirstLetter(currentChatFriend.username)}</div>
                            <div className="text-3xl font-semibold">{currentChatFriend.username}</div>
                        </div>
                        <div className="circle !bg-transparent hover:!bg-dark-50 cursor-pointer">
                            <HiEllipsisVertical />
                        </div>
                    </div>
                )}
            </div>

            <div className="bg-dark-50 p-4 rounded-lg mt-5">
                <div className="">
                    {messages.map((msg) => (
                        <div className={`mt-2 py-2 break-words px-4 w-1/2 rounded-lg text-white bg-blue-500 w-auto ${msg.userId === socketId ? "ml-auto ": "mr-auto "}`}>
                            <p className="whitespace-pre-line">{msg.text}</p>
                        </div>
                    ))}
                </div>
            </div>


            <div className="message-fixed-input">
              <div className="container">
                  <form onSubmit={handleSendMessage} className="w-full">
                      <textarea className="input" name="message"></textarea>
                      <button type="submit" className="btn">Send Message</button>
                  </form>
              </div>


            </div>


        </div>
    );
};

export default Messenger;