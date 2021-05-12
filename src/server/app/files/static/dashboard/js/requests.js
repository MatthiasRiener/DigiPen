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
        if (data.status) {
            setCustomStorage("p_id", data.p_id);
            window.location.href = baseURL + "/editor"
        }
    });
});

function createPresentation() {
    sendRequestToServer({
        type: "POST",
        url: "/dashboard/requestPresentation",
        data: "Hallo Matti!"
    }).then(data => {
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

    console.log("Meine Presentationen")
    console.log(data);
    
    var canvas = new fabric.Canvas();
    canvas.enableGLFiltering = false;

    //canvas.setWidth($('#invisibleCanvas').width());
    //canvas.setHeight($('#invisibleCanvas').height());

    data.res.forEach(presentation => {
        if (presentation.canvas == null) {
            return;
        }


        canvas.clear();

        canvas.setDimensions({width: 1920, height: 1080})

      

        canvas.loadFromJSON(presentation.canvas[0].canvas, function () {
            canvas.renderAll();

            imgageTest = canvas.toDataURL({
                format: 'png',
                quality: 0.8
            })

            $('#ownPresentations').append(`
            <li data-presentation="${presentation._id}">
                <div class="template_yourPresentation" style="background: url('${imgageTest}'); background-size: cover; background-position: center; background-repeat: no-repeat"><i class="fas fa-eye"></i></div>
                <p class="searchitem_yourPresentation">${presentation.name}</p>
                <p class="amoutofslides">${presentation.canvas.length} Slides</p>
            </li>
        `);


        }, function (o, object) {
        })
    });
});


$('body').on('click', '#ownPresentations li', function () {
    setCustomStorage("p_id", $(this).data("presentation"));
    window.location.href = baseURL + "/editor";
})

function getImage(idx) {

    var width = 343;
    var height = 300;

    var resizedCanvas = document.createElement("canvas");
    var resizedContext = resizedCanvas.getContext("2d");

    resizedCanvas.width = "" + width;
    resizedCanvas.height = "" + height;

    var canvas = document.getElementById("canvas"+idx);

    resizedContext.drawImage(canvas, 0, 0, width, height);
    var myResizedData = resizedCanvas.toDataURL();

    return $('<img>').attr("src", myResizedData);

}
