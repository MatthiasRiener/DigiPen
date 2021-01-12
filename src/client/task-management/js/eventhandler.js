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
    $('#taskPopup').css('display', 'none');

    taskWidth = $(this).width();
    taskHeight = $(this).height();
    taskPositionTop = $(this).offset().top;
    taskPositonLeft = $(this).offset().left;

    $('#taskPopup').css('display', 'flex');
   $('#taskPopup').css('top', taskPositionTop - 340);
   $('#taskPopup').css('left', taskPositonLeft + taskWidth - 30);
   $('#taskPopup').animate({
       opacity: 1.0
   }, 100);

   closeAllSubPopups();
});

$('#taskPopup-top-right').click(function () {
    $('#taskPopup').css('opacity', '0.0');
    $('#taskPopup').css('display', 'none');
    closeAllSubPopups();
});

$('#taskPopup-last-bottom-right-inner').click(function () {
    $('#taskPopup').css('opacity', '0.0');
    $('#taskPopup').css('display', 'none');
    closeAllSubPopups();
});

$('#taskPopup-top-left-icon').click(function () {
    if($('#presentationPopup').css('opacity') == 0) {
        closeAllSubPopups();
        $('#presentationPopup').css('display', 'flex');
        $('#presentationPopup').css('top', taskPositionTop - 340);
        $('#presentationPopup').css('left', taskPositonLeft + taskWidth - 310);
        $('#presentationPopup').animate({
            opacity: 1.0,
            margin: 0
        }, 100);
    }else {
        $('#presentationPopup').css('opacity', '0');
        $('#presentationPopup').css('margin-left', '2vw');
        $('#presentationPopup').css('display', 'none');
    }
});

$('#taskPopup-fourth-right-icon').click(function () {
    if($('#personPopup').css('opacity') == 0) {
        closeAllSubPopups();
        $('#personPopup').css('display', 'flex');
        $('#personPopup').css('top', taskPositionTop - 250);
        $('#personPopup').css('left', taskPositonLeft + taskWidth - 310);
        $('#personPopup').animate({
            opacity: 1.0,
            margin: 0
        }, 100);
    }else {
        $('#personPopup').css('opacity', '0');
        $('#personPopup').css('margin-left', '2vw');
        $('#personPopup').css('display', 'none');
    }
});

$('#taskPopup-sixth-top-add').click(function () {
    if($('#subTaskPopup').css('opacity') == 0) {
        closeAllSubPopups();
        $('#subTaskPopup').css('display', 'flex');
        $('#subTaskPopup').css('top', taskPositionTop - 140);
        $('#subTaskPopup').css('left', taskPositonLeft + taskWidth - 310);
        $('#subTaskPopup').animate({
            opacity: 1.0,
            margin: 0
        }, 100);
    }else {
        $('#subTaskPopup').css('opacity', '0');
        $('#subTaskPopup').css('margin-left', '2vw');
        $('#subTaskPopup').css('display', 'none');
    }
});

$('#taskPopup-last-bottom-left-reactions-add').click(function () {
    if($('#reactionPopup').css('opacity') == 0) {
        closeAllSubPopups();
        $('#reactionPopup').css('display', 'flex');
        $('#reactionPopup').css('top', taskPositionTop - 10);
        $('#reactionPopup').css('left', taskPositonLeft + taskWidth - 84);
        $('#reactionPopup').animate({
            opacity: 1.0,
            margin: 0
        }, 100);
    }else {
        $('#reactionPopup').css('opacity', '0');
        $('#reactionPopup').css('margin-left', '2vw');
        $('#reactionPopup').css('display', 'none');
    }
});


function closeAllSubPopups() {
    $('#presentationPopup').css('opacity', '0');
    $('#presentationPopup').css('margin-left', '2vw');
    $('#presentationPopup').css('display', 'none');

    $('#personPopup').css('opacity', '0');
    $('#personPopup').css('margin-left', '2vw');
    $('#personPopup').css('display', 'none');

    $('#subTaskPopup').css('opacity', '0');
    $('#subTaskPopup').css('margin-left', '2vw');
    $('#subTaskPopup').css('display', 'none');

    $('#reactionPopup').css('opacity', '0');
    $('#reactionPopup').css('margin-left', '2vw');
    $('#reactionPopup').css('display', 'none');
}

$('#subTaskPopup-bottom-add').click(function () {
    $('#taskPopup-sixth-bottom').append(`
    <div class="taskPopup-sixth-bottom-row">
        <div class="taskPopup-sixth-bottom-row-left">
            <input class="taskPopup-sixth-bottom-row-left-input" type="checkbox">
        </div>
        <div class="taskPopup-sixth-bottom-row-right">${$('#subTaskPopup-bottom-input').val()}</div>
    </div>
    `);

    $('#subTaskPopup').css('display', 'none');
    $('#subTaskPopup').css('opacity', '0');
    $('#subTaskPopup').css('margin-left', '2vw');
    $('#subTaskPopup-bottom-input').val("");
});