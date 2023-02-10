import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchUsersAction} from "../redux/actions/usersAction";
import getFirstLetter from "../utils/getFirstLetter";
import {useNavigate} from "react-router-dom";

const ActiveUsers = () => {

    const dispatch = useDispatch()
    const {users, auth}  = useSelector(state=>state.authState)

    const navigate = useNavigate()

    useEffect(()=>{
        dispatch(fetchUsersAction())
    }, [])


    function startOneToOneChat(user){
        navigate("/messenger/"+user.id)
    }

    return (
        <div>
            <h4 className="text-lg font-medium">Active Users</h4>

            <ul>
                {users.map(user=> (!auth || auth.id !== user.id) &&  (
                    <div className="list-item" onClick={()=>startOneToOneChat(user)}>
                        <div className="circle">{getFirstLetter(user.username)}</div>
                        <div className="">{user.username}</div>

                        <span className={`bullet ${user.isOnline ? "active": "inactive"}`}></span>
                    </div>
                ))}
            </ul>

        </div>
    );
};

export default ActiveUsers;