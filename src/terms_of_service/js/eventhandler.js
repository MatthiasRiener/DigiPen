// This is where all events are 

window.onload = function () {
    loadTerms();
}

function loadTerms() {
    $.get("https://raw.githubusercontent.com/MatthiasRiener/Slidea/main/src/terms_of_service/terms/terms.md", function (data) {
        var terms = data.split("\n").filter(Boolean);

        terms.forEach(element => {
            if (element.startsWith("#")) {
                $('.side-bar').eq(0).append(`<div class="content-point" ><p>${element.slice(1, element.length).trim()}</p></div>`);
                $('.main-content').eq(0).append(`<p class="title" id="${element.slice(1, element.length).trim().replaceAll(" ", "_")}">${element.slice(1, element.length).trim()}</div>`);
            } else {
                $('.main-content').eq(0).append(`<p class="content">${element.trim()}</div>`);
            }
        });
    });
}


$('body').on('click', '.content-point ', function () {
    $(".main-content").animate({
        scrollTop: (document.getElementsByClassName('main-content')[0].scrollTop + $(`#${$(this).children("p").text().trim().replaceAll(" ", "_")}`).position().top)
    }, 800, 'swing');

    //document.getElementById(`${$(this).children("p").text().trim().replaceAll(" ", "_")}`).scrollIntoView({behavior: 'smooth'});
});