const classifier = knnClassifier.create();
const webcamElement = document.getElementById('webcam');
let net;
let init = true;

let classes = ["uncaught"];
let ncntEx = 1;

alert("Due to some special feature of TensorFlow Mobilenet, you should click the following INIT button before usage, and you may need to train the model multiple times for better accuracy. ")

function initClick() {
    let button = document.getElementById("butFrame");
    // button.onclick = "addExampleByClick()";
    button.innerHTML = "<button id='submit' onclick='addExampleByClick()' class='mr-4 py-2 px-4 rounded-lg bg-sky-100 hover:bg-sky-700'>Submit</button>"
    console.log(button);
}

function addExampleByClick() {
    if (ncntEx == 10) {
        alert("You've touched the highest limit of numbers of pictures, please refresh the page to identify new ones. ")
    }
    let name = document.getElementById("exampleName").value;
    document.getElementById("objectList").innerHTML += "<u>" + name + "</u> ";
    console.log("added");
    classes[ncntEx] = name;
    webcamScan();
    ncntEx++;
    console.log(ncntEx);
    // if (init) {
    //     ncntEx--; init = false;
    //     addExampleByClick();
    // }
}

async function webcamScan() {
    document.getElementById("status").innerHTML = "<u style='color: red; '>loading... </u>";
    net = await mobilenet.load();
    var webcam = await tf.data.webcam(webcamElement);
    console.log("Finished");
    // console.log("document.getElementById('status').innerHTML");
    document.getElementById("status").innerHTML = "<u style='color: green; '>Done! </u>";

    // Create an object from Tensorflow.js data API which could capture image
    // from the web camera as Tensor.


    // Reads an image from the webcam and associates it with a specific class
    // index. 创建一个例子把函数直接赋值给一个变量
    // classId 是参数给我们传进去的东西进行分类

    const addExample = async classId => {
        //读取摄像头现在的元素，抓取一张照片
        const img = await webcam.capture();
        // Get the intermediate activation of MobileNet 'conv_preds' and pass that
        // to the KNN classifier.
        //用net.infer传到activation
        const activation = net.infer(img, true);
        // Pass the intermediate activation to the classifier.
        classifier.addExample(activation, classId);
        img.dispose();
    };

    // When clicking a button, add an example for that class.
    // 具体的方法调用
      document.getElementById('submit').addEventListener('click', () => addExample(ncntEx));
    //   document.getElementById('class-c').addEventListener('click', () => addExample(2));


    while (true) {
        if (classifier.getNumClasses() > 0) {
            const img = await webcam.capture();
            // Get the activation from mobilenet from the webcam.
            const activation = net.infer(img, 'conv_preds');
            // Get the most likely class and confidence from the classifier module.
            const result = await classifier.predictClass(activation);
            document.getElementById('ans').innerText = classes[result.label - 1];
            document.getElementById('ansProb').innerText = result.confidences[result.label]
            console.log(result);
            console.log(result.confidences[result.label]);
            console.log(classes[result.label - 1]);
            console.log(classes);
            img.dispose();
        }
        await tf.nextFrame();
    }
}
webcamScan();
