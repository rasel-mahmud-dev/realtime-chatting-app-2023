import React from "react";



const Backdrop = ({ isOpen, className = "", onClose}) => {
    return <div className={`backdrop ${isOpen ? "backdrop-show" : ""} ${className}`} onClick={onClose} />;
};

export default Backdrop;
