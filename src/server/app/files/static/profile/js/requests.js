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