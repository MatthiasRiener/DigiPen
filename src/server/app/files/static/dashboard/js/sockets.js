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

$('#myInput_search').keyup(function (e) {
    if($('#myInput_search').val() == '') {
        $('.searchOutput').empty();
        return;
    }

    socket.emit('searchUser', {data: $('#myInput_search').val()});
});

$('body').on('click', '.profile', function () {
    const type = $(this).data('type');

    if(type == 'search') {
        console.log($(this).data('email'));
        socket.emit('inviteUser', {email: $(this).data('email'), p_id: getCustomStorage('p_id')});
    }
});