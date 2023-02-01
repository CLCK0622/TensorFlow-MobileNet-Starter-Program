function upload(file) {
    if (file !== undefined)
        document.getElementById("mainimg").src = URL.createObjectURL(file);
}

function replaceImg() {
    let imgAddr = document.getElementById("submitUrl").value;
    document.getElementById("mainimg").src = imgAddr;
    console.log(imgAddr);
}

let album = ['cat1', 'cat2', 'dog1', 'dog2'];

function displayImg() {
    console.log("render begin! ");
    const imgEl = document.getElementById("exampleEl");
    imgEl.innerHTML += "<u>Examples</u>: ";
    for (let i = 0; i < 4; i++) {
        console.log("example" + (i + 1));
        imgEl.innerHTML += '<img id="img1" class="shadow-2xl bg-white rounded-lg" alt="Picture Load Failed! " src="/static/img/imgrec/' + album[i] + '.jpg"  width="10%" style="display: inline; margin: 10px; " onclick="document.getElementById(' + "'mainimg'" + ').src = this.src;" />'
    }
    document.getElementById("exButt").innerHTML = "";
    // console.log(imgEl);
}