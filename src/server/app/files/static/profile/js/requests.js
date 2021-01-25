sendRequestToServer({type: "GET", url: "/profile/user/"}).then(data => {
    // Insert name
    $('#insert-username').text(data.name);

    // Insert profile picture
    $('#PP').attr('src', data.img);
});