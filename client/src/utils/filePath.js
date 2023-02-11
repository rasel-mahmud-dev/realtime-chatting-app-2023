import {Backend} from "../api";

function filePath(path){
    if(!path) return ""

    return Backend + "/" +path

}
export default filePath