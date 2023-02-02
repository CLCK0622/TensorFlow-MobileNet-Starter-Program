const classifier = knnClassifier.create();
const webcamElement = document.getElementById('webcam');
let net;

let example = [];
let ncntEx = 0;

async function webcamScan() {
    document.getElementById("status").innerHTML = "<u style='color: red; '>loading... </u>";
    net = await mobilenet.load();
    console.log("Finished");
    // console.log("document.getElementById('status').innerHTML");
    document.getElementById("status").innerHTML = "<u style='color: green; '>Done! </u>";

    // Create an object from Tensorflow.js data API which could capture image
    // from the web camera as Tensor.

    const webcam = await tf.data.webcam(webcamElement);

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
    //   document.getElementById('class-a').addEventListener('click', () => addExample(0));
    //   document.getElementById('class-b').addEventListener('click', () => addExample(1));
    //   document.getElementById('class-c').addEventListener('click', () => addExample(2));


    while (true) {
        if (classifier.getNumClasses() > 0) {
            const img = await webcam.capture();
            // Get the activation from mobilenet from the webcam.
            const activation = net.infer(img, 'conv_preds');
            // Get the most likely class and confidence from the classifier module.
            const result = await classifier.predictClass(activation);

            const classes = ['Happy', 'Okay', 'Sad'];
            document.getElementById('text').innerText = "Your emotional status: " + classes[result.label];

            img.dispose();
        }
        await tf.nextFrame();
    }
}
webcamScan();
