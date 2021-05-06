socket.on('searchUser', function (data) {
    if(data === undefined) {
        return;
    }

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
        socket.emit('inviteUser', {email: $(this).data('email'), p_id: getCustomStorage('p_id')});
    }
});