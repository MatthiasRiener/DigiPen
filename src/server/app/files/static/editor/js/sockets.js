var socket = io();
        
socket.on('connect', function() {
    sendRequestToServer({type: "GET", url: "/auth/getUserID"}).then(data => {
        console.log(data)
        console.warn(data.u_id);
        socket.emit('connectUser', {user_id: data.u_id});
    });
});

socket.on('message', function(data) {
    console.log('on message: ' + data);
});

socket.on('error', function(data) {
    console.log('on error: ' + data);
    socket.disconnect();
});

socket.on('disconnect', function(data) {
    console.log('on disconnect: ' + data);
    socket.connect();
});

function notifyForUpdate() {
    sendRequestToServer({type: "GET", url: "/auth/getUserID"}).then(data => {
        console.log(data)
        console.warn(getCustomStorage('p_id'))
        console.warn(data.u_id)
        console.warn(getCanvasID());
        socket.emit('updateSlide', {p_id: getCustomStorage('p_id'), user_id: data.u_id, s_id: getCanvasID()});
    });
}

socket.on('slideCreatedNotify', function(data) {
    data = JSON.parse(data);

    console.log("NEW SLIDE CREATED EVENT")
    sendRequestToServer({type: "POST", url: "/editor/getSpecificSlide", data: {s_id: data.s_id}}).then(data => {
        console.log(data);
        // überprüfen ob der User auf der geänderten Folie ist
        if(data.res._id.$oid == getCanvasID()) {
            showChangeNotification(data.res.latestChange);
            loadCanvasFromJson(data.res.canvas);
            setCanvasID(data.res._id.$oid);
            canvas.setWidth($('#content-main-inner-spacing-middle').width());
            canvas.setHeight($('#content-main-inner-spacing-middle').height());
        }

        addSlide(data.res);
    });
})

socket.on('slideUpdateNotify', function (data) {
    data = JSON.parse(data);
    sendRequestToServer({type: "POST", url: "/editor/getSpecificSlide", data: {s_id: data.s_id}}).then(data => {

        // überprüfen ob der User auf der geänderten Folie ist
        if(data.res._id.$oid == getCanvasID()) {
            showChangeNotification(data.res.latestChange);
            loadCanvasFromJson(data.res.canvas);
            setCanvasID(data.res._id.$oid);
            canvas.setWidth($('#content-main-inner-spacing-middle').width());
            canvas.setHeight($('#content-main-inner-spacing-middle').height());
        }

        sideC = insertSlide("MATTI IS SUPA");

        sideC.loadFromJSON(data.res.canvas, function () {
            sideC.renderAll();

            const box = $(`.content-leftSlides-slidesContent-slide-content-overlay[data-slideId="${data.res._id.$oid}"]`);
            console.warn(box);
            box.css('background', `url('${'data:image/svg+xml;utf8,' + encodeURIComponent(sideC.toSVG())}')`);
            box.css('background-position', 'center');
            box.css('background-size', 'cover');
        });
    });
})


function showChangeNotification(data) {
    const container = $('.notify-about-changes');
    const containerText = $('.notify-about-changes p');
    const containerImg = $('.notify-about-changes .notify-changes-img');


    containerImg.css("background-image", "url(" + data[1] +")");  

    containerText.html(data[0] + " made changes!");

    if(!container.hasClass("notify-animation")) {
        container.addClass("notify-animation");
    }

    container.on("animationend", function(){
        container.removeClass("notify-animation");
    });
}