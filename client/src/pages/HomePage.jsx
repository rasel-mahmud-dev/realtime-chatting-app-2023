import React, {useEffect} from 'react';
import ActiveUsers from "../components/ActiveUsers";
import {fetchUsersAction} from "../redux/actions/usersAction";
import {useDispatch, useSelector} from "react-redux";

const HomePage = () => {

    const dispatch = useDispatch()
    const {users} = useSelector(state => state.authState)


    useEffect(() => {
        dispatch(fetchUsersAction())
    }, [])


    return (
        <div className="container">
            <ActiveUsers/>
        </div>
    );
};

export default HomePage;