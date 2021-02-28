sendRequestToServer({
    type: "GET",
    url: "/profile/user"
}).then(data => {
    // Insert name
    $('#insert-username').text(data.name);

    // Insert profile picture
    $('#PP').attr('src', data.img);

    // Insert workspace count
    $('#workspaceCount').text(data.workspaces);

    // Insert created date
    let date = new Date(data.created * 1000).toLocaleDateString("en-US", {
        month: "long",
        day: "2-digit",
        year: "numeric"
    });
    $('#userSince').text(date);
});


sendRequestToServer({
    type: "GET",
    url: "/profile/getUpComingTasks"
}).then(data => {
    console.log("Upcoming Tasks:" + data);
})

sendRequestToServer({
    type: "GET",
    url: "/profile/getPresentationCount"
}).then(data => {
    console.log("Presentationen: " + data)
})

sendRequestToServer({
    type: "GET",
    url: "/profile/getWorkspaces"
}).then(data => {
    console.log(data)
})