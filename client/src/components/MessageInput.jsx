import React, {useRef, useState} from 'react';
import { GrEmoji, ImImage} from "react-icons/all";


const MessageInput = ({onSubmit}) => {
    const [isFocus, setFocus] = useState(false)
    const inputRef = useRef()

    function handleSendMessage(e) {
        if(e.shiftKey && e.keyCode === 13){
            onSubmit({
                value: e.target.textContent
            })
            inputRef.current.innerHTML = null
        }
    }

    function handleChooseImage(){

    }


    return (
        <div  className="message-input mt-4">
            <div  onKeyDown={handleSendMessage} className="input2" ref={inputRef} contentEditable="true">Enter Message</div>
            <div className="flex items-center gap-x-2">
                <div className="circle"><ImImage/></div>
                <div className="circle"><GrEmoji/></div>
            </div>
        </div>
    );
};

export default MessageInput;