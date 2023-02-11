import client from "../prisma/client";

function saveMessage(roomId, text, files, senderId){
    return new Promise(async (resolve, reject)=>{
        try{
            let newRoom = await client.message.create({
                data: {
                    roomId: roomId,
                    text: text,
                    seen: false,
                    files: files,
                    senderId: senderId,
                }
            })
            resolve(true)
        } catch (ex){
            console.log(ex)
            resolve(null)
        }
    })
}


export default saveMessage