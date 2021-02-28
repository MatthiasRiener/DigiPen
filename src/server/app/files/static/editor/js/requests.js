$(document).ready(function () {
    sendRequestToServer({type: "POST", url: "/editor/getPresentationInfo", data: {p_id: getCustomStorage("p_id")}}).then(data => {
        console.log("Get Presentation: " + data);
        console.log(data)
        $('#content-navigation-first-left-text-h2').text(data.pres.name);
        $('#content-navigation-first-left-text-h3').text(data.ownUser.name);

        loadCanvasFromJson(data.canvas.canvas);
    });
});

function saveCanvas(canvas) {
    console.log(JSON.stringify(canvas));
    sendRequestToServer({type: "POST", url: "/editor/updateCanvas", data: {p_id: getCustomStorage("p_id"), canvas: JSON.stringify(canvas)}}).then(data => {
        console.log("Save Canvas");
        console.log(data);
    });
}