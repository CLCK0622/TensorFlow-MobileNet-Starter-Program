function upload(file) {
    if (file !== undefined)
        document.getElementById("mainimg").src = URL.createObjectURL(file);
}

function replaceImg() {
    let imgAddr = document.getElementById("submitUrl").value;
    document.getElementById("mainimg").src = imgAddr;
    console.log(imgAddr);
}