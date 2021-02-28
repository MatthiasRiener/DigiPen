let keywords = [];
let template = false;

$('#addkeyword').keypress(function (e) {
    if (e.which == 13 && !keywords.includes($('#addkeyword').val())) {
        keywords.push($('#addkeyword').val());
        $('.keywords').append('<span>' + $('#addkeyword').val() + '</span>');
        $('#addkeyword').val('');
    }
});

$('#submitcontrolls').click(function () {
    console.log(keywords);

    let presentation = {
        id: getCustomStorage("p_id"),
        name: $('#template_title').text(),
        timeline: $('#timelinecheck').prop('checked'),
        keywords: keywords,
        export: $('#exportcheck').prop('checked'),
        public: $('#publiccheck').prop('checked'),
        template: template
    }

    sendRequestToServer({
        type: "POST",
        url: "/dashboard/createPresentation",
        data: presentation
    }).then(data => {
        console.log("Created Presentation: " + data);
        if (data.status) {
            setCustomStorage("p_id", data.p_id);
            window.location.href = baseURL + "/editor"
        }
    });
});

function createPresentation() {
    console.log("creating presentation");
    sendRequestToServer({
        type: "POST",
        url: "/dashboard/requestPresentation",
        data: "Hallo Matti!"
    }).then(data => {
        console.log("Requested Presentation: " + data);
        setCustomStorage("p_id", data.id);
        $('#template_title').text(data.name);
        template = false;
    });
}

function deletePlaceholder() {
    sendRequestToServer({
        type: "POST",
        url: "/dashboard/deleteRequested",
        data: {
            p_id: getCustomStorage("p_id")
        }
    }).then(data => {
        console.log("Delete Requested: " + data);
    });
}

sendRequestToServer({
    type: "GET",
    url: "/dashboard/getTemplates"
}).then(data => {
    
});


sendRequestToServer({
    type: "GET",
    url: "/dashboard/getOwnPresentations"
}).then(data => {

    console.warn("========");
    console.log(data)
});