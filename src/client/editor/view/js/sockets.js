var socket = io();
        
socket.on('connect', function() {
    console.clear();
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