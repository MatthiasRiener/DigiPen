$(document).ready(function () {
    sendRequestToServer({ type: "POST", url: "/editor/getPresentationInfo", data: { p_id: getCustomStorage("p_id") } }).then(data => {
        console.log("Get Presentation: " + data);
        console.log(data)
        $('#content-navigation-first-left-text-h2').text(data.pres.name);
        $('#content-navigation-first-left-text-h3').text(data.ownUser.name);

        // loadCanvasFromJson(data.canvas[0].canvas);
        // setCanvasID(data.canvas[0]._id.$oid);
        switchSlide(data.canvas[0]._id.$oid);
        data.canvas.forEach(slide => {
            console.log(slide);
            addSlide(slide);
        });
    });
});

function saveCanvas(canvas, width, height) {
    console.log(canvas);
    sendRequestToServer({ type: "POST", url: "/editor/updateCanvas", data: { p_id: getCustomStorage("p_id"), s_id: getCanvasID(), width: width, height: height, canvas: JSON.stringify(canvas) } }).then(data => {
        console.log("Save Canvas");
        console.log(data);
        sideC = insertSlide("MATTI IS SUPA");

        sideC.loadFromJSON(data.res.canvas, function () {
            sideC.renderAll();


            imgageTest = sideC.toDataURL({
                format: 'png',
                quality: 0.8
            })


            console.log(imgageTest)

            const box = $(`.content-leftSlides-slidesContent-slide-content-overlay[data-slideId="${data.res._id.$oid}"]`);
            console.warn(box);
            box.css('background', `url('${imgageTest}')`);
            box.css('background-position', 'center');
            box.css('background-size', 'cover');
        });
    });
}

function createSlide() {
    sendRequestToServer({ type: "POST", url: "/editor/createSlide", data: { p_id: getCustomStorage("p_id") } }).then(data => {
        console.log("Created Slide!");
        console.log(data);
        addSlide(data.res);
        loadCanvasFromJson(data.res.canvas);
        setCanvasID(data.res._id.$oid);
        canvas.setWidth($('#content-main-inner-spacing-middle').width());
        canvas.setHeight($('#content-main-inner-spacing-middle').height());

        const newlyCreatedCanvas = data.res._id.$oid;

        sendRequestToServer({ type: "GET", url: "/auth/getUserID" }).then(data => {
            console.log("TRYING TO CREATE NEW SLIDE")
            console.log(newlyCreatedCanvas, data)

            socket.emit('slideCreated', { s_id: newlyCreatedCanvas, p_id: getCustomStorage("p_id"), user_id: data.u_id });
        });
    });
}

function switchSlide(id) {
    console.log("IDDDD: " + id);
    sendRequestToServer({ type: "POST", url: "/editor/getSpecificSlide", data: { s_id: id } }).then(data => {
        console.log("Switching Slide");
        console.log(data);
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
        console.log(data);
        data.res.forEach(slide => {
            loadPresentationCanvasFromJson(slide.canvas);
        });

        currCanvas = canvasArr[whereStart];
        console.log(canvasArr);
        if (origSizePresCanvas == undefined)
            origSizePresCanvas = currCanvas.getWidth();
        resizePresentationCanvas();
        resizeCanvasFunc();
        $('#pagecount').text(`Slide ${whereStart + 1}/${canvasArr.length}`);
    });
}

function loadPresentationCanvasFromJson(json) {
    newCanvas = new fabric.Canvas(presCanvasId);
    console.log(json)
    newCanvas.loadFromJSON(json, function () {
        console.log("Canvas loaded!")
        console.warn(newCanvas)
        newCanvas.renderAll();
        canvasArr.push(newCanvas)
    }, function (o, object) {

    })
}