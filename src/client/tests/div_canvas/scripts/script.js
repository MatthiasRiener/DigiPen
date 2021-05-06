const desiredWidth = 1920,
    desiredHeight = 1080,
    scaleFactor = .8;



function calcSize() {
    var width = Math.floor(window.innerWidth * scaleFactor);
    var height = width * (desiredHeight / desiredWidth);


    $('#content').css('min-width', `${width}px`);
    $('#content').css('min-height', `${height}px`);

    $('#content').css('width', `${width}px`);
    $('#content').css('height', `${height}px`);

}


function generatePDF() {

    var curWidth = $('#content').width();
    var curHeight = $('#content').height();

    var ratioW = desiredWidth / curWidth;
    var ratioH = desiredHeight / curHeight;

    $('#content').css('transform', `scale(${ratioW},${ratioH})`);

    console.log("height:" + ratioH * curHeight);
    console.log("width:" + ratioW * curWidth);

    kendo.drawing.drawDOM($("#content"))
        .done(function (root) {
            kendo.drawing.pdf.saveAs(root, $('title').text());
            $('#content').css('transform', 'scale(1,1)');
        });

}