$(document).ready(function () {
    sendRequestToServer({ type: "POST", url: "/editor/getPresentationInfo", data: { p_id: getCustomStorage("p_id") } }).then(data => {
        $('#content-navigation-first-left-text-h2').text(data.pres.name);
        $('#content-navigation-first-left-text-h3').text(data.ownUser.name);

        // loadCanvasFromJson(data.canvas[0].canvas);
        // setCanvasID(data.canvas[0]._id.$oid);
        switchSlide(data.canvas[0]._id.$oid);
        loadContentOfSideSlides(data.canvas);

        
        insertPresUsers(data.users); 
                
    });
});


function insertPresUsers(users) {
    console.log(users)
    var index = 0;

    users.forEach((user) => {

        if (index >= 3) {
            $('#content-navigation-fourth-position').append(
                `<div class="content-navigation-fourth-position-circle" style="margin-left: -0.3vw; z-index: ${index+1}; background-color: #383838;font-weight: bold; color: white;');"><p>+${users.length - index}</p></div>`
            );

            return;
        }

        $('#content-navigation-fourth-position').append(
            `<div title="${user.name}" class="content-navigation-fourth-position-circle" style="margin-left: -0.3vw; z-index: ${index+1}; background-image: url('${user.img}');"></div>`
        );
        index++;
    });
}

function saveCanvas(canvas, width, height) {
    sendRequestToServer({ type: "POST", url: "/editor/updateCanvas", data: { p_id: getCustomStorage("p_id"), s_id: getCanvasID(), width: width, height: height, canvas: JSON.stringify(canvas) } }).then(data => {
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
}

function createSlide() {
    sendRequestToServer({ type: "POST", url: "/editor/createSlide", data: { p_id: getCustomStorage("p_id") } }).then(data => {
        addSlide(data.res);
        console.log(data.res)
        loadCanvasFromJson(data.res.canvas);
        setCanvasID(data.res._id.$oid);
        canvas.setWidth($('#content-main-inner-spacing-middle').width());
        canvas.setHeight($('#content-main-inner-spacing-middle').height());

        const newlyCreatedCanvas = data.res._id.$oid;

        sendRequestToServer({ type: "GET", url: "/auth/getUserID" }).then(data => {
            socket.emit('slideCreated', { s_id: newlyCreatedCanvas, p_id: getCustomStorage("p_id"), user_id: data.u_id });
        });
    });
}

function switchSlide(id) {
    sendRequestToServer({ type: "POST", url: "/editor/getSpecificSlide", data: { s_id: id } }).then(data => {
        loadCanvasFromJson(data.res.canvas);
        setCanvasID(data.res._id.$oid);
        canvas.setWidth($('#content-main-inner-spacing-middle').width());
        canvas.setHeight($('#content-main-inner-spacing-middle').height());

        curretSlide = data.res.s_id;
    });
}

function getSlides(whereStart) {
    sendRequestToServer({ type: "POST", url: "/editor/getSlides", data: { p_id: getCustomStorage("p_id") } }).then(data => {
        canvasArr.length = 0;
        data.res.forEach(slide => {
            loadPresentationCanvasFromJson(slide.canvas);
        });

        setTimeout(() => {
            currCanvas = canvasArr[whereStart];
            if (origSizePresCanvas == undefined)
                origSizePresCanvas = currCanvas.getWidth();
            resizePresentationCanvas();
            resizeCanvasFunc();
            $('#pagecount').text(`Slide ${whereStart + 1}/${canvasArr.length}`);
        }, 1000);
    });
}

function loadPresentationCanvasFromJson(json) {

    var localCanvas = window._canvas = new fabric.Canvas('c');

    localCanvas.loadFromJSON(
        json, 
        function() {
              
            localCanvas.renderAll.bind(localCanvas);
            canvasArr.push(localCanvas)
        }
    );
}