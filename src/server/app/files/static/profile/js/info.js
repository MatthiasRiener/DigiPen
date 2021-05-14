$(document).ready(getProfileInfo);

function getProfileInfo() {
    sendRequestToServer({
        type: "GET",
        url: "/profile/getActivityInfo"
    }).then(data => {          
        $('#info-presentationCount').text(data.res.presentations);
        $('#info-taskCount').text(data.res.tasks);
        $('#info-organizationCount').text(data.res.organizations);
    });

    sendRequestToServer({
        type: "GET",
        url: "/profile/user"
    }).then(data => {
        let date = new Date(data.created * 1000).toLocaleDateString("en-US", {
            month: "long",
            day: "2-digit",
            year: "numeric"
        });
        $('#info-joindate').text(date);
        $('#info-location').text(data.location.location.city);
        
        $('#info-timezone').text(data.location.location.timezone.name);

        $('#info-email').text(data.mail);
        $('#info-username').text(data.name);

        showTime();
    });
}

$('#personal-description').on('focusout', function () {
    console.log("SAVE: " + $('#personal-description').text());

    sendRequestToServer({type: "POST", url: "/profile/saveDesc", data: {desc: $('#personal-description').text()}}).then(data => {
        console.log("SAVED");
    });
})

function showTime(){
    var date = new Date();
    var h = date.getHours(); // 0 - 23
    var m = date.getMinutes(); // 0 - 59
    
    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    
    var time = h + ":" + m;
    document.getElementById("info-localtime").innerText = time;
    
    setTimeout(showTime, 1000);  
}