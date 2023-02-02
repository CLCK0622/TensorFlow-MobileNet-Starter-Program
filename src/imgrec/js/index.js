let net;
async function loadMobilenet() {
    // net, mobilenet.load()
    net = await mobilenet.load();
    // let console to print a notification
    // telling us the mobilenet is loaded
    console.log("finished loading Mobilenet");
    // invoke clssifyImg() to tell us
    // the result of classification and 
    // modify the content in HTML body
    classifyImg();
}

async function classifyImg() {
    // Apply them DOM to grab the value of the
    // image element in html whose id='img'
    // document.getElementById()
    const img = document.getElementById("img");
    // consider the attribute of asynchronous 
    // .classify(the variable contain the value to be classified)
    const ans = await net.classify(img);
    // document.getElementById() <- tag's id
    // .innerHTML = 
    // "This is probably like a:" + 
    // combine the RHS of "=" with ans[0].classname
    document.getElementById("text").innerHTML = "This is probably like a:" + ans[0].classname;
}

let i = 1;
function clickImg() {
    i = i == 1 ? 2 : 1;
    const img = document.getElementById('img');
    img.src = "media/" + i + ".jpg";
    setTimeout(() => classifyImg(), 10000);
}
