function getPresentations() {
    sendRequestToServer({type: "GET", url: "/task/getTasks"}).then(data => {
        data.res.forEach(presentation => {
            console.log(presentation);
            $('#presentationOutput').append(`
                <div class="presentationPopup-bottom-presentations" data-presentation="${presentation._id}">${presentation.name}</div>
            `);
        });
    });
}

function checkPresentation(id) {
    console.log("id!!: " + id);
    sendRequestToServer({type: "POST", url: "/task/checkPresentation", data: {p_id: id}}).then(data => {
        $('#currentPresentation').text('presentation', data.name);
        $('#currentPresentation').data(data._id);
    
        $('#presentationPopup-top-current').text('presentation', data.name);
        $('#presentationPopup-top-current').data(data._id);
    });
}

function getUsers() {
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