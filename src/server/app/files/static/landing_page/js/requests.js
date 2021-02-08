sendRequestToServer({type: "GET", url: "/matthiasriener"}).then(data => {
    $('#usercount').text(data.userCount + ' users.');
});