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
    console.log($(this).data('task'));
    sendRequestToServer({type: "POST", url: "/task/getTaskInfo", data: {id: $(this).data('task')}}).then(data => {
        console.log(data);
        $('#currentPresentation').text(data.pres.name);
        $('#taskPopup-second-headline').text();
        $('currentUser').text();
        $('#taskPopup-fifth-date-start').val();
        $('#taskPopup-fifth-date-end').val();

    });

    $('#taskPopup').css('opacity', '0.0');
    $('#taskPopup').css('display', 'none');

    taskWidth = ($(this).width() / $(window).width()) * 100;
    taskHeight = ($(this).height() / $(window).height()) * 100;
    taskPositionTop = ($(this).offset().top / $(window).height()) * 100;
    taskPositonLeft = ($(this).offset().left / $(window).width()) * 100;

    $('#taskPopup').css('display', 'flex');
    $('#taskPopup').css('top', (taskPositionTop - 36) + "vh");
    $('#taskPopup').css('left', (taskPositonLeft + taskWidth - 2) + "vw");
    $('#taskPopup').animate({
        opacity: 1.0
    }, 100);

   closeAllSubPopups();
});

$('#addTask').click(function () {
    $('#taskPopup').css('opacity', '0.0');
    $('#taskPopup').css('display', 'none');

    taskWidth = ($(this).width() / $(window).width()) * 100;
    taskHeight = ($(this).height() / $(window).height()) * 100;
    taskPositionTop = (($(this).offset().top / $(window).height()) * 100) + 36;
    taskPositonLeft = (($(this).offset().left / $(window).width()) * 100) - 14;

    $('#taskPopup-second-headline').text('Taskname...');

    $('#taskPopup').css('display', 'flex');
    $('#taskPopup').css('top', (taskPositionTop - 36) + "vh");
    $('#taskPopup').css('left', (taskPositonLeft + taskWidth - 2) + "vw");
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

    sendTaskData();
});

$('#taskPopup-top-left-icon').click(function () {
    if($('#presentationPopup').css('opacity') == 0) {
        closeAllSubPopups();
        $('#presentationPopup').css('display', 'flex');
        $('#presentationPopup').css('top', (taskPositionTop - 36) + "vh");
        //alert(taskPositionTop);
        $('#presentationPopup').css('left', (taskPositonLeft + taskWidth - 16.5) + "vw");
        $('#presentationPopup').animate({
            opacity: 1.0,
            margin: 0
        }, 100);
        getPresentations();
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
        $('#personPopup').css('top', (taskPositionTop - 26) + "vh");
        $('#personPopup').css('left', (taskPositonLeft + taskWidth - 16.5) + "vw");
        $('#personPopup').animate({
            opacity: 1.0,
            margin: 0
        }, 100);
        getUsers();
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
        $('#subTaskPopup').css('top', (taskPositionTop - 14) + "vh");
        $('#subTaskPopup').css('left', (taskPositonLeft + taskWidth - 16.5) + "vw");
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
        $('#reactionPopup').css('top', (taskPositionTop - 2) + "vh");
        $('#reactionPopup').css('left', (taskPositonLeft + taskWidth - 4.8) + "vw");
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

    createSubTask(0, $('#subTaskPopup-bottom-input').val());

    $('#subTaskPopup').css('display', 'none');
    $('#subTaskPopup').css('opacity', '0');
    $('#subTaskPopup').css('margin-left', '2vw');
    $('#subTaskPopup-bottom-input').val("");
});

$('body').on('click', '.presentationPopup-bottom-presentations', function () {
    checkPresentation($(this).data('presentation'));
});

$('body').on('click', '.personPopup-bottom-persons', function () {
    checkUser($(this).data('user'));
});

$('#presentationPopup-bottom-search-input').on('keyup', function () {
    $('.presentationPopup-bottom-presentations').each(function () {
        if($(this).text().toUpperCase().includes($('#presentationPopup-bottom-search-input').val().toUpperCase())) {
            $(this).css('display', 'flex');
        } else {
            $(this).css('display', 'none');
        }
    });
});