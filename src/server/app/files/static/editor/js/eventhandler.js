let trackingIndex = 0;

$(document).ready(function () {
    console.log('Document loaded.');
});

/* --------------- SLides-Menu --------------- */

$('#content-leftSlides-topBar-plus').click(function () {
    createSlide();
});

function addSlide(slide) {
    let slides = $('.content-leftSlides-slidesContent-slide');
    let width = 10;
    let height = width / (16 / 9);

    sideC = insertSlide(slide);

    sideC.loadFromJSON(slide.canvas, function () {
        sideC.renderAll();

        $('#content-leftSlides-slidesContent').append(`
    <div class="content-leftSlides-slidesContent-slide" data-slide="${slide._id.$oid}">
        <div class="content-leftSlides-slidesContent-slide-leftBar ${slides.length == 0 ? 'activeSlide' : ''}" style="height: ${height}vw;"></div>
        <div class="content-leftSlides-slidesContent-slide-middleBar" style="height: ${height}vw;">${slide.s_id}</div>
        <div class="content-leftSlides-slidesContent-slide-content" data-slide="${slide._id.$oid}" data-length="${slides.length}" style="position: relative; z-index: 2; height: ${height}vw; ${slides.length == 0 ? 'transform: scale(0.95);' : ''}">
            <div class="content-leftSlides-slidesContent-slide-content-overlay" data-slideId="${slide._id.$oid}" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 10; background: url('${'data:image/svg+xml;utf8,' + encodeURIComponent(sideC.toSVG())}'); background-size: cover; background-position: center; background-repeat: no-repeat"></div>
            <canvas class="content-leftSlides-slidesContent-slide-content-canvas" id="${slide._id.$oid}" style="position: absolute; z-index: 1; width: 100%; height: 100%;"></canvas>
        </div>
    </div>`);

        $('#content-leftSlides-slidesContent-animatedBar').height(height + 'vw');



    }, function (o, object) {
        console.log("Canvas loaded!")
    })
}

function insertSlide(slide) {
    var dummyC = new fabric.Canvas();
    dummyC.enableGLFiltering = false;

    dummyC.clear();

    dummyC.setDimensions({ width: 1920, height: 1080 })

    return dummyC;
}

$('body').on('click', '.content-leftSlides-slidesContent-slide-content', function () {
    toggleVisibility($(this).data("slide"), $(this).data("length"));
});

function toggleVisibility(slideID, index) {
    trackingIndex = index;
    $('#content-leftSlides-slidesContent-animatedBar').css({
        'top': `${$("#content-leftSlides-slidesContent-animatedBar").position().top}`
    }).animate({
        "top": `${$('.content-leftSlides-slidesContent-slide-leftBar').eq(trackingIndex).position().top}px`
    }, "slow");
    switchSlide(slideID);
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
    window.location = baseURL + "/dashboard"
})

$('body').on('click', '#shortcutPopup-inner-popup-change', function () {
    window.location = baseURL + "/keybinding"
})

function setCanvasID(id) {
    $('#content-main-inner-spacing-middle').data('canvasID', id);
}

function getCanvasID() {
    return $('#content-main-inner-spacing-middle').data('canvasID');
}

let canvasArr = [], // Array von Canvasen sie in der Präsentation sichtbar sind
    index = 0, // index = Bei welcher Folie bin ich?
    curretSlide = 1, // bei welcher Folie soll die Präsentation starten, wenn man auf "From current slide" clickt
    presCanvasId = 'presCanvas', // Canvas html id, wo die fabric objekte hineingeladen werden
    startFromBeginningButtonId = 'presentationModePopup-inner-popup-start', // button-id für "From start"
    startFromCurrentButtonId = 'presentationModePopup-inner-popup-current', // button-id für "From current slide"
    currCanvas, // currCanvas = welcher canvas wird gerade angezeigt?
    origSizePresCanvas; // ist wichtig für den zoom-wert (responsive n' shit)

// onload erzeugt einen neuen fabric canvas und resized diesen
// sodass er responsiv ist

// wenn sich die größe des fensters ändert
$(window).resize(function () {
    setTimeout(() => {
        if (window.innerHeight < window.outerHeight) {
            $("#" + startFromBeginningButtonId).data("clicked", false);
            toggleLaser(false);
        }

        let display = "flex"
        if ($("#presi").css('display') != 'flex')
            display = window.innerHeight >= window.outerHeight && $("#" + startFromBeginningButtonId).data("clicked") == true && !isPopup && !shouldVanish ? "flex" : "none";
        if (window.innerHeight < window.outerHeight && !isPopup && shouldVanish) {
            display = "none";
            index = 0;
            // popupWindow = null;
        }
        $("#presi").css('display', display);
        if (display == "flex")
            setTimeout(() => {
                resizePresentationCanvas()
            }, 100);
        else {
            totalSeconds = 0;
            timerpause();
        }
    }, 500);
});

// IMPORTANT canvas hintergrund ist mit css gefüllt
function createCanvas(whereStart) {
    const fabric = window.fabric;
    // create `Canvas` object using `<canvas>` DOM node
    /*canvas1 = new fabric.Canvas(presCanvasId);
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
    canvasArr.push(canvas3);*/

    getSlides(whereStart);
}

let whereStartSend;

function loadPresentationCanvas(whereStart) {
    createCanvas(whereStart);
    whereStartSend = whereStart;
}

function loadSpecificSlide(whereStart) {
    currCanvas = canvasArr[whereStart];
    if (origSizePresCanvas == undefined)
        origSizePresCanvas = currCanvas.getWidth();
    resizePresentationCanvas();
    $('#pagecount').text(`Slide ${whereStart + 1}/${canvasArr.length}`);
    if (w)
        w.postMessage({ index: index }, '*');
    whereStartSend = whereStart;
}

function resizePresentationCanvas() {
    let w = $("body").width()
    let h = $("body").height()
    let canvasBody = $("#presi .canvas-container canvas");
    let canvasContainer = $("#presi .canvas-container");


    canvasBody.addClass('wtohbigger');
    canvasBody.removeClass('wtohsmaller');
    canvasContainer.addClass('wtohbigger');
    canvasContainer.removeClass('wtohsmaller');

    // console.log(canvasBody.width(), currCanvas.width)

    // if (Math.round(canvasBody.width()) == Math.round(currCanvas.width)) {
    //     return;
    // } else {
    //     // console.log("chaning Size!")
    // }

    currCanvas.setWidth(h * 16 / 9);
    currCanvas.setHeight(h);
    // wenn das seitenverhältnis breite:höhe kleiner als 16:9 ist
    if (w / h < 16 / 9) {
        currCanvas.setWidth(w);
        currCanvas.setHeight(w * 9 / 16);
        canvasBody.addClass('wtohsmaller');
        canvasBody.removeClass('wtohbigger');
        canvasContainer.addClass('wtohsmaller');
        canvasContainer.removeClass('wtohbigger');
    }

    // setzoom

    // console.log('orisiz:', origSizePresCanvas)
    if (originalSize) {

        // console.log("setting zoom...")
        let zooooooooooooooom = scaleMultiplier = currCanvas.width / 1920;

        // var objects = currCanvas.getObjects();
        // for (var i in objects) {
        //     objects[i].scaleX = objects[i].scaleX * scaleMultiplier;
        //     objects[i].scaleY = objects[i].scaleY * scaleMultiplier;
        //     objects[i].left = objects[i].left * scaleMultiplier;
        //     objects[i].top = objects[i].top * scaleMultiplier;
        //     objects[i].setCoords();
        // }
        // var obj = currCanvas.backgroundImage;
        // if (obj) {
        //     obj.scaleX = obj.scaleX * scaleMultiplier;
        //     obj.scaleY = obj.scaleY * scaleMultiplier;
        // }


        currCanvas.setZoom(zooooooooooooooom);
    }
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
    clearTimeout(removeFadeout);
    timer = setTimeout(() => {
        mouseismoving = false;
        if ($("#presi").css('display') == "flex" && !$("div#iconbox").prop("classList").contains("fadeout")) {
            $("div#iconbox").addClass('fadeout')

        } removeFadeout = setTimeout(() => {
            $('div#iconbox').css('opacity', '0');
            $('div#iconbox').css('userselect', 'none');
            $('div#iconbox').removeClass('fadeout');
            $("body, canvas, div").addClass('nocursor');
        }, 4000);
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

let minutesLabel = document.getElementById("minutes");
let secondsLabel = document.getElementById("seconds");
let hoursLabel = document.getElementById("hours");
let totalSeconds = 0;
let timertimer;
let isPopup = false;
let shouldVanish = true;
let lastSlide = false;

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

$("#" + startFromBeginningButtonId).click(function () {
    toggleFullScreen(document.body);
    index = 0;
    loadPresentationCanvas(index)
    // wenn man in den fullscreen gegangen ist ohne auf den präsentationsbutton geklickt zu haben
    // sollte man ja nicht in die präsentationsansicht kommen
    let clicked = $(this).data("clicked") != true ? true : false;
    $(this).data("clicked", clicked);
    setTimeout(() => {
        let display = window.innerHeight >= window.outerHeight ? "flex" : "none";
        $("#presi").css('display', display);
        resizePresentationCanvas()
    }, 100);
});

$("#" + startFromCurrentButtonId).click(function () {

    index = curretSlide - 1;

    console.clear()
    console.log(index)

    toggleFullScreen(document.body);
    loadPresentationCanvas(index)
    // wenn man in den fullscreen gegangen ist ohne auf den präsentationsbutton geklickt zu haben
    // sollte man ja nicht in die präsentationsansicht kommen
    let clicked = $("#" + startFromBeginningButtonId).data("clicked") != true ? true : false;
    $("#" + startFromBeginningButtonId).data("clicked", clicked);

    setTimeout(() => {
        let display = window.innerHeight >= window.outerHeight ? "flex" : "none";
        $("#presi").css('display', display);
        resizePresentationCanvas()
    }, 100);
});

let w;

$("#" + startFromBeginningButtonId + ", #" + startFromCurrentButtonId).click(function () {
    totalSeconds = 0;
    timerplay();
});

$("#openPopup").click(function () {
    isPopup = true;
    openPopupWindow()
});

let jsonArr = [];

function openPopupWindow() {
    if (w) w.close();
    w = null;
    w = window.open("http://localhost:5000/static/editor/reference/winpop.html", 'TheNewpop', 'height=500,width=625');
    w.document.close();

    jsonArr = [];
    canvasArr.forEach(element => {
        jsonArr.push(JSON.stringify(element))
    });

    window.onmessage = function promiseFnkt(event) {
        // send the variable
        if (!isPopup) return;
        if (event.data == 'inited') {
            w.postMessage({
                canvasArray: jsonArr,
                originalWidth: originalSize,
                whereToStart: whereStartSend,
                time: totalSeconds,
                timertimer: timertimer
            }, '*');
        }
        if (event.data == 'previous') {
            previous();
        }
        if (event.data == 'next') {
            next();
        }
        if (typeof event.data.specific === "number") {
            index = event.data.specific;
            loadSpecificSlide(index);
            if (index == canvasArr.length - 1)
                lastSlide = true;
            else
                lastSlide = false;
        }
        if (event.data == "timerpause") {
            timerpause();
        }
        if (event.data == "timerplay") {
            timerplay();
        }
        if (event.data == "timereset") {
            timerreset();
        }
    }

    w.focus();
}

function timerpause() {
    if (timertimer) {
        clearInterval(timertimer)
        timertimer = null;
    }
}

function timerplay() {
    if (!timertimer)
        timertimer = setInterval(setTime, 1000);
}

function timerreset() {
    timerpause();
    totalSeconds = 0;
    timerplay();
}
/* IMPORTANT Popupwindow closes fullscreen

$("#" + startFromBeginningButtonId + ", #" + startFromCurrentButtonId).click(function () {
    centeredPopup('http:\/\/localhost:5501\/src\/client\/presentation\/popup.html', 'myWindow', '700', '300', 'yes')
});
let popupWindow = null;
function centeredPopup(url, winName, w, h, scroll) {
    LeftPosition = (screen.width) ? (screen.width - w) / 2 : 0;
    TopPosition = (screen.height) ? (screen.height - h) / 2 : 0;
    settings =
        'height=' + h + ',width=' + w + ',top=' + TopPosition + ',left=' + LeftPosition + ',scrollbars=' + scroll + ',resizable'
    popupWindow = window.open(url, winName, settings)
}*/

$("#next").click(function (e) {
    next();
    w.postMessage(true, '*');
});

$("body").click(function (e) {
    if (e.target.id == 'exit') {
        exitPresi();
    }
    if (['pageblock'].indexOf(e.target.id) >= 0)
        next();
});


function exitPresi() {
    isPopup = false;
    if (window.innerHeight >= window.outerHeight) toggleFullScreen(document.body);
    $("#presi").css('display', 'none');
    $("#" + startFromBeginningButtonId).data("clicked", false);
    $("div#iconbox").removeClass('fadeout');
    toggleLaser(false);
    if (w) w.close();

    //test
    $("#content-main-inner-spacing-middle").css('width', '58vw');
    $("#content-main-inner-spacing-middle").css('height', '32.625vw');

    if ($("#content-main-inner-spacing-bottom").position().top + 25 > $("#content-main-inner").height()) {
        $("#content-main-inner-spacing-middle").css('width', oldWidth);
        $("#content-main-inner-spacing-middle").css('height', oldHeight);
    }

    var width = oldWidth = $('#content-main-inner-spacing-middle').width();
    var height = oldHeight = $('#content-main-inner-spacing-middle').height();

    resizeCanvas(width, height);
    GetCanvasAtResoution(width, true);
}

function next() {
    if (index + 1 < canvasArr.length) {
        index++;
        loadSpecificSlide(index);
        lastSlide = false;
    } else if (index == canvasArr.length - 1) {
        if (lastSlide) {
            console.log("Last slide was reaached!")
            exitPresi();
            return;
        }
        lastSlide = true;
    }
}

$("#previous").click(function () {
    previous();
});

function previous() {
    if (index - 1 >= 0) {
        index--;
        loadSpecificSlide(index);
    }
}

$("#toggleFull").click(function (e) {
    shouldVanish = false;
    toggleFullScreen(document.body)
})

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