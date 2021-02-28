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