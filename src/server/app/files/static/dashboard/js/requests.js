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

        console.log("loading canvas")
      

        canvas.loadFromJSON(presentation.canvas[0].canvas, function () {
            canvas.renderAll();
            $('#ownPresentations').append(`
            <li data-presentation="${presentation._id}">
                <div class="template_yourPresentation" style="background: url('${'data:image/svg+xml;utf8,' + encodeURIComponent(canvas.toSVG())}'); background-size: cover; background-position: center; background-repeat: no-repeat"><i class="fas fa-eye"></i></div>
                <p class="searchitem_yourPresentation">${presentation.name}</p>
                <p class="amoutofslides">${presentation.canvas.length} Slide</p>
            </li>
        `);


        }, function (o, object) {
            console.log("Canvas loaded!")
        })
    });
});


$('body').on('click', '#ownPresentations li', function () {
    console.log("IDDDDD: " + $(this).data("presentation"));
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
