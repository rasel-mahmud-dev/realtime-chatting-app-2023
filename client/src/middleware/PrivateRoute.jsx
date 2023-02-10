import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";

const PrivateRoute = (props) => {

    const {auth, authLoading} = useSelector(state => state.authState)

    useEffect(()=>{}, [])

    if(!authLoading){
        return  "Loading"
    } else if(authLoading && !auth){
        return <Navigate to="/login" />
    }

    return props.children
};

export default PrivateRoute;