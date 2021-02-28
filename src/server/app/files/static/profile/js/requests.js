sendRequestToServer({
    type: "GET",
    url: "/profile/user"
}).then(data => {
    $('#insert-username').text(data.name);

    $('#PP').attr('src', data.img);

    $('#workspaceCount').text(data.workspaces);

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
    console.log(data);
    data.res.forEach(task => {
        console.log(task);
        $('#taskOutput').append(`
            <div class="Task">
                <p>${task.p_id}</p>
                <h2>${task.name}</h2>
                <div class="contribuer">
                    <img id="PPc" src={{ url_for("static", filename="/profile/img/cat.jpg") }} alt="Profile Picture">
                </div>
            </div>
        `);
    });
})

sendRequestToServer({
    type: "GET",
    url: "/profile/getPresentationCount"
}).then(data => {
    console.log("Presentationen: " + data)
    $('#presentationCount').text(data.res);
})

sendRequestToServer({
    type: "GET",
    url: "/profile/getWorkspaces"
}).then(data => {
    console.log(data)
})