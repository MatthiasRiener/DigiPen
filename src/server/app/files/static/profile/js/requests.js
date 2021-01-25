let user = sendRequestToServer({type: "GET", url: "/profile/user/"});

alert(user);

$('#insert-username').text(user.firstname + user.lastname);