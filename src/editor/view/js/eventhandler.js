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
    $('#content').css('display', 'none');
});

$('#popupBox-top-controls-buttons-exit').click(function(){
    $('#popupBox').css('display', 'none');
    $('#content').css('display', 'flex');
});

$('#content-navigation-first-right-icon').click(function(){
    $('#addObjectPopup-inner-popup').css('display', 'flex');
    $('#addObjectPopup').css('display', 'flex');
});

$(document).click(function(event) {
    if (!$(event.target).closest("#addObjectPopup-inner-popup, #content-navigation-first-right-icon").length) {
        $('#addObjectPopup-inner-popup').css('display', 'none');
        $('#addObjectPopup').css('display', 'none');
    }
});