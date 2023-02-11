import {writeFile} from "fs/promises";
import path from "path";

function fileUpload(file, fileName){

    return new Promise(async (resolve)=>{
       try{
           let filePath = `public/${fileName}`
           await writeFile(path.resolve(filePath), file)
           resolve(filePath)
       } catch (ex){
           resolve("")
       }
    })
}

export default fileUpload