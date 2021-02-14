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

socket.on('invitePressed', function (data) {
    //$(`.invitesOutput .invites-row[data-presentation="${data.p_id}"]`).remove();
    console.log("if..")
    notification = document.getElementById('notifications-comp');
    notification.deleteEntry(data);
})

socket.on('handleInvite', function (data) {
    //$(`.invitesOutput .invites-row[data-presentation="${data.p_id}"]`).remove();
    console.log("handling invite...", data)
})

function handleInvite(status, p_id) {
    sendRequestToServer({type: "GET", url: "/auth/getUserID"}).then(data => {
        socket.emit('handleInvite', {status: status, p_id: p_id, u_id: data.u_id});
    });
}