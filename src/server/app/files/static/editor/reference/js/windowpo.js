let smolCanvasArr = [];
let smolCanvasArrRaw = [];
let smolCanvas;
let currCanvasSmol;
let totalSeconds = 0;
let minutesLabel = document.getElementById("minutes");
let secondsLabel = document.getElementById("seconds");
let hoursLabel = document.getElementById("hours");
let timertimer;


// wait for messages from opener
window.addEventListener('message', function (e) {
    // if (e.origin !== "http://localhost:5000/editor/")
    //     return;


    if (typeof e.data.whereToStart === "number") {
        smolCanvasArrRaw = e.data.canvasArray;
        createCanvasPlaceholder();
        $("#output").text(`Slide ${e.data.whereToStart + 1}/${smolCanvasArrRaw.length}`);
        for (let index = 0; index < smolCanvasArrRaw.length; index++) {
            const element = JSON.parse(smolCanvasArrRaw[index]);
            loadCanvas(element, index);
            resizeCanv();
            if (index == e.data.whereToStart) {
                setCurr(index);
            }
        }
    }
    if (typeof e.data.time === "number") {
        totalSeconds = e.data.time;
        setTime();
        if (e.data.timertimer != null)
            timertimer = setInterval(setTime, 1000);
    }
    if (typeof e.data.index === "number") {
        $("#output").text(`Slide ${e.data.index + 1}/${smolCanvasArrRaw.length}`);
        setCurr(e.data.index);
    }
});
let nW = 200;
let oldCanv, oldInd;

function setTime() {
    ++totalSeconds;
    secondsLabel.innerHTML = pad(totalSeconds % 60);
    minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60) % 60);
    hoursLabel.innerHTML = pad(parseInt(totalSeconds / 3600));
}

function pad(val) {
    let valString = val + "";
    if (valString.length < 2) {
        return "0" + valString;
    } else {
        return valString;
    }
}

$("#play").click(function () {
    if (!timertimer) {
        timertimer = setInterval(setTime, 1000);
        window.opener.postMessage('timerplay', '*');
    }
})
$("#pause").click(function () {
    if (timertimer) {
        clearInterval(timertimer)
        timertimer = null;
        window.opener.postMessage('timerpause', '*');
    }
})

function setCurr(ind) {
    currCanvasSmol = smolCanvasArr[ind];
    if (oldCanv && typeof oldInd === "number") {
        let oW = currCanvasSmol.getWidth();
        oldCanv.setWidth(oW)
        oldCanv.setHeight(oW * 9 / 16)
        document.querySelectorAll('.canvas-container')[oldInd].classList.remove('currCanvContSmol')
    }
    oldCanv = currCanvasSmol;
    oldInd = ind;
    console.log(document.querySelectorAll('.canvas-container')[oldInd]);
    currCanvasSmol.setWidth(nW)
    currCanvasSmol.setHeight(nW * 9 / 16);
    document.querySelectorAll('.canvas-container')[ind].classList.add('currCanvContSmol')

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