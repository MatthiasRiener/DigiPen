$(document).ready(function () {
    sendRequestToServer({type: "POST", url: "/editor/getPresentationInfo", data: {p_id: getCustomStorage("p_id")}}).then(data => {
        console.log("Get Presentation: " + data);
        console.log(data)
        $('#content-navigation-first-left-text-h2').text(data.pres.name);
        $('#content-navigation-first-left-text-h3').text(data.ownUser.name);

        loadCanvasFromJson(data.canvas[0].canvas);
        setCanvasID(data.canvas[0].s_id);
    });
});

function saveCanvas(canvas, width, height) {
    console.log(canvas);
    sendRequestToServer({type: "POST", url: "/editor/updateCanvas", data: {p_id: getCustomStorage("p_id"), s_id: getCanvasID(), width: width, height: height, canvas: JSON.stringify(canvas)}}).then(data => {
        console.log("Save Canvas");
        console.log(data);
    });
}

function createSlide() {
    console.log("Slide added")
}