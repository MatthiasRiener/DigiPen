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
    getTaskInfo($(this).data('task'));

    $('#taskPopup').css('opacity', '0.0');
    $('#taskPopup').css('display', 'none');

    $('#taskPopup-top-left').css('border', 'none');
    $('#taskPopup-second-headline').css('color', '#383838');
    $('#currentUser').css("color", "#383838");
    $('#taskPopup-fifth-date-start').css('border-color', '#383838');
    $('#taskPopup-fifth-date-end').css('border-color', '#383838');

    taskWidth = ($(this).width() / $(window).width()) * 100;
    taskHeight = ($(this).height() / $(window).height()) * 100;
    taskPositionTop = ($(this).offset().top / $(window).height()) * 100;
    taskPositonLeft = ($(this).offset().left / $(window).width()) * 100;

    taskPositionTop = taskPositionTop - 36;
    taskPositonLeft = taskPositonLeft + taskWidth - 2

    if(taskPositonLeft > 80) {
        taskPositonLeft = taskPositonLeft - taskWidth - 15;
    }

    $('#taskPopup').css('display', 'flex');

    $('#taskPopup').css('top', taskPositionTop + "vh");
    $('#taskPopup').css('left', taskPositonLeft + "vw");
    

    $('#taskPopup').animate({
        opacity: 1.0
    }, 100);

   closeAllSubPopups();
});

$('#addTask').click(function () {
    $('#taskPopup').css('opacity', '0.0');
    $('#taskPopup').css('display', 'none');

    $('#currentPresentation').text("select presentation");
    $('#taskPopup-top-left').css('background', '#383838');
    $('#presentationPopup-top-current').text("no selection");
    $('#taskPopup-second-headline').text("Taskname...")
    $('#taskPopup-fourth-left-image').css('background', '#383838');
    $('#currentUser').text("select user");
    $('#personPopup-top-current-image').css('background', '#383838');
    $('#popupCurrentUser').text("no selection");
    $('#taskPopup-fifth-date-start').val("YYYY-MM-DD")
    $('#taskPopup-fifth-date-end').val("YYYY-MM-DD")
    $('#taskPopup-sixth-bottom').empty();

    $('#taskPopup-top-left').css('border', 'none');
    $('#taskPopup-second-headline').css('color', '#383838');
    $('#currentUser').css("color", "#383838");
    $('#taskPopup-fifth-date-start').css('border-color', '#383838');
    $('#taskPopup-fifth-date-end').css('border-color', '#383838');

    taskWidth = ($(this).width() / $(window).width()) * 100;
    taskHeight = ($(this).height() / $(window).height()) * 100;
    taskPositionTop = (($(this).offset().top / $(window).height()) * 100) + 36;
    taskPositonLeft = (($(this).offset().left / $(window).width()) * 100) - 14;

    taskPositionTop = taskPositionTop - 36;
    taskPositonLeft = taskPositonLeft + taskWidth - 2

    $('#taskPopup-second-headline').text('Taskname...');
    subtasks.length = 0;

    $('#taskPopup').css('display', 'flex');
    $('#taskPopup').css('top', taskPositionTop + "vh");
    $('#taskPopup').css('left', taskPositonLeft + "vw");
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
    closeAllSubPopups();
    if(checkTaskInputs()) {
        $('#taskPopup').css('opacity', '0.0');
        $('#taskPopup').css('display', 'none');

        sendTaskData();
    }
});

$('#taskPopup-top-left-icon').click(function () {
    if($('#presentationPopup').css('opacity') == 0) {
        closeAllSubPopups();
        $('#presentationPopup').css('display', 'flex');
        $('#presentationPopup').css('top', taskPositionTop + "vh");
        //alert(taskPositionTop);
        $('#presentationPopup').css('left', (taskPositonLeft - 14.5) + "vw");
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
        $('#personPopup').css('top', (taskPositionTop + 10) + "vh");
        $('#personPopup').css('left', (taskPositonLeft - 14.5) + "vw");
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
        $('#subTaskPopup').css('top', (taskPositionTop + 21) + "vh");
        $('#subTaskPopup').css('left', (taskPositonLeft - 14.5) + "vw");
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
        $('#reactionPopup').css('top', (taskPositionTop + 35) + "vh");
        $('#reactionPopup').css('left', (taskPositonLeft - 2.8) + "vw");
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

$('#personPopup-bottom-search-input').on('keyup', function () {
    $('.personPopup-bottom-persons').each(function () {
        if($(this).text().toUpperCase().includes($('#personPopup-bottom-search-input').val().toUpperCase())) {
            $(this).css('display', 'flex');
        } else {
            $(this).css('display', 'none');
        }
    });
});