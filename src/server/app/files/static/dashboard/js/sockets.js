var socket = io();
        
socket.on('connect', function() {
    socket.emit('my event', {data: 'Im connected!'});
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
    console.log('searchUser Event: ' + data);
})

$('#myInput_search').keypress(function (e) {

    socket.emit('searchUser', {data: $('#myInput_search').val()});

    /*
        sendRequestToServer({type: "POST", url: "/dashboard/searchUser", data: {email: $('#myInput_search').val()}}).then(data => {
            console.log("User: " + data);
            users.push($('#myInput_search').val());

            $('.searchbox').append(
            `<div class="profile">
                <img src="${data.img}"
                    alt="">
                <div class="info">
                    <p class="name">${data.name}</p>
                    <p class="role">${data.email}</p>
                </div>
            </div>`);

            $('#myInput_search').val('');
        });*/
});