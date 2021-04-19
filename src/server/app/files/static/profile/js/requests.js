sendRequestToServer({
    type: "GET",
    url: "/profile/user"
}).then(data => {
    $('#insert-username').text(data.name);

    $('#ppContainer').css('background-image', 'url("' + data.img + '")');


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
                <p>${task.pres_name}</p>
                <h2>${task.name}</h2>
                <p>${convertTimestampToDate(task.end.$date)}</p>
            </div>
        `);

    });

    $('#currentDate').text(convertTimestampToDate(Date.now()));

})

sendRequestToServer({
    type: "GET",
    url: "/profile/getPresentationCount"
}).then(data => {
    console.log("Presentationen: " + data)
    $('#presentationCount').text(data.res);
})

function convertTimestampToDate(timestamp) {
    val = new Date(timestamp).toLocaleDateString("en-US", {
        month: "long",
        day: "2-digit",
        year: "numeric"
    });
    console.log("DATE")
    console.log(val)
    return val;
}