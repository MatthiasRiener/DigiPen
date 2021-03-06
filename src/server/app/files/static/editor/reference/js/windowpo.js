let smolCanvasArr = [];
let smolCanvasArrRaw = [];
let smolCanvas;
let currCanvasSmol;
let totalSeconds = 0;
let minutesLabel = document.getElementById("minutes");
let secondsLabel = document.getElementById("seconds");
let hoursLabel = document.getElementById("hours");
let timertimer;
let bigSmol;


// wait for messages from opener
window.addEventListener('message', function (e) {
    // if (e.origin !== "http://localhost:5000/editor/")
    //     return;
   

    if (typeof e.data.whereToStart === "number") {
        


        smolCanvasArrRaw.length = 0;
        smolCanvasArrRaw = e.data.canvasArray.map((el, index) => {
            $("#canvases").append(`
            <div class="smol-canvas-overlay" style="position: relative; z-index: 2; height:100; width: 177.77;">
                <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 10;" ></div>
                <canvas class="smolCanvases" id="smolcanvas${index}" width="177.77" height="100"></canvas>
            </div>
            `
            );
            return JSON.parse(el);
        })
        

        smolCanvasArr = e.data.canvasArray.map((el, index) => {
            c = loadCanvas(el, index);
            resizeCanv(c);
            return c;
        })



        $("#pagecount").text(`Slide ${e.data.whereToStart + 1}/${smolCanvasArrRaw.length}`);

       
        createCanvas(smolCanvasArrRaw[e.data.whereToStart]);
        setCurr(e.data.whereToStart);
    }
    if (typeof e.data.time === "number") {
        totalSeconds = e.data.time;
        setTime();
        if (e.data.timertimer != null)
            timertimer = setInterval(setTime, 1000);
    }
    if (typeof e.data.index === "number") {

        $("#pagecount").text(`Slide ${e.data.index + 1}/${smolCanvasArrRaw.length}`);
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
$("#timereset").click(function () {
    if (timertimer) {
        clearInterval(timertimer)
        timertimer = null;
    }
    totalSeconds = 0;
    timertimer = setInterval(setTime, 1000);
    window.opener.postMessage('timereset', '*');
})

function setCurr(ind) {
    currCanvasSmol = smolCanvasArr[ind];


    if (oldCanv && typeof oldInd === "number") {
        let oW = currCanvasSmol.getWidth();
        oldCanv.setWidth(oW)
        oldCanv.setHeight(oW * 9 / 16)

        let zOEm = oldCanv.getWidth() / 1920;
        oldCanv.setZoom(zOEm);

        if (oldInd - 1 >= 0)
            document.querySelectorAll('.canvas-container')[oldInd - 1].classList.remove('prevCanvContSmol')
        document.querySelectorAll('.canvas-container')[oldInd].classList.remove('currCanvContSmol')
        if (oldInd + 1 < smolCanvasArr.length)
            document.querySelectorAll('.canvas-container')[oldInd + 1].classList.remove('nextCanvContSmol')
    }
    oldCanv = currCanvasSmol;
    oldInd = ind;
    currCanvasSmol.setWidth(nW)
    currCanvasSmol.setHeight(nW * 9 / 16);


    currCanvasSmol.selection = false;
    currCanvasSmol.forEachObject(function (object) {
        object.selectable = false;
    });

    let zOEm = currCanvasSmol.getWidth() / 1920;
    currCanvasSmol.setZoom(zOEm);

    var json = currCanvasSmol.toObject();
    bigSmol.loadFromJSON(json);

    if (ind - 1 >= 0)
        document.querySelectorAll('.canvas-container')[ind - 1].classList.add('prevCanvContSmol')
    document.querySelectorAll('.canvas-container')[ind].classList.add('currCanvContSmol')
    if (ind + 1 < smolCanvasArr.length)
        document.querySelectorAll('.canvas-container')[ind + 1].classList.add('nextCanvContSmol')
}

$("#next").click(function () {
    window.opener.postMessage('next', '*');
});
$("#previous").click(function () {
    window.opener.postMessage('previous', '*');
});

// tell the opener we are waiting
window.opener.postMessage('inited', '*');




function createCanvas(json) {
    bigSmol = new fabric.Canvas('bigsmol');
    bigSmol.loadFromJSON(json, function () {
        bigSmol.selection = false;
        bigSmol.forEachObject(function (object) {
            object.selectable = false;
        });
        bigSmol.renderAll();
    }, function (o, object) {

    })
    bigSmol.renderAll();

    resizeMain();
    let zOEm = $("#bigsmol").width() / 1920;
    bigSmol.setZoom(zOEm);
}

$(window).resize(function () {
    resizeMain();
});

function resizeMain() {
    let w = $("#currentCanvasDisplayBox").height() * 16 / 9;
    let h = $("#currentCanvasDisplayBox").height();
    let ratio = $("#currentCanvasDisplayBox").width() / $("#currentCanvasDisplayBox").height();
    if (ratio < (16 / 9)) {
        w = $("#currentCanvasDisplayBox").width();
        h = $("#currentCanvasDisplayBox").width() * 9 / 16;
    }

    bigSmol.setWidth(w);
    bigSmol.setHeight(h);

    // set zoom
    let zOEm = $("#bigsmol").width() / 1920;
    bigSmol.setZoom(zOEm);
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
    }, function (o, object) {

    })

    return newCanvas;
}

function resizeCanv(paramCanvas) {
    let zOEm = $(".smolCanvases").width() / 1920;
    paramCanvas.setZoom(zOEm);
}


$('body').on('click', '.smol-canvas-overlay', function() {
    const container = $(this);
    const child = container.find(".smolCanvases");
    var index = parseInt(child.attr("id").replace("smolcanvas", ""));
    setCurr(index);
    window.opener.postMessage({'specific': index}, "*");

    
})