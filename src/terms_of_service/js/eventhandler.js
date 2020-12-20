// This is where all events are 

window.onload = function () {
    loadTerms();
}

var content_array = []
function loadTerms() {
    $.get("https://raw.githubusercontent.com/MatthiasRiener/Slidea/main/src/terms_of_service/terms/terms.md", function (data) {
        var terms = data.split("\n").filter(Boolean);

        terms.forEach(element => {
            var title = element.slice(1, element.length).trim()
            var content = element.trim()
            if (element.startsWith("#")) {
                $('.side-bar').eq(0).append(`<div class="content-point" ><p>${element.slice(1, element.length).trim()}</p></div>`);
                $('.main-content').eq(0).append(`<p class="title" id="${element.slice(1, element.length).trim().replaceAll(" ", "_")}">${element.slice(1, element.length).trim()}</div>`);
                content_array.push({type:"title", title})
            } else {
                $('.main-content').eq(0).append(`<p class="content">${element.trim()}</div>`);
                
                content_array.push({type:"content", content})
            }
        });
    });
}

console.log(content_array)

$('body').on('click', '.content-point ', function () {
    $(".main-content").animate({
        scrollTop: (document.getElementsByClassName('main-content')[0].scrollTop + $(`#${$(this).children("p").text().trim().replaceAll(" ", "_")}`).position().top)
    }, 800, 'swing');

    //document.getElementById(`${$(this).children("p").text().trim().replaceAll(" ", "_")}`).scrollIntoView({behavior: 'smooth'});
});

//Download PDF File
var doc = new jsPDF("p", "mm", "a4");


$('.btDownload').click(function () { 
    //Titelblatt
    doc.setFontSize(15);
    doc.setTextColor(150);
    doc.text("Terms of Service", 150, 15);
    doc.setFontSize(60);
    doc.setTextColor(0,255,0);
    doc.text( "Slidea", 76, 80);
    doc.setFontSize(30);
    doc.setTextColor(0);
    doc.text("Terms of Service", 66, 120);
    doc.setFontSize(20);
    doc.text("from", 97, 180);
    doc.text("Platzhalter", 88, 200);
    doc.addPage();

    //Inhaltsverzeichnis
    doc.setFontSize(15);
    doc.setTextColor(150);
    //Inhaltsverzeichnis
    doc.text("Terms of Service", 150, 15);
    for(var i=0; i<=content_array.length; i++){
        var text = (content_array[i]);
        doc.text(text, 0, 50);
    };
    

    doc.save('Terms_of_Service.pdf');
});


