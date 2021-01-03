/* set all checkboxes */
$('#checkAll').change(function() {
    $('.checkbox').prop('checked', $('#checkAll').prop('checked'));
});

let taskPositionTop;
let taskPositonLeft;
let taskWidth;
let taskHeight;

/* open task popup */
$('body').on('click', '.task-item', function () {
    $('#taskPopup').css('opacity', '0.0');

    taskWidth = $(this).width();
    taskHeight = $(this).height();
    taskPositionTop = $(this).offset().top;
    taskPositonLeft = $(this).offset().left;

   $('#taskPopup').css('top', taskPositionTop - 340);
   $('#taskPopup').css('left', taskPositonLeft + taskWidth - 30);
   $('#taskPopup').animate({
       opacity: 1.0
   }, 100);

   closeAllSubPopups();
});

$('#taskPopup-top-right').click(function () {
    $('#taskPopup').css('opacity', '0.0');
    closeAllSubPopups();
});

$('#taskPopup-top-left-icon').click(function () {
    if($('#presentationPopup').css('opacity') == 0) {
        closeAllSubPopups();
        $('#presentationPopup').css('top', taskPositionTop - 340);
        $('#presentationPopup').css('left', taskPositonLeft + taskWidth - 310);
        $('#presentationPopup').animate({
            opacity: 1.0,
            margin: 0
        }, 100);
    }else {
        $('#presentationPopup').css('opacity', '0');
        $('#presentationPopup').css('margin-left', '2vw');
    }
});

$('#taskPopup-fourth-right-icon').click(function () {
    if($('#personPopup').css('opacity') == 0) {
        closeAllSubPopups();
        $('#personPopup').css('top', taskPositionTop - 250);
        $('#personPopup').css('left', taskPositonLeft + taskWidth - 310);
        $('#personPopup').animate({
            opacity: 1.0,
            margin: 0
        }, 100);
    }else {
        $('#personPopup').css('opacity', '0');
        $('#personPopup').css('margin-left', '2vw');
    }
});

$('#taskPopup-sixth-top-add').click(function () {
    if($('#subTaskPopup').css('opacity') == 0) {
        closeAllSubPopups();
        $('#subTaskPopup').css('top', taskPositionTop - 140);
        $('#subTaskPopup').css('left', taskPositonLeft + taskWidth - 310);
        $('#subTaskPopup').animate({
            opacity: 1.0,
            margin: 0
        }, 100);
    }else {
        $('#subTaskPopup').css('opacity', '0');
        $('#subTaskPopup').css('margin-left', '2vw');
    }
});


function closeAllSubPopups() {
    $('#presentationPopup').css('opacity', '0');
    $('#presentationPopup').css('margin-left', '2vw');

    $('#personPopup').css('opacity', '0');
    $('#personPopup').css('margin-left', '2vw');

    $('#subTaskPopup').css('opacity', '0');
    $('#subTaskPopup').css('margin-left', '2vw');
}