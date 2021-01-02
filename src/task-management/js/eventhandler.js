/* set all checkboxes */
$('#checkAll').change(function() {
    if($('#checkAll').prop('checked') == true) {
        $('.checkbox').prop('checked', true);
    }else {
        $('.checkbox').prop('checked', false);
    }
});

/* open task popup */
$('body').on('click', '.task-item', function () {
    $('#taskPopup').css('opacity', '0.0');

    let taskWidth = $(this).width();
    let taskHeight = $(this).height();

    positionTop = $(this).offset().top - 340;
    positionLeft = $(this).offset().left + taskWidth - 30;

   $('#taskPopup').css('top', positionTop);
   $('#taskPopup').css('left', positionLeft);
   $('#taskPopup').animate({
       opacity: 1.0
   }, 100);
});

$('#taskPopup-top-right').click(function () {
    $('#taskPopup').css('opacity', '0.0');
});