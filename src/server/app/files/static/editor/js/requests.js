$(document).ready(function () {
    sendRequestToServer({type: "POST", url: "/editor/getPresentationInfo", data: {p_id: getCustomStorage("p_id")}}).then(data => {
        console.log("Get Presentation: " + data);
    });
});