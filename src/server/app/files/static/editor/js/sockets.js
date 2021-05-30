var socket = io();
        
socket.on('connect', function() {
    sendRequestToServer({type: "GET", url: "/authentication/getUserID"}).then(data => {

        socket.emit('connectUser', {user_id: data.u_id});
    });
});

socket.on('message', function(data) {
});

socket.on('error', function(data) {
    socket.disconnect();
});

socket.on('disconnect', function(data) {
    socket.connect();
});

function notifyForUpdate() {
    sendRequestToServer({type: "GET", url: "/authentication/getUserID"}).then(data => {
        socket.emit('updateSlide', {p_id: getCustomStorage('p_id'), user_id: data.u_id, s_id: getCanvasID()});
    });
}

socket.on('slideCreatedNotify', function(data) {
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

        addSlide([...data.res]);
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


            imgageTest = sideC.toDataURL({
                format: 'png',
                quality: 0.8
            })

            const box = $(`.content-leftSlides-slidesContent-slide-content-overlay[data-slideId="${data.res._id.$oid}"]`);
            box.css('background', `url('${imgageTest}')`);
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

socket.on('callStarted', function(data) {
    console.warn(data);
    data = JSON.parse(data);
    console.warn("DATA:");
    console.warn(data.user.name);

    if (typeof connected !== 'undefined' && connected) {
        $('#callPopup-button').text('Disconnect');
    } else {
        $('#callPopup-button').text('Join');
        audioUserJoined();
    }

    $('#callPopup').css('display', 'flex');
    $('#callPopup-inner').text(data.user.name);

    setTimeout(() => {
        $('#callPopup').css('display', 'none');
    }, 10000);
})

$('#callPopup-button').on('click', function () {
    $('#callPopup').css('display', 'none');
})