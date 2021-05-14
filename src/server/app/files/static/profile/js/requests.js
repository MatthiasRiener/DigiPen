sendRequestToServer({
    type: "GET",
    url: "/profile/user"
}).then(data => {
    $('#content-bottom-left-right-card-inner-top').css('background-image', 'url("' + baseURL + data.img + '")')
    $('#content-bottom-right-inner-top-top-headline').text(data.name);
    $('#card-username').text(data.name);
    $('#profile-card-subinfo').text(data.mail);
    $('#content-bottom-right-inner-top-top-secondline-email').text(data.mail);

    $('.package').text("Master");
    $('#card-country').text(data.location.location.country);
    $('#card-flag').css('background-image', 'url("' + data.location.location.flag.png + '")');
});


sendRequestToServer({
    type: "GET",
    url: "/profile/getUpComingTasks"
}).then(data => {
    data.res.forEach(task => {
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
    $('#presentationCount').text(data.res);
})

function convertTimestampToDate(timestamp) {
    val = new Date(timestamp).toLocaleDateString("en-US", {
        month: "long",
        day: "2-digit",
        year: "numeric"
    });

    return val;
}