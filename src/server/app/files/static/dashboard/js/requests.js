let keywords = [];

$('#addkeyword').keypress(function (e) {
    if (e.which == 13 && !keywords.includes($('#addkeyword').val())) {
        keywords.push($('#addkeyword').val());
        $('.keywords').append('<span>' + $('#addkeyword').val() + '</span>');
        $('#addkeyword').val('');
    }
});

let users = [];

$('#myInput_search').keypress(function (e) {
    if (e.which == 13 && !users.includes($('#myInput_search').val())) {
        sendRequestToServer({type: "POST", url: "/dashboard/searchUser", data: {email: $('#myInput_search').val()}}).then(data => {
            users.push($('#myInput_search').val());

            $('.pendingbox').append(
            `<div class="profile">
                <img src="${data.img}"
                    alt="">
                <div class="info">
                    <p class="name">${data.name}</p>
                    <p class="role">${data.email}</p>
                </div>
            </div>`);

            $('#myInput_search').val('');
        });
    }
});

    $('#myInput_search').val('');

$('#submitcontrolls').click(function () {
    console.log(keywords);

    let presentation = {
        name: $('#template_title').text(),
        keywords: keywords
    }
});