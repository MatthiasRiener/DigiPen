let trackingIndex = 0;

$(document).ready(function () {
    console.log('Document loaded.');
    addSlide();
    toggleVisibility(0);
});

/* --------------- SLides-Menu --------------- */

$('#content-leftSlides-topBar-plus').click(function () {
    addSlide();
});

function addSlide() {
    let slides = $('.content-leftSlides-slidesContent-slide');
    let width = 10;
    let height = width / (16 / 9);

    $('#content-leftSlides-slidesContent').append(`
    <div class="content-leftSlides-slidesContent-slide">
        <div class="content-leftSlides-slidesContent-slide-leftBar ${slides.length == 0 ? 'activeSlide' : ''}" style="height: ${height}vw;"></div>
        <div class="content-leftSlides-slidesContent-slide-middleBar" style="height: ${height}vw;">${slides.length + 1}</div>
        <div class="content-leftSlides-slidesContent-slide-content" style="height: ${height}vw; ${slides.length == 0 ? 'transform: scale(0.95);' : ''}" onclick="toggleVisibility(${slides.length})"></div>
    </div>`);

    $('#content-leftSlides-slidesContent-animatedBar').height(height + 'vw');
}

function toggleVisibility(index) {
    trackingIndex = index;
    $('#content-leftSlides-slidesContent-animatedBar').css({
        'top': `${$("#content-leftSlides-slidesContent-animatedBar").position().top}`
    }).animate({
        "top": `${$('.content-leftSlides-slidesContent-slide-leftBar').eq(trackingIndex).position().top}px`
    }, "slow");
}

$('#content-leftSlides-slidesContent').scroll(function () {
    $('#content-leftSlides-slidesContent-animatedBar').css("top", `${$('.content-leftSlides-slidesContent-slide-leftBar').eq(trackingIndex).position().top}px`);
});

/* --------------- POPUPS --------------- */

// open slides popup
$('#content-leftSlides-topBar-down').click(function () {
    $('#popupBox').css('display', 'flex');
    $('#popupBox').animate({
        opacity: 1.0
    }, 100);
});

// close slides popup
$('#popupBox-top-controls-buttons-exit').click(function () {
    $('#popupBox').css('display', 'none');
    $('#popupBox').css('opacity', '0.0');
});

// open add-object popup
$('#content-navigation-first-right-icon').click(function () {
    $('#addObjectPopup').css('display', 'flex');
    $('#addObjectPopup-inner-popup').css('display', 'flex');
    $('#addObjectPopup-inner-popup').animate({
        margin: "1.5vh 0.8vw 0 0.4vw",
        opacity: 1.0
    }, 100);
});

// close popups when creatin text
$('#addObjectPopup-inner-popup-text').click(function () {
    $('#addObjectPopup').css('display', 'none');
    closeInnerPopups();
});

// open image popup in add-object popup
$('#addObjectPopup-inner-popup-image').click(function () {
    closeInnerPopups();

    $('#addObjectPopup-inner-pictures').css('display', 'flex');
    $('#addObjectPopup-inner-pictures').animate({
        margin: "1.5vh 0vw",
        opacity: 1.0
    }, 100);
});

// open chart popup in add-object popup
$('#addObjectPopup-inner-popup-chart').click(function () {
    closeInnerPopups();

    $('#addObjectPopup-inner-chart').css('display', 'flex');
    $('#addObjectPopup-inner-chart').animate({
        margin: "1.5vh 0vw",
        opacity: 1.0
    }, 100);
});

// open quiz popup in add-object popup
$('#addObjectPopup-inner-popup-quiz').click(function () {
    closeInnerPopups();

    $('#addObjectPopup-inner-quiz').css('display', 'flex');
    $('#addObjectPopup-inner-quiz').animate({
        margin: "1.5vh 0.8vw 0vw 0vw",
        opacity: 1.0
    }, 100);
});

// open second quiz popup in add-object popup
$('.addObjectPopup-inner-quiz-bottom-row').click(function () {
    $('#addObjectPopup-inner-quizInfo').css('display', 'flex');
    $('#addObjectPopup-inner-quizInfo').animate({
        margin: "1.5vh 0vw",
        opacity: 1.0
    }, 100);
});

// close all add-objects popups
$(document).click(function (event) {
    if (!$(event.target).closest("#addObjectPopup-inner-popup, #content-navigation-first-right-icon, #addObjectPopup-inner-pictures, #addObjectPopup-inner-popup-image, #addObjectPopup-inner-chart, #addObjectPopup-inner-quiz, #addObjectPopup-inner-quizInfo").length) {
        $('#addObjectPopup').css('display', 'none');

        $('#addObjectPopup-inner-popup').css('display', 'none');
        $('#addObjectPopup-inner-popup').css('margin', '0vh 0.8vw 0 0.4vw');
        $('#addObjectPopup-inner-popup').css('opacity', '0.0');

        closeInnerPopups();
    }
});

// close add objects inner popups
function closeInnerPopups() {
    $('#addObjectPopup-inner-pictures').css('display', 'none');
    $('#addObjectPopup-inner-pictures').css('margin', '1.5vh 0vw');
    $('#addObjectPopup-inner-pictures').css('opacity', '0.0');

    $('#addObjectPopup-inner-chart').css('display', 'none');
    $('#addObjectPopup-inner-chart').css('margin', '1.5vh 0vw');
    $('#addObjectPopup-inner-chart').css('opacity', '0.0');

    $('#addObjectPopup-inner-quiz').css('display', 'none');
    $('#addObjectPopup-inner-quiz').css('margin', '1.5vh 0vw');
    $('#addObjectPopup-inner-quiz').css('opacity', '0.0');

    $('#addObjectPopup-inner-quizInfo').css('display', 'none');
    $('#addObjectPopup-inner-quizInfo').css('margin', '1.5vh 0vw');
    $('#addObjectPopup-inner-quizInfo').css('opacity', '0.0');
}

// open charts popup
$('.addObjectPopup-inner-chart-bottom-content-row').click(function () {
    $('#addObjectPopup').css('display', 'none');

    $('#addObjectPopup-inner-popup').css('display', 'none');
    $('#addObjectPopup-inner-popup').css('margin', '0vh 0.8vw 0 0.4vw');
    $('#addObjectPopup-inner-popup').css('opacity', '0.0');

    closeInnerPopups();

    $('#chartsPopup').css('display', 'flex');
    $('#chartsPopup').animate({
        opacity: 1.0
    }, 100);



});

// close charts popup
$('#chartsPopup-inner-right-settings-close').click(function () {
    $('#chartsPopup').css('display', 'none');
    $('#chartsPopup').css('opacity', '0.0');
});

// open settings popup
$('#content-navigation-second-settings').click(function () {
    $('#settingsPopup').css('display', 'flex');
    $('#settingsPopup').animate({
        opacity: 1.0
    }, 100);
});

// close settings popup
$('#settingsPopup-inner-bottom-header-exit').click(function () {
    $('#settingsPopup').css('display', 'none');
    $('#settingsPopup').css('opacity', '0.0');
    $('#settingsPopup-inner-bottom-button-join').css('display', 'none');
});

// open cam popup in settings popup
$('#settingsPopup-inner-bottom-settings-cam-bottom-popup').click(function () {
    $('#camPopup').css('display', 'flex');
    $('#camPopup-inner-popup').css('display', 'flex');
    $('#camPopup-inner-popup').animate({
        opacity: 1.0
    }, 100);
});

// close cam popup in settings popup
$(document).click(function (event) {
    if (!$(event.target).closest("#camPopup-inner-popup, #settingsPopup-inner-bottom-settings-cam-bottom-popup").length) {
        $('#camPopup').css('display', 'none');
        $('#camPopup-inner-popup').css('display', 'none');
        $('#camPopup-inner-popup').css('opacity', '0.0');
    }
});

// open mic popup in settings popup
$('#settingsPopup-inner-bottom-settings-mic-bottom-popup').click(function () {
    $('#micPopup').css('display', 'flex');
    $('#micPopup-inner-popup').css('display', 'flex');
    $('#micPopup-inner-popup').animate({
        opacity: 1.0
    }, 100);
});

// close mic popup in settings popup
$(document).click(function (event) {
    if (!$(event.target).closest("#micPopup-inner-popup, #settingsPopup-inner-bottom-settings-mic-bottom-popup").length) {
        $('#micPopup').css('display', 'none');
        $('#micPopup-inner-popup').css('display', 'none');
        $('#micPopup-inner-popup').css('opacity', '0.0');
    }
});

// open presentation-mode popup
$('#content-navigation-fifth-box-down').click(function () {
    $('#presentationModePopup').css('display', 'flex');
    $('#presentationModePopup-inner-popup').css('display', 'flex');
    $('#presentationModePopup-inner-popup').animate({
        margin: "1.5vh 1vw",
        opacity: 1.0
    }, 100);
});

// close presentation-mode popup
$(document).click(function (event) {
    if (!$(event.target).closest("#presentationModePopup-inner-popup, #content-navigation-fifth-box-down").length) {
        $('#presentationModePopup-inner-popup').css('display', 'none');
        $('#presentationModePopup').css('display', 'none');
        $('#presentationModePopup-inner-popup').css('margin', '0vh 1.5vh');
        $('#presentationModePopup-inner-popup').css('opacity', '0.0');
    }
});


// open shortcut popup
$('#content-navigation-fifth-box-shortcut').click(function () {
    $('#shortcutPopup').css('display', 'flex');
    $('#shortcutPopup-inner-popup').css('display', 'flex');
    $('#shortcutPopup-inner-popup').animate({
        margin: "1.5vh 1vw",
        opacity: 1.0
    }, 100);
});

// close shortcut popup
$(document).click(function (event) {
    if (!$(event.target).closest("#shortcutPopup-inner-popup, #content-navigation-fifth-box-shortcut").length) {
        $('#shortcutPopup-inner-popup').css('display', 'none');
        $('#shortcutPopup').css('display', 'none');
        $('#shortcutPopup-inner-popup').css('margin', '0vh 1.5vh');
        $('#shortcutPopup-inner-popup').css('opacity', '0.0');
    }
});

//Navigation

$('body').on('click', '.ed_bt_arrow_click', function () {
    window.location = "../../../src/dashboard/index.html"
})

$('body').on('click', '#shortcutPopup-inner-popup-change', function () {
    window.location = "../../../src/keybindings/index.html"
})






/***
 * Presentation Event
 */

let canvasArr = [],
    index = 0,
    curretSlide = 1,
    presCanvasId = 'presCanvas',
    startFromBeginningButtonId = 'presentationModePopup-inner-popup-start',
    startFromCurrentButtonId = 'presentationModePopup-inner-popup-current',
    currCanvas,
    origSizePresCanvas;

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
            $("#" + startFromBeginningButtonId).data("clicked", false);
            toggleLaser(false);
        }

        let display = "flex"
        if ($("#presi").css('display') != 'flex')
            display = window.innerHeight >= window.outerHeight && $("#" + startFromBeginningButtonId).data("clicked") == true ? "flex" : "none";
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
    canvas1 = new fabric.Canvas(presCanvasId);
    canvas2 = new fabric.Canvas(presCanvasId);
    canvas3 = new fabric.Canvas(presCanvasId);
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
    if (origSizePresCanvas == undefined)
        origSizePresCanvas = currCanvas.getWidth();
    resizeCanvas();
}

function resizeCanvas() {
    let w = $("body").width()
    let h = $("body").height()
    let canvasBody = $("#presi .canvas-container");
    canvasArr.forEach(element => {
        element.setWidth(h * 16 / 9);
        element.setHeight(h);
        canvasBody.addClass('wtohbigger');
        canvasBody.removeClass('wtohsmaller');

        // wenn das seitenverhältnis breite:höhe kleiner als 16:9 ist
        if (w / h < 16 / 9) {
            element.setWidth(w);
            element.setHeight(w * 9 / 16);
            canvasBody.addClass('wtohsmaller');
            canvasBody.removeClass('wtohbigger');
        }
        // setzoom
        if (origSizePresCanvas) {
            val = element.width / origSizePresCanvas;
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
    let removeFadeout;
    clearTimeout(timer);
    timer = setTimeout(() => {
        clearTimeout(removeFadeout);
        mouseismoving = false;
        if ($("#presi").css('display') == "flex" && !$("div#iconbox").prop("classList").contains("fadeout")) {
            $("div#iconbox").addClass('fadeout')
            removeFadeout = setTimeout(() => {
                $('div#iconbox').css('opacity', '0');
                $('div#iconbox').css('userselect', 'none');
                $('div#iconbox').removeClass('fadeout');
                $("body, canvas, div").addClass('nocursor');
            }, 4000);
        }
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

$("#" + startFromBeginningButtonId).click(function () {
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

$("#" + startFromCurrentButtonId).click(function () {
    toggleFullScreen(document.body);
    index = curretSlide;
    loadCanvas(index)
    // wenn man in den fullscreen gegangen ist ohne auf den präsentationsbutton geklickt zu haben
    // sollte man ja nicht in die präsentationsansicht kommen
    let clicked = $("#" + startFromBeginningButtonId).data("clicked") != true ? true : false;
    $("#" + startFromBeginningButtonId).data("clicked", clicked);

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
        $("#" + startFromBeginningButtonId).data("clicked", false);
        $("div#iconbox").removeClass('fadeout');
        toggleLaser(false);
    }
    if (['editblock'].indexOf(e.target.id) >= 0)
        next();
});

function next() {
    if (window.innerHeight >= window.outerHeight &&
        $("#" + startFromBeginningButtonId).data("clicked") == true &&
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