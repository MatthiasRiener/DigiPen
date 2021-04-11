let smolCanvasArr = [];
let smolCanvas;


// wait for messages from opener
window.addEventListener('message', function (e) {
    // if (e.origin !== "http://localhost:5000/editor/")
    //     return;
    console.log("data:", e.data);
    let output = document.getElementById("output")
    output.innerText += e.data;
    console.log(typeof e.data.whereToStart === Number);

    if (typeof e.data.whereToStart === "number") {
        loadCanvas(JSON.parse(e.data.currCanvas));
    }
});

$("#next").click(function () {
    window.opener.postMessage('next', '*');
});
$("#previous").click(function () {
    window.opener.postMessage('previous', '*');
});

// tell the opener we are waiting
window.opener.postMessage('inited', '*');


function loadCanvas(json) {
    console.log(json)
    newCanvas = new fabric.Canvas('smolCanvas');
    newCanvas.loadFromJSON(json, function () {
        console.log("Canvas loaded!")
        console.warn(newCanvas)
        newCanvas.renderAll();
        smolCanvasArr.push(newCanvas)
        resizeCanv();
    }, function (o, object) {

    })
}

function resizeCanv() {

}