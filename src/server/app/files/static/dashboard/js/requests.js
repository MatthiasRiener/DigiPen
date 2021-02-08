$('#submitcontrolls').click(function () {
    console.log($('#template_title').text());

    let presentation = {
        name: $('#template_title').text()
    }

    sendRequestToServer({type: "POST", url: "/dashboard/createPresentation", data: presentation}).then(data => {
        console.log(data);
    });
});