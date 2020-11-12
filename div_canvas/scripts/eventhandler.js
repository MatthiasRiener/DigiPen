$('#btn').click(function () {
    generatePDF("content");
});


$(window).on('load resize', function () {
    calcSize();
});
