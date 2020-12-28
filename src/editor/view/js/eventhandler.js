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

// open slides popup
$('#content-leftSlides-topBar-down').click(function(){
    $('#popupBox').css('display', 'flex');
});

// close slides popup
$('#popupBox-top-controls-buttons-exit').click(function(){
    $('#popupBox').css('display', 'none');
});

// open add-object popup
$('#content-navigation-first-right-icon').click(function(){
    $('#addObjectPopup').css('display', 'flex');
    $('#addObjectPopup-inner-popup').css('display', 'flex');
    $('#addObjectPopup-inner-popup').animate({
        margin: "1.5vh",
        opacity: 1.0
    }, 100);
});

// open image popup in add-object popup
$('#addObjectPopup-inner-popup-image').click(function(){
    $('#imagePopup').css('display', 'flex');
    $('#imagePopup-inner-unsplash').css('display', 'flex');
    $('#imagePopup-inner-unsplash').animate({
        margin: "1.5vh 0.8vh",
        opacity: 1.0
    }, 100);
});

// close all add-objects popups
$(document).click(function(event) {
    if (!$(event.target).closest("#addObjectPopup-inner-popup, #content-navigation-first-right-icon, #imagePopup-inner-unsplash, #addObjectPopup-inner-popup-image").length) {
        $('#addObjectPopup').css('display', 'none');
        $('#addObjectPopup-inner-popup').css('display', 'none');
        $('#addObjectPopup-inner-popup').css('margin', '0vh 1.5vh');
        $('#addObjectPopup-inner-popup').css('opacity', '0.0');

        $('#imagePopup').css('display', 'none');
        $('#imagePopup-inner-unsplash').css('display', 'none');
        $('#imagePopup-inner-unsplash').css('margin', '1.5vh 0.8vh');
        $('#imagePopup-inner-unsplash').css('opacity', '0.0');
    }
});

// open settings popup
$('#content-navigation-second-settings').click(function() {
    $('#settingsPopup').css('display', 'flex');
});

// close settings popup
$('#settingsPopup-inner-bottom-header-exit').click(function() {
    $('#settingsPopup').css('display', 'none');
    $('#settingsPopup-inner-bottom-button-join').css('display', 'none');
});

// open cam popup in settings popup
$('#settingsPopup-inner-bottom-settings-cam-bottom-popup').click(function() {
    $('#camPopup').css('display', 'flex');
    $('#camPopup-inner-popup').css('display', 'flex');
    $('#camPopup-inner-popup').animate({
        opacity: 1.0
    }, 100);
});

// close cam popup in settings popup
$(document).click(function(event) {
    if (!$(event.target).closest("#camPopup-inner-popup, #settingsPopup-inner-bottom-settings-cam-bottom-popup").length) {
        $('#camPopup').css('display', 'none');    
        $('#camPopup-inner-popup').css('display', 'none');
        $('#camPopup-inner-popup').css('opacity', '0.0');
    }
});

// open mic popup in settings popup
$('#settingsPopup-inner-bottom-settings-mic-bottom-popup').click(function() {
    $('#micPopup').css('display', 'flex');
    $('#micPopup-inner-popup').css('display', 'flex');
    $('#micPopup-inner-popup').animate({
        opacity: 1.0
    }, 100);
});

// close mic popup in settings popup
$(document).click(function(event) {
    if (!$(event.target).closest("#micPopup-inner-popup, #settingsPopup-inner-bottom-settings-mic-bottom-popup").length) {
        $('#micPopup').css('display', 'none');   
        $('#micPopup-inner-popup').css('display', 'none');
        $('#micPopup-inner-popup').css('opacity', '0.0'); 
    }
});

// open presentation-mode popup
$('#content-navigation-fifth-box-down').click(function() {
    $('#presentationModePopup').css('display', 'flex');
    $('#presentationModePopup-inner-popup').css('display', 'flex');
    $('#presentationModePopup-inner-popup').animate({
        margin: "5vh 5vh",
        opacity: 1.0
    }, 100);
});

// close presentation-mode popup
$(document).click(function(event) {
    if (!$(event.target).closest("#presentationModePopup-inner-popup, #content-navigation-fifth-box-down").length) {
        $('#presentationModePopup-inner-popup').css('display', 'none');
        $('#presentationModePopup').css('display', 'none');
        $('#presentationModePopup-inner-popup').css('margin', '1vh 1.5vh');
        $('#presentationModePopup-inner-popup').css('opacity', '0.0');
    }
});