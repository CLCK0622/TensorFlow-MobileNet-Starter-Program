
function upload(file) {
    if (file !== undefined)
        document.getElementById("mainImg").src = URL.createObjectURL(file);
    classify();
}

function replaceImg() {
    let imgAddr = document.getElementById("submitUrl").value;
    document.getElementById("mainImg").src = imgAddr;
    console.log(imgAddr);
}

let album = ['cat1', 'cat2', 'dog1', 'dog2'];

function displayImg() {
    console.log("render begin! ");
    const imgEl = document.getElementById("exampleEl");
    imgEl.innerHTML += "<u>Examples</u>: ";
    for (let i = 0; i < 4; i++) {
        console.log("example" + (i + 1));
        imgEl.innerHTML += '<img id="example" class="rounded-lg" alt="Picture Load Failed! " src="/static/img/imgrec/' + album[i] + '.jpg" style="width: 10%; margin: 10px; display: inline; " onclick="document.getElementById(' + "'mainImg'" + ').src = this.src;" />'
    }
    document.getElementById("exButt").innerHTML = "";
    // console.log(imgEl);
}

let net;
let netload = false;

function reloadMobilenet() {
    netload = false;
    loadMobilenet();
}

async function loadMobilenet() {
    document.getElementById("status").innerHTML = "<u>loading... </u>";
    if (!netload) {
        net = await mobilenet.load();
        console.log("done loading mobile net");
    }
    netload = true;
    document.getElementById("status").innerHTML = "<span style='color: red; '>Done! </span>";
    classify();
}

async function classify() {
    await net;
    const img = document.getElementById("mainImg");
    console.log(img);
    const ans = await net.classify(img);
    console.log(ans);
    document.getElementById("ans").innerHTML = ans[0].className;
    document.getElementById("ansProb").innerHTML = ans[0].probability;
}
