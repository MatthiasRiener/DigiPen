var socket = io();
        
socket.on('connect', function() {
    sendRequestToServer({type: "GET", url: "/auth/getUserID"}).then(data => {
        socket.emit('connectUser', {user_id: data.u_id});
    });
});

socket.on('message', function(data) {
});

socket.on('error', function(data) {
    socket.disconnect();
});

socket.on('disconnect', function(data) {
    socket.connect();
});

socket.on('invitePressed', function (data) {
    notification = document.getElementById('notifications-comp');
    notification.deleteEntry(data);
})

socket.on('handleInvite', function (data) {
})

function handleInvite(status, p_id) {
    sendRequestToServer({type: "GET", url: "/auth/getUserID"}).then(data => {
        socket.emit('handleInvite', {status: status, p_id: p_id, u_id: data.u_id});
    });
}