
sendRequestToServer({
    type: "GET",
    url: "/profile/user"
}).then(data => {
    $('#insert-username').text(data.name);
    $('#Profile .whoami p').text(data.name);

    $('#ppContainer').css('background-image', 'url("' + data.img + '")');
    $('#secppContainer').css('background-image', 'url("' + data.img + '")');


    $('#workspaceCount').text(data.workspaces);

    let date = new Date(data.created * 1000).toLocaleDateString("en-US", {
        month: "long",
        day: "2-digit",
        year: "numeric"
    });
    $('#userSince').text(date);
});