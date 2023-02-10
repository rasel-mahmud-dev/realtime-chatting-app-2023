function getFirstLetter(username){
    if(!username) return ""
    let split = username.split(" ")
    let l = split[0][0] + (split[1] ? split[1][0] : "")
    return l.toUpperCase()
}

export default getFirstLetter