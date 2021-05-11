sendRequestToServer({type: "GET", url: "/matthiasriener"}).then(data => {
    console.log("insertingh users")
    console.log(data);
    $('#userCount').text(data.userCount);
});