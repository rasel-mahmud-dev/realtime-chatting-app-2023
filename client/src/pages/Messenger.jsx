import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchMessageAction} from "../redux/actions/messageAction";
import {fetchCurrentChatFriendProfileAction} from "../redux/actions/usersAction";
import getFirstLetter from "../utils/getFirstLetter";

const Messenger = () => {
    let messages = []

    const {friendId} = useParams()
    const dispatch = useDispatch()

    const {auth, currentChatFriend} = useSelector(state=>state.authState)

    // fetch old message
    useEffect(()=>{
        if(auth && friendId){

            // let roomId = (auth.id + friendId).split("").sort().join("")
            // dispatch(fetchMessageAction(roomId))
        }

        if(friendId){
            dispatch(fetchCurrentChatFriendProfileAction(friendId))
        }

    }, [friendId, auth])

    console.log(currentChatFriend)



    return (
        <div>

            <div>
                {currentChatFriend && (
                    <div>
                        <div className="list-item" >
                            <div className="circle">{getFirstLetter(currentChatFriend.username)}</div>
                            <div className="text-3xl font-semibold">{currentChatFriend.username}</div>
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
        </div>
    );
};

export default Messenger;