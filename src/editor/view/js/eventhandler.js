/* --------------- SLides-Menu --------------- */

let trackingIndex = 0;

$(document).ready(function () {
    console.log('Document loaded.');
    addSlide();
    toggleVisibility(0);
});

$('#content-leftSlides-topBar-plus').click(function(){
    addSlide();
});

function addSlide(){
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

function toggleVisibility(index){
    trackingIndex = index;
    $('#content-leftSlides-slidesContent-animatedBar').css({'top':`${$("#content-leftSlides-slidesContent-animatedBar").position().top}`}).animate({"top":`${$('.content-leftSlides-slidesContent-slide-leftBar').eq(trackingIndex).position().top}px`}, "slow");
}

$('#content-leftSlides-slidesContent').scroll(function(){
    $('#content-leftSlides-slidesContent-animatedBar').css("top", `${$('.content-leftSlides-slidesContent-slide-leftBar').eq(trackingIndex).position().top}px`);
});

/* --------------- POPUPS --------------- */

$('#content-leftSlides-topBar-down').click(function(){
    $('#popupBox').css('display', 'flex');
});

$('#popupBox-top-controls-buttons-exit').click(function(){
    $('#popupBox').css('display', 'none');
});

$('#content-navigation-first-right-icon').click(function(){
    $('#addObjectPopup').css('display', 'flex');
    $('#addObjectPopup-inner-popup').css('display', 'flex');
});

$(document).click(function(event) {
    if (!$(event.target).closest("#addObjectPopup-inner-popup, #addObjectPopup-inner-unsplash, #content-navigation-first-right-icon").length) {
        $('#addObjectPopup').css('display', 'none');
        $('#addObjectPopup-inner-popup').css('display', 'none');
        $('#addObjectPopup-inner-unsplash').css('display', 'none');
    }
});

$('#addObjectPopup-inner-popup-image').click(function(){
    $('#addObjectPopup-inner-popup').css('display', 'none');
    $('#addObjectPopup-inner-unsplash').css('display', 'flex');
});

$('#content-navigation-second-settings').click(function() {
    $('#settingsPopup').css('display', 'flex');
});

$('#settingsPopup-inner-bottom-settings-cam-bottom-popup').click(function() {
    $('#camPopup').css('display', 'flex');
});

$(document).click(function(event) {
    if (!$(event.target).closest("#camPopup-inner-popup, #settingsPopup-inner-bottom-settings-cam-bottom-popup").length) {
        $('#camPopup').css('display', 'none');    
    }
});

$('#settingsPopup-inner-bottom-settings-mic-bottom-popup').click(function() {
    $('#micPopup').css('display', 'flex');
});

$(document).click(function(event) {
    if (!$(event.target).closest("#micPopup-inner-popup, #settingsPopup-inner-bottom-settings-mic-bottom-popup").length) {
        $('#micPopup').css('display', 'none');    
    }
});


$('#settingsPopup-inner-bottom-header-exit').click(function() {
    $('#settingsPopup').css('display', 'none');
    $('#settingsPopup-inner-bottom-button-join').css('display', 'none');
});

$('#content-navigation-fifth-box-down').click(function(){
    $('#presentationModePopup').css('display', 'flex');
    $('#presentationModePopup-inner-popup').css('display', 'flex');
    $('#presentationModePopup-inner-popup').animate({
        margin: "5vh 5vh",
        opacity: 1.0
    }, 100);
});


$(document).click(function(event) {
    if (!$(event.target).closest("#presentationModePopup-inner-popup, #content-navigation-fifth-box-down").length) {
        $('#presentationModePopup-inner-popup').animate({
            margin: "0vh 1.5vh",
            opacity: 0.0
        }, 10);
        setTimeout(function() {
            $('#presentationModePopup-inner-popup').css('display', 'none');
            $('#presentationModePopup').css('display', 'none');
        }, 100);
    }
});