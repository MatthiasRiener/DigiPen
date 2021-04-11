let smolCanvasArr = [];
let smolCanvasArrRaw = [];
let smolCanvas;
let currCanvasSmol;


// wait for messages from opener
window.addEventListener('message', function (e) {
    // if (e.origin !== "http://localhost:5000/editor/")
    //     return;

    console.log("message", e.data);
    let output = document.getElementById("output")
    output.innerText += e.data;

    if (typeof e.data.whereToStart === "number") {
        smolCanvasArrRaw = e.data.canvasArray;
        createCanvasPlaceholder();

        for (let index = 0; index < smolCanvasArrRaw.length; index++) {
            const element = JSON.parse(smolCanvasArrRaw[index]);
            if (index == e.data.whereToStart) currCanvasSmol = element;
            loadCanvas(element, index);
            resizeCanv();
        }
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


function createCanvasPlaceholder() {
    for (let index = 0; index < smolCanvasArrRaw.length; index++) {
        $(document.body).append(`<canvas class="smolCanvases" id="smolcanvas${index}" width="177.77" height="100"></canvas>`);
    }
}

function loadCanvas(json, index) {
    newCanvas = new fabric.Canvas(`smolcanvas${index}`);
    newCanvas.loadFromJSON(json, function () {
        newCanvas.renderAll();
        smolCanvasArr.push(newCanvas)
    }, function (o, object) {

    })
}

function resizeCanv() {
    let zOEm = $(".smolCanvases").width() / 1920;
    newCanvas.setZoom(zOEm);
}