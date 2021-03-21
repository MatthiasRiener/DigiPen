let canvas,
    originalSize;

// onload erzeugt einen neuen fabric canvas und resized diesen
// sodass er responsiv ist
window.onload = function () {
    createCanvas();
    originalSize = canvas.getWidth();
    resizeCanvas()
}

// wenn sich die größe des fensters ändert
$(window).resize(function () {
    if (window.innerHeight < window.outerHeight) {
        $("#startFromBeginning").data("clicked", false);
        toggleLaser()
    }
    let display = window.innerHeight >= window.outerHeight && $("#startFromBeginning").data("clicked") == true ? "flex" : "none";
    $("#presi").css('display', display);
    if (display == "flex")
        setTimeout(() => {
            resizeCanvas()
        }, 100);
});

// IMPORTANT canvas hintergrund ist mit css gefüllt
function createCanvas() {
    const fabric = window.fabric;
    // create `Canvas` object using `<canvas>` DOM node
    canvas = new fabric.Canvas('canvas');
    // create a rectangle object
    var rect = new fabric.Rect({
        left: 100,
        top: 100,
        fill: 'red',
        width: 20,
        height: 20
    });
    // "add" rectangle onto canvas
    canvas.add(rect);
    canvas.renderAll();
}

function resizeCanvas() {
    let w = $("body").width()
    let h = $("body").height()


    canvas.setWidth(h * 16 / 9);
    canvas.setHeight(h);

    // wenn das seitenverhältnis breite:höhe kleiner als 16:9 ist
    if (w / h < 16 / 9) {
        canvas.setWidth(w);
        canvas.setHeight(w * 9 / 16);
    }
    canvas.renderAll();
    // setzoom
    if (originalSize) {
        val = canvas.width / originalSize;
        canvas.setZoom(val);
    }
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
    $(this).removeClass('fadeout')
});

// laser icon click
$("#laser").click(function () {
    toggleLaser()
});

// laserpointer ein/aus
function toggleLaser() {
    if ($("#laser").data("clicked") != true) {
        $("#laser").data("clicked", true);
        $("#laser").css("color", "white");
        $("#laser").css("border-color", "white");
        // class cursortolaser macht den cursor zu einem roten punkt
        $('body, canvas, div').addClass('cursortolaser');
    } else {
        $("#laser").data("clicked", false);
        $("#laser").css("color", "rgba(255,255,255,.5)");
        $("#laser").css("border-color", "rgba(255,255,255,.5)");
        $('body, canvas, div').removeClass('cursortolaser');
    }
}

$("#startFromBeginning").click(function () {
    toggleFullScreen(document.body);
    // wenn man in den fullscreen gegangen ist ohne auf den präsentationsbutton geklickt zu haben
    // sollte man ja nicht in die präsentationsansicht kommen
    let clicked = $(this).data("clicked") != true ? true : false;
    $(this).data("clicked", clicked);
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