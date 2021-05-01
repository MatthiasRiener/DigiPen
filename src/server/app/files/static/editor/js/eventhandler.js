let trackingIndex = 0;

$(document).ready(function () {
    console.log('Document loaded.');
});

/* --------------- SLides-Menu --------------- */

$('#content-leftSlides-topBar-plus').click(function () {
    createSlide();
});

function addSlide(slide) {
    addSingSlide(slide);
}

function addSingSlide(img) {
    return new $.Deferred(function (dfd) {

        let slides = $('.content-leftSlides-slidesContent-slide');
        let width = 10;
        let height = width / (16 / 9);

        sideC = insertSlide(img);




        $('#content-leftSlides-slidesContent').append(`
        <div class="content-leftSlides-slidesContent-slide" data-slide="${img._id.$oid}">
            <div class="content-leftSlides-slidesContent-slide-leftBar ${slides.length == 0 ? 'activeSlide' : ''}" id="trackingIndexForSideBar_${img.s_id}" style="height: ${height}vw;"></div>
            <div class="content-leftSlides-slidesContent-slide-middleBar" style="height: ${height}vw;">${img.s_id}</div>
            <div class="content-leftSlides-slidesContent-slide-content" data-slide="${img._id.$oid}" data-length="${slides.length}" style="position: relative; z-index: 2; height: ${height}vw; ${slides.length == 0 ? 'transform: scale(0.95);' : ''}">
                <div class="content-leftSlides-slidesContent-slide-content-overlay" data-slideId="${img._id.$oid}" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 10;"></div>
                <canvas class="content-leftSlides-slidesContent-slide-content-canvas" id="${img._id.$oid}" style="position: absolute; z-index: 1; width: 100%; height: 100%;"></canvas>
            </div>
        </div>`);

        var sideC = insertSlide(img);

        sideC.loadFromJSON(img.canvas, function () {
            sideC.renderAll();

            imgageTest = sideC.toDataURL({
                format: 'png',
                quality: 0.8
            })

            const box = $(`.content-leftSlides-slidesContent-slide-content-overlay[data-slideId="${img._id.$oid}"]`);
            console.warn(box);
            box.css('background', `url('${imgageTest}')`);
            box.css('background-position', 'center');
            box.css('background-size', 'cover');

            $('#content-leftSlides-slidesContent-animatedBar').height(height + 'vw');

        });


        dfd.resolve()
        URL.revokeObjectURL(this.src);
    });

}


function loadContentOfSideSlides(slides) {

    $.when.apply($, $.map(slides, function (img, i) {

        addSingSlide(img);

    })
    );


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
    trackingIndex = index + 1;

    console.log(trackingIndex);

    $('#content-leftSlides-slidesContent-animatedBar').css({
        'top': `${$("#content-leftSlides-slidesContent-animatedBar").position().top}`
    }).animate({
        "top": `${$(`#trackingIndexForSideBar_${trackingIndex}`).position().top}px`
    }, "slow");


    switchSlide(slideID);
}

$('#content-leftSlides-slidesContent').scroll(function () {
    $('#content-leftSlides-slidesContent-animatedBar').css("top", `${$(`#trackingIndexForSideBar_${trackingIndex}`).position().top}px`);
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

$('body').on('click', '#content-navigation-fourth-share', function () {
    $('#share-presi-popup').css('display', 'flex');
    $('#share-presi-popup').css('opacity', '1.0');


    $('#share-presi-inner-first').addClass("is-currently-big");

    $('#share-presi-inner-first').animate({
        opacity: 1.0,
    }, 150);

    $('#share-presi-inner-first').toggleClass("share-presi-inner-animate");


    $('#share-presi-inner-second').animate({
        opacity: 1.0,
    }, 150);

    $('#share-presi-inner-second').toggleClass("share-presi-inner-animate");


})


// animation between two toggles

$('body').on('click', "#share-presi-inner-second", function () {

    if ($(this).hasClass("is-currently-big")) return;


    $(this).animate({
        height: "25vh"
    }, 150);

    $("#share-presi-inner-first").animate({
        height: "12vh"
    }, 150);


    $(this).addClass("is-currently-big");
    $("#share-presi-inner-first").removeClass("is-currently-big");
})



$('body').on('click', "#share-presi-inner-first", function () {

    if ($(this).hasClass("is-currently-big")) return;


    $(this).animate({
        height: "25vh"
    }, 150);

    $("#share-presi-inner-second").animate({
        height: "12vh"
    }, 150);


    $(this).addClass("is-currently-big");
    $("#share-presi-inner-second").removeClass("is-currently-big");
})

// end of toggle


$('body').on('click', '.ed_bt_arrow_click', function () {
    window.location = baseURL + "/dashboard"
})

$('body').on('click', '#shortcutPopup-inner-popup-change', function () {
    //window.location = baseURL + "/keybinding"
    $('#keybindsPopup').css('display', 'flex');
    $('#keybindsPopup').css('opacity', '1.0');
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



$("#" + startFromBeginningButtonId).click(function () {
    startFromBeginning();
});


function loadCurrentCanvas() {
    sendRequestToServer({ type: "POST", url: "/editor/getSlides", data: { p_id: getCustomStorage("p_id") } }).then(data => {
        canvasArr.length = 0;

        canvasArr = data.res.map((el) => {
            var localCanvas = new fabric.Canvas(presCanvasId);

            localCanvas.loadFromJSON(
                el.canvas,
                function () {

                    localCanvas.renderAll.bind(localCanvas);
                }
            );

            return localCanvas;
        });

        currCanvas = canvasArr[index];
        if (origSizePresCanvas == undefined)
            origSizePresCanvas = currCanvas.getWidth();
        resizePresentationCanvas();
        resizeCanvasFunc();
        $('#pagecount').text(`Slide ${index + 1}/${canvasArr.length}`);

    });
}

function startFromBeginning() {

    toggleFullScreen(document.body);
    index = 0;

    loadCurrentCanvas();

    // wenn man in den fullscreen gegangen ist ohne auf den präsentationsbutton geklickt zu haben
    // sollte man ja nicht in die präsentationsansicht kommen
    let clicked = $(this).data("clicked") != true ? true : false;
    $(this).data("clicked", clicked);
    setTimeout(() => {
        let display = window.innerHeight >= window.outerHeight ? "flex" : "none";
        $("#presi").css('display', display);
        resizePresentationCanvas();
    }, 500);
}

$("#" + startFromCurrentButtonId).click(function () {

    index = curretSlide - 1;

    toggleFullScreen(document.body);
    loadPresentationCanvas(index)


    loadCurrentCanvas();


    // wenn man in den fullscreen gegangen ist ohne auf den präsentationsbutton geklickt zu haben
    // sollte man ja nicht in die präsentationsansicht kommen
    let clicked = $("#" + startFromBeginningButtonId).data("clicked") != true ? true : false;
    $("#" + startFromBeginningButtonId).data("clicked", clicked);

    setTimeout(() => {
        let display = window.innerHeight >= window.outerHeight ? "flex" : "none";
        $("#presi").css('display', display);
        resizePresentationCanvas()
    }, 500);
});

function resizePresentationCanvas() {
    let w = $("body").width()
    let h = $("body").height()
    let canvasBody = $("#presi .canvas-container canvas");
    let canvasContainer = $("#presi .canvas-container");


    canvasBody.addClass('wtohbigger');
    canvasBody.removeClass('wtohsmaller');
    canvasContainer.addClass('wtohbigger');
    canvasContainer.removeClass('wtohsmaller');

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
let isVideo = true;

$("body").on("click", "#toggleCameraPresi", function() {
    isVideo = !isVideo;
    console.log("WHAT THE FUCK!")
    var videoContainer = $('#my-video-track');

    if (isVideo) {
        videoContainer.css("visibility", "visible");
    } else {
        videoContainer.css("visibility", "hidden");
    }})



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
    w = window.open(`http://localhost:5000/static/editor/reference/winpop.html?d=${Math.random()}`, 'TheNewpop', 'height=500,width=625');
    w.document.close();

    jsonArr = [];


    jsonArr = canvasArr.map((el) => JSON.stringify(el));
    console.log(jsonArr)

    window.onmessage = function promiseFnkt(event) {

        console.log("RECEIVED EVENT")
        console.log(event)
        // send the variable
        if (!isPopup) return;
        if (event.data == 'inited') {
            w.postMessage({
                canvasArray: jsonArr,
                originalWidth: originalSize,
                whereToStart: index,
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

    var width = $('#content-main-inner-spacing-middle').width();
    var height = $('#content-main-inner-spacing-middle').height();

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

// This is where all events are

let optionscount = 0,
    oldval,
    jsondata;
let infoOuter;
let info, oldInfo = null;

let lastEvent;
let heldKeys = [];
let jsondataelem;
let keysPushed = [];
let dublicate = false;

let highlightColor = 'rgba(100, 198, 237, 1)';
let outoffocusColor = 'rgba(100, 198, 237, 0.7)';
let emptyslotColor = 'rgba(100, 198, 237, 0.4)';
let dublicateColor = 'rgba(255,50,50,1)';
let dublicateoutoffocusColorColor = 'rgba(255,80,80,0.7)';

sendRequestToServer({ type: "GET", url: "/keybinding/getKeybinding" }).then(data => {
    jsondata = data;
    data.res.bindings.forEach(element => {
        $("#bindings").append($("#template").html());
        $("#bindings .displayname").eq(optionscount).text(element.name);
        if (element.keys.length > 0) {
            $("#bindings .keybindinginput").eq(optionscount).text(element.keys.join(' + ').replace('Key', '').replace(/([A-Z])/g, ' $1').trim());
        } else
            $("#bindings .keybindinginput").eq(optionscount).css('background-color', emptyslotColor);

        $("#bindings .keybindinginput").eq(optionscount).on('focusin', function (event) {
            oldval = this.value;
            this.value = ""
            this.placeholder = "Press Any Key"
        });

        $("#bindings .keybindinginput").eq(optionscount).on('focusout', function (event) {
            if (this.value.trim().length == 0) {
                this.placeholder = "Empty"
                this.value = oldval
            }
        });

        $("#bindings .keybindinginput").eq(optionscount).click(function (event) {
            infoOuter = this;
            if (this.dataset.dublicate != "true")
                this.style.backgroundColor = highlightColor;
            else
                this.style.backgroundColor = dublicateColor;
            if (oldInfo != this && oldInfo != null && oldInfo.dataset.dublicate != "true") {
                oldInfo.style.backgroundColor = outoffocusColor;
            }
            if (oldInfo != this && oldInfo != null && oldInfo.dataset.dublicate == "true") {
                oldInfo.style.backgroundColor = dublicateoutoffocusColorColor;
            }
            oldInfo = this;
            jsondataelem = element;
        });

        optionscount++;
    });
});

window.onkeydown = async function (event) {
    if (lastEvent && lastEvent.keyCode == event.keyCode || heldKeys.length >= 3) {
        return;
    }
    if ((window.navigator.platform.match("Mac") ? event.metaKey : event.ctrlKey)) {
        event.preventDefault();
    }
    infoOuter.innerText = "";
    info = infoOuter.appendChild(document.createTextNode(''));
    lastEvent = event;
    heldKeys.push(event.code);
    info.data = heldKeys.join(' + ').replace('Key', '').replace(/([A-Z])/g, ' $1').trim();
    [...$(".keybindinginput")].forEach(element => {
        keysPushed.push(element.innerText)
    });
    let findDuplicates = arr => arr.filter((item, index) => arr.indexOf(item) != index);

    [...$(".keybindinginput")].forEach(keybindingelem => {
        if (findDuplicates(keysPushed).indexOf(keybindingelem.innerText) !== -1) {
            keybindingelem.style.backgroundColor = dublicateoutoffocusColorColor;
            if (keybindingelem == infoOuter)
                keybindingelem.style.backgroundColor = dublicateColor;
            keybindingelem.dataset.dublicate = "true";
        } else {
            keybindingelem.style.backgroundColor = "rgba(100, 198, 237, .7)"
            keybindingelem.dataset.dublicate = "false";
        }
    });


    if (findDuplicates(keysPushed).length !== 0) {
        dublicate = true;
    } else {
        dublicate = false;
        infoOuter.style.backgroundColor = highlightColor;
    }

    keysPushed = [];

    jsondataelem.keys = heldKeys;

    $.grep(jsondata, function (n, i) {
        if (n.name === jsondataelem.name && !dublicate)
            n = jsondataelem
    });
};

window.onkeyup = function (event) {
    lastEvent = null;
    heldKeys = [];
};

$("#safe").click(function () {
    if (dublicate) return;


    sendRequestToServer({ type: "POST", url: "/keybinding/saveKeybinding", data: { keybinding: JSON.stringify(jsondata.res.bindings) } }).then(data => {
        reloadShortcuts(data)
        $('#keybindsPopup').css('display', 'none');
        $('#keybindsPopup').css('opacity', '0.0');
    });


});

$('.back').click(function () {
    $('#keybindsPopup').css('display', 'none');
    $('#keybindsPopup').css('opacity', '0.0');
});

