import React, {useRef, useState} from 'react';
import { GrEmoji, ImImage} from "react-icons/all";
import blobToBase64 from "../utils/blobToBase64";


const MessageInput = ({auth, messengerNsp, roomId}) => {

    const inputRef = useRef()

    const [images, setImages] = useState({})

    function handleSendMessage(e) {
        // shift + enter to send message
        if(e.shiftKey && e.keyCode === 13){
            messengerNsp.emit("send-message", {
                roomId: roomId,
                senderId: auth.id,
                text: inputRef.current?.textContent || "",
                ...makeKeyValueFile(images)
            })
            setImages({})
            inputRef.current.innerHTML = null
        }
    }


    function handleChooseImage(){
        let imgInput = document.createElement("input")
        imgInput.setAttribute("type", "file")
        imgInput.addEventListener("change", imageChange)
        imgInput.click()
    }


    async function imageChange(e){
        let file = e.target.files[0]
        let base64 = await blobToBase64(file)
        let updateImages  = {...images}
        if(base64){
            if(!updateImages[file.name]){
                updateImages[file.name] = {base64, blob: file}
            }
        }

        setImages(updateImages)
    }

    function makeKeyValueFile(images){
        let uploadImages = {}
        if(Object.keys(images).length > 0){
            for (let imagesKey in images) {
                uploadImages[imagesKey] = images[imagesKey].blob
            }
        }
        return uploadImages
    }


    return (
        <div className="mt-4">
            <div className="message-input ">
                <div className="w-full">
                    <div  onKeyDown={handleSendMessage} className="input2" ref={inputRef} contentEditable="true">Enter Message</div>

                    <div className="flex items-center gap-x-2 mt-4">
                        {Object.keys(images).map(imageName=>(
                            <div className="w-10 ">
                                <img className="rounded-xl" src={images[imageName].base64} alt=""/>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex items-center gap-x-2">
                    <div onClick={handleChooseImage} className="circle"><ImImage/></div>
                    <div className="circle"><GrEmoji/></div>
                </div>

            </div>
        </div>
    );
};

export default MessageInput;