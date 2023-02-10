import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchUsersAction} from "../redux/actions/usersAction";
import getFirstLetter from "../utils/getFirstLetter";

const ActiveUsers = () => {

    const dispatch = useDispatch()
    const {users}  = useSelector(state=>state.authState)


    useEffect(()=>{
        dispatch(fetchUsersAction())
    }, [])


    function startOneToOneChat(user){
        console.log(user)
    }

    return (
        <div>
            <h4 className="text-lg font-medium">Active Users</h4>

            <ul>
                {users.map(user=>(
                    <div className="list-item" onClick={()=>startOneToOneChat(user)}>
                        <div className="circle">{getFirstLetter(user.username)}</div>
                        <div className="">{user.username}</div>
                    </div>
                ))}
            </ul>

        </div>
    );
};

export default ActiveUsers;