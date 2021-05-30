$( document ).ready(function() {
    getTasks();
});

function getTasks() {
    sendRequestToServer({type: "GET", url: "/task/getTasks"}).then(data => {

        initializeContainers();
        loadCalendar()
    
        initializePresentationContainers(data.res);
    
        loadBackgroundGrid();
        positionCursor();
    });
}

function getPresentations() {
    sendRequestToServer({type: "GET", url: "/task/getPresentations"}).then(data => {
        $('#presentationOutput').empty();
        data.res.forEach(presentation => {
            $('#presentationOutput').append(`
                <div class="presentationPopup-bottom-presentations" data-presentation="${presentation._id}">${presentation.name}</div>
            `);
        });
    });
}

function checkPresentation(id) {
    sendRequestToServer({type: "POST", url: "/task/checkPresentation", data: {p_id: id}}).then(data => {
        $('#currentPresentation').text(data.pres.name);
        $('#currentPresentation').data('presentation', data.pres._id);
        $('#taskPopup-top-left').css('background', data.pres.color);
    
        $('#presentationPopup-top-current').text(data.pres.name);
        $('#presentationPopup-top-current').data('presentation', data.pres._id);

        closeAllSubPopups();
    });
}

function getUsers() {
    sendRequestToServer({type: "POST", url: "/task/getUsers", data: {p_id: $('#currentPresentation').data('presentation')}}).then(data => {
        data.res.forEach(user => {
            $('#userOutput').empty();
            $('#userOutput').append(`
                <div class="personPopup-bottom-persons" data-user="${user._id}"><div class="personPopup-bottom-persons-image" style="background: url('${user.img}'); background-position: center; background-size: cover"></div>${user.name}</div>
            `);
        });
    });
}

function checkUser(id) {
    sendRequestToServer({type: "POST", url: "/task/checkUser", data: {u_id: id}}).then(data => {
        $('#currentUser').text(data.res.name);
        $('#currentUser').data('user', data.res._id);
        $('#currentUser').css("color", "#383838");
        $('#personPopup-top-current-image').css('background', 'url(' + data.res.img + ')');
        $('#personPopup-top-current-image').css('background-size', 'cover');
        $('#personPopup-top-current-image').css('background-position', 'center');
    
        $('#popupCurrentUser').text(data.res.name);
        $('#popupCurrentUser').data('user', data.res._id);
        $('#taskPopup-fourth-left-image').css('background', 'url(' + data.res.img + ')');
        $('#taskPopup-fourth-left-image').css('background-size', 'cover');
        $('#taskPopup-fourth-left-image').css('background-position', 'center');

        closeAllSubPopups();
    });
}

let subtasks = [];

function createSubTask(status, name, id) {
    subtasks.push(status);
    subtasks.push(name);
    subtasks.push(id || "not defined");

    closeAllSubPopups();
}

function sendTaskData() {

    let task = {
        id: $('#taskPopup').data('task'),
        presentation: $('#currentPresentation').data('presentation'),
        name: $('#taskPopup-second-headline').text(),
        user: $('#currentUser').data('user'),
        start_date: $('#taskPopup-fifth-date-start').val(),
        end_date: $('#taskPopup-fifth-date-end').val(),
        subtasks: subtasks
    }

    if($('#taskPopup').data('update')) {
        sendRequestToServer({type: "POST", url: "/task/updateTask", data: task}).then(data => {
            location.reload();
        });
    } else{
        sendRequestToServer({type: "POST", url: "/task/addTask", data: task}).then(data => {
            location.reload();
        });
    }
}

function getTaskInfo(id) {
    sendRequestToServer({type: "POST", url: "/task/getTaskInfo", data: {id: id}}).then(data => {
        let start = data.res.task.start.split(" ");
        let end = data.res.task.end.split(" ");

        $('#currentPresentation').text(data.res.task.presentation.name);
        $('#currentPresentation').data('presentation', data.res.task.presentation._id);
        $('#taskPopup-second-headline').text(data.res.task.name);
        $('#taskPopup-fourth-left-image').css('background', 'url("' + data.res.task.assignee.img + '")');
        $('#taskPopup-fourth-left-image').css('background-size', 'cover');
        $('#taskPopup-fourth-left-image').css('background-position', 'center');
        $('#currentUser').text(data.res.task.assignee.name);
        $('#currentUser').data('user', data.res.task.assignee._id);
        $('#taskPopup-fifth-date-start').val(start[0]);
        $('#taskPopup-fifth-date-end').val(end[0]);
        $('#taskPopup-sixth-bottom').empty();
        subtasks.length = 0;
        data.res.subtasks.forEach(subtask => {
            createSubTask(subtask.finished, subtask.name, subtask.id);

            $('#taskPopup-sixth-bottom').append(`
            <div class="taskPopup-sixth-bottom-row" data-subtask="${subtask.id}">
                <div class="taskPopup-sixth-bottom-row-left">
                    <input class="taskPopup-sixth-bottom-row-left-input" type="checkbox">
                </div>
                <div class="taskPopup-sixth-bottom-row-right">${subtask.name}</div>
            </div>
            `);
        });

        $('#taskPopup').data('update', 1);
        $('#taskPopup').data('task', data.res.task._id);
    });
}