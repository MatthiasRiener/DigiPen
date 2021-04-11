let smolCanvasArr = [];
let smolCanvas;
let originalWidthBog;
let currCanvasSmol;


// wait for messages from opener
window.addEventListener('message', function (e) {
    // if (e.origin !== "http://localhost:5000/editor/")
    //     return;

    console.log("message", e.data);
    let output = document.getElementById("output")
    output.innerText += e.data;

    if (typeof e.data.whereToStart === "number") {
        currCanvasSmol = JSON.parse(e.data.currCanvas);
        loadCanvas(currCanvasSmol);
        originalWidthBog = e.data.originalWidth;
        resizeCanv(originalWidthBog)
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
    newCanvas = new fabric.Canvas('smolCanvas');
    newCanvas.loadFromJSON(json, function () {
        newCanvas.renderAll();
        smolCanvasArr.push(newCanvas)
    }, function (o, object) {

    })
}

function resizeCanv(origWidth) {
    let zOEm = $("#smolCanvas").width() / 1920;
    newCanvas.setZoom(zOEm);
}