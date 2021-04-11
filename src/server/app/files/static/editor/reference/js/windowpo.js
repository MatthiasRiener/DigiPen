let smolCanvasArr = [];
let smolCanvasArrRaw = [];
let smolCanvas;
let currCanvasSmol;


// wait for messages from opener
window.addEventListener('message', function (e) {
    // if (e.origin !== "http://localhost:5000/editor/")
    //     return;


    if (typeof e.data.whereToStart === "number") {
        smolCanvasArrRaw = e.data.canvasArray;
        createCanvasPlaceholder();

        for (let index = 0; index < smolCanvasArrRaw.length; index++) {
            const element = JSON.parse(smolCanvasArrRaw[index]);
            loadCanvas(element, index);
            resizeCanv();
            if (index == e.data.whereToStart) {
                setCurr(index);
            }
        }
    }
    if (typeof e.data.index === "number") {
        $("#output").text(e.data.index);
        setCurr(e.data.index);
    }
});
let nW = 200;
let oldCanv;

function setCurr(ind) {
    currCanvasSmol = smolCanvasArr[ind];
    console.warn(currCanvasSmol.get('index'))
    if (oldCanv) {
        let oW = currCanvasSmol.getWidth();
        oldCanv.setWidth(oW)
        oldCanv.setHeight(oW * 9 / 16)
    }
    oldCanv = currCanvasSmol;
    currCanvasSmol.setWidth(nW)
    currCanvasSmol.setHeight(nW * 9 / 16);
}

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
        newCanvas.set('index', index);
        newCanvas.selection = false;
        newCanvas.forEachObject(function (object) {
            object.selectable = false;
        });
        newCanvas.on('mouse:up', function () {
            window.opener.postMessage({ specific: this.get('index') }, '*');
            setCurr(this.get('index'))
        });
        newCanvas.renderAll();
        smolCanvasArr.push(newCanvas)
    }, function (o, object) {

    })
}

function resizeCanv() {
    let zOEm = $(".smolCanvases").width() / 1920;
    newCanvas.setZoom(zOEm);
}