import React from "react";

import Backdrop from "./Backdrop";


const Dropdown = ({isOpen, children, className = "", onClose}) => {
    return (
        <>
            <Backdrop isOpen={isOpen} className="!z-40 !bg-transparent !backdrop-blur-0 " onClose={onClose}/>
            <div className={`dropdown ${isOpen ? "dropdown-open" : ""} ${className}`}>{children}</div>
        </>
    );
};

export default Dropdown;
