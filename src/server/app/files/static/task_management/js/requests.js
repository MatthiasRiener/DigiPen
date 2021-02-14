function getPresentations() {
    sendRequestToServer({type: "GET", url: "/task/getTasks"}).then(data => {
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
    });
}

function getUsers() {
    console.log("id: " + $('#currentPresentation').data('presentation'));
    sendRequestToServer({type: "POST", url: "/task/getUsers", data: {p_id: $('#currentPresentation').data('presentation')}}).then(data => {
        data.forEach(user => {
            $('#userOutput').append(`
                <div class="personPopup-bottom-persons" data-user="${user.u_id}"><div class="personPopup-bottom-persons-image"></div>${user.name}</div>
            `);
        });
    });
}

function sendTaskData() {
    let task = {
        presentation: $('.currentPresentation').data('presentation'),
        name: $('#taskPopup-second-headline').text(),
        user: $('.currentUser').data('user')
    }

    console.log(task);
}