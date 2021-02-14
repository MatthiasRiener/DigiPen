var socket = io();
        
socket.on('connect', function() {
    sendRequestToServer({type: "GET", url: "/auth/getUserID"}).then(data => {
        console.log(data)
        socket.emit('connectUser', {user_id: data.u_id});
    });
});

socket.on('message', function(data) {
    console.log('on message: ' + data);
});

socket.on('error', function(data) {
    console.log('on error: ' + data);
    socket.disconnect();
});

socket.on('disconnect', function(data) {
    console.log('on disconnect: ' + data);
    socket.connect();
});

socket.on('searchUser', function (data) {
    if(data === undefined) {
        return;
    }
    console.log('searchUser Event: ' + data);

    $('.searchOutput').empty();

    data.forEach(user => {
        $('.searchOutput').append(
            `<div data-email="${user.mail}" data-type="search" class="profile">
                <img src="${user.img}"
                    alt="">
                <div class="info">
                    <p class="name">${user.name}</p>
                    <p class="role">${user.mail}</p>
                </div>
            </div>`);
    });
})

socket.on('inviteUser', function (data) {
    console.log(data);

    $('.pendingOutput').empty();

    data.users.forEach(user => {
        if(user.status == 'pending') {
            $('.pendingOutput').append(
                `<div data-email="${user.mail}" data-type="pending" class="profile">
                    <img src="${user.img}"
                        alt="">
                    <div class="info">
                        <p class="name">${user.name}</p>
                        <p class="role">${user.mail}</p>
                    </div>
                </div>`);

            if($(`.searchOutput .profile[data-email="${user.mail}"]`).length > 0) {
                $(`.searchOutput .profile[data-email="${user.mail}"]`).remove();
            }
        }
    });
});

/*
socket.on('invitePressed', function (data) {
        //$(`.invitesOutput .invites-row[data-presentation="${data.p_id}"]`).remove();
    console.log("if..")
    notification = document.getElementById('notifications-comp');
    notification.deleteEntry(data);
})
*/

/*
socket.on('handleInvite', function (data) {
    //$(`.invitesOutput .invites-row[data-presentation="${data.p_id}"]`).remove();
    console.log("handling invite...", data)
})
*/

$('#myInput_search').keyup(function (e) {
    if($('#myInput_search').val() == '') {
        $('.searchOutput').empty();
        return;
    }

    socket.emit('searchUser', {email: $('#myInput_search').val(), p_id: getCustomStorage('p_id')});
});

$('body').on('click', '.profile', function () {
    const type = $(this).data('type');

    if(type == 'search') {
        console.log($(this).data('email'));
        socket.emit('inviteUser', {email: $(this).data('email'), p_id: getCustomStorage('p_id')});
    }
});

/*
function handleInvite(status, p_id) {
    sendRequestToServer({type: "GET", url: "/auth/getUserID"}).then(data => {
        socket.emit('handleInvite', {status: status, p_id: p_id, u_id: data.u_id});
    });
}
*/