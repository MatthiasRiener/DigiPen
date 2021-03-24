let canvasArr = [],
    index = 0,
    currCanvas,
    originalSize;

// onload erzeugt einen neuen fabric canvas und resized diesen
// sodass er responsiv ist
window.onload = function () {
    createCanvas();
    loadCanvas(0);
    resizeCanvas()
}

// wenn sich die größe des fensters ändert
$(window).resize(function () {
    setTimeout(() => {
        if (window.innerHeight < window.outerHeight) {
            $("#startFromBeginning").data("clicked", false);
            toggleLaser(false);
        }

        let display = "flex"
        if ($("#presi").css('display') != 'flex')
            display = window.innerHeight >= window.outerHeight && $("#startFromBeginning").data("clicked") == true ? "flex" : "none";
        if (window.innerHeight < window.outerHeight) {
            display = "none";
            index = 0;
        }
        $("#presi").css('display', display);
        if (display == "flex")
            setTimeout(() => {
                resizeCanvas()
            }, 100);
    }, 500);
});

// IMPORTANT canvas hintergrund ist mit css gefüllt
function createCanvas() {
    const fabric = window.fabric;
    // create `Canvas` object using `<canvas>` DOM node
    canvas1 = new fabric.Canvas('canvas');
    canvas2 = new fabric.Canvas('canvas');
    canvas3 = new fabric.Canvas('canvas');
    // create a rectangle object
    var rect1 = new fabric.Rect({
        left: 100,
        top: 100,
        fill: 'red',
        width: 20,
        height: 20
    });

    var rect2 = new fabric.Rect({
        left: 100,
        top: 100,
        fill: 'blue',
        width: 20,
        height: 20
    });

    var rect3 = new fabric.Rect({
        left: 100,
        top: 100,
        fill: 'green',
        width: 20,
        height: 20
    });
    // "add" rectangle onto canvas
    canvas1.add(rect1);
    canvas2.add(rect2);
    canvas3.add(rect3);

    canvasArr.push(canvas1);
    canvasArr.push(canvas2);
    canvasArr.push(canvas3);


}

function loadCanvas(whereStart) {
    currCanvas = canvasArr[whereStart];
    if (originalSize == undefined)
        originalSize = currCanvas.getWidth();
    resizeCanvas();
}

function resizeCanvas() {
    let w = $("body").width()
    let h = $("body").height()
    canvasArr.forEach(element => {
        element.setWidth(h * 16 / 9);
        element.setHeight(h);

        // wenn das seitenverhältnis breite:höhe kleiner als 16:9 ist
        if (w / h < 16 / 9) {
            element.setWidth(w);
            element.setHeight(w * 9 / 16);
        }
        // setzoom
        if (originalSize) {
            val = element.width / originalSize;
            element.setZoom(val);
        }
        element.renderAll();
    });
    currCanvas.renderAll();
}

let mouseismoving = false;
let timer;
$("body").mousemove(function (event) {
    mouseismoving = true;
    if ($("#presi").css('display') == "flex") {
        $("div#iconbox").removeClass('fadeout')
        $("#iconbox").css('opacity', '1');
        $("#iconbox").css('userselect', 'auto');
    }
    $("body, canvas, div").removeClass('nocursor');

    // mousemove end
    clearTimeout(timer);
    timer = setTimeout(() => {
        mouseismoving = false;
        if ($("#presi").css('display') == "flex" && !$("div#iconbox").prop("classList").contains("fadeout"))
            $("div#iconbox").addClass('fadeout')
    }, 300);
});

$('div#iconbox').one("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function () {
    $(this).css('opacity', '0');
    $(this).css('userselect', 'none');
    $(this).removeClass('fadeout');
    $("body, canvas, div").addClass('nocursor');
});

// laser icon click
$("#laser").click(function () {
    toggleLaser(true)
});

let islaser = false;

// laserpointer ein/aus
function toggleLaser(param) {
    if ($("#laser").data("clicked") != true && param) {
        $("#laser").data("clicked", true);
        $("#laser").css("color", "white");
        $("#laser").css("border-color", "white");
        // class cursortolaser macht den cursor zu einem roten punkt
        $('body, canvas, div').addClass('cursortolaser');
        islaser = true;
    } else {
        $("#laser").data("clicked", false);
        $("#laser").css("color", "rgba(255,255,255,.5)");
        $("#laser").css("border-color", "rgba(255,255,255,.5)");
        $('body, canvas, div').removeClass('cursortolaser');
        islaser = false;
    }
}

$("#startFromBeginning").click(function () {
    toggleFullScreen(document.body);
    index = 0;
    loadCanvas(index)
    // wenn man in den fullscreen gegangen ist ohne auf den präsentationsbutton geklickt zu haben
    // sollte man ja nicht in die präsentationsansicht kommen
    let clicked = $(this).data("clicked") != true ? true : false;
    $(this).data("clicked", clicked);
    setTimeout(() => {
        let display = window.innerHeight >= window.outerHeight ? "flex" : "none";
        $("#presi").css('display', display);
        resizeCanvas()
    }, 100);
});

$("#startFromCurrent").click(function () {
    toggleFullScreen(document.body);
    index = 1;
    loadCanvas(index)
    // wenn man in den fullscreen gegangen ist ohne auf den präsentationsbutton geklickt zu haben
    // sollte man ja nicht in die präsentationsansicht kommen
    let clicked = $("#startFromBeginning").data("clicked") != true ? true : false;
    $("#startFromBeginning").data("clicked", clicked);

    setTimeout(() => {
        let display = window.innerHeight >= window.outerHeight ? "flex" : "none";
        $("#presi").css('display', display);
        resizeCanvas()
    }, 100);
});

$("#next").click(function (e) {
    next();
});

$("body").click(function (e) {
    if (e.target.id == 'exit') {
        toggleFullScreen(document.body);
        $("#presi").css('display', 'none');
        $("#startFromBeginning").data("clicked", false);
        $("div#iconbox").removeClass('fadeout');
        toggleLaser(false);
    }
    if (['previous', 'next', 'startFromBeginning', 'startFromCurrent', 'exit', 'laser', 'iconbox'].indexOf(e.target.id) == -1)
        next();
});

function next() {
    if (window.innerHeight >= window.outerHeight &&
        $("#startFromBeginning").data("clicked") == true &&
        index + 1 < canvasArr.length) {
        index++;
        loadCanvas(index);
    }
}

$("#previous").click(function () {
    if (index - 1 >= 0) {
        index--;
        loadCanvas(index);
    }
});

function toggleFullScreen(elem) {
    // ## The below if statement seems to work better ## if ((document.fullScreenElement && document.fullScreenElement !== null) || (document.msfullscreenElement && document.msfullscreenElement !== null) || (!document.mozFullScreen && !document.webkitIsFullScreen)) {
    if ((document.fullScreenElement !== undefined && document.fullScreenElement === null) || (document.msFullscreenElement !== undefined && document.msFullscreenElement === null) || (document.mozFullScreen !== undefined && !document.mozFullScreen) || (document.webkitIsFullScreen !== undefined && !document.webkitIsFullScreen)) {
        if (elem.requestFullScreen) {
            elem.requestFullScreen();
        } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullScreen) {
            elem.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        }
    } else {
        if (document.cancelFullScreen) {
            document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
}