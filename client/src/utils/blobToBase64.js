function blobToBase64(blob) {
    return new Promise( (resolve) => {
        let reader = new FileReader()
        reader.onload = function (e) {
            resolve(e.target.result)
        }
        if (blob) {
            reader.readAsDataURL(blob)
        }

        reader.onerror  = function (){
            resolve(null)
        }
    })
}

export default blobToBase64