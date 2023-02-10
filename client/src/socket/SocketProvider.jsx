import React, {useState} from 'react';
import SocketContext from "./SocketContext";

const SocketProvider = (props) => {

    const [socket, setSocket] = useState(null)

    return (
        <SocketContext.Provider value={{socket, setSocket: (s)=>setSocket(s)}}>
            {props.children}
        </SocketContext.Provider>
    );
};

export default SocketProvider;