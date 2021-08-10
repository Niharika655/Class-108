prediction1 = "";
prediction2 = "";

Webcam.set({
    width: 350,
    height: 300,
    image_format: "png",
    png_quality: 90
});

camera = document.getElementById("camera");
Webcam.attach(camera);

function takeSnapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = "<img id='capturedImage' src='" + data_uri + "'>";
    });
}
    console.log("ml5 version : ", ml5.version);
classfier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/WfMJjAhRg/model.json", modelLoaded);

function modelLoaded() {
    console.log("Model Loaded");
}

function speak() {
    var synth = window.speechSynthesis;
    speakData1 = "The First Prediction Is " + prediction1;
    speakData2 = "And The second Prediction Is " + prediction2;
    var utterThis = new SpeechSynthesisUtterance(speakData1 + speakData2);
    synth.speak(utterThis);
}

function check() {
    img = document.getElementById("capturedImage");
    classfier.classify(img, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    } else {
                console.log(results);
                document.getElementById("result_emotion_name").innerHTML = results[0].label;
                document.getElementById("result_emotion_name2").innerHTML = results[1].label;
            prediction1 = results[0].label;
            prediction2 = results[1].label;
            speak();
            if (results[0].label == "Happy") {
                document.getElementById("update_emoji").innerHTML = "&#128522;";
            }
        if (results[0].label == "Sad") {
            document.getElementById("update_emoji").innerHTML = "&#128532;";
        }
        if (results[0].label == "Angry") {
            document.getElementById("update_emoji").innerHTML = "&#128548;";
        }
        if (results[1].label == "Happy") {
            document.getElementById("update_emoji2").innerHTML = "&#128522;";
        }
        if (results[1].label == "Sad") {
            document.getElementById("update_emoji2").innerHTML = "&#128532;";
        }
        if (results[1].label == "Angry") {
            document.getElementById("update_emoji2").innerHTML = "&#128548;";
        }
    }
}