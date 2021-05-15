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

        console.log(data);

        let options = {
            timeZone: data.location.location.timezone.name,
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            //second: '',
          },
          formatter = new Intl.DateTimeFormat([], options);


        let date = formatter.format(new Date(data.created * 1000));

        
        $('#info-joindate').text(date);
        $('#info-location').text(data.location.location.city);
        
        $('#info-timezone').text(data.location.location.timezone.name);

        $('#info-email').text(data.mail);
        $('#info-username').text(data.name);


        if (data.description == null || data.description == undefined || data.description.length == 0) {
            //alert("Wollen Sie Ihren Status ändern?")
        }

        $('#personal-description').text(data.description);

        showTime(data.location.location.timezone.name);
    });
}

$('#personal-description').on('focusout', function () {
    console.log("SAVE: " + $('#personal-description').text());

    sendRequestToServer({type: "POST", url: "/profile/saveDesc", data: {desc: $('#personal-description').text()}}).then(data => {
        console.log("SAVED");
    });
})

function showTime(timezone){


    let options = {
        timeZone: timezone,
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        //second: '',
      },
      formatter = new Intl.DateTimeFormat([], options);

    var date = new Date();
    var h = date.getHours(); // 0 - 23
    var m = date.getMinutes(); // 0 - 59
    
    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    
    var time = h + ":" + m;
    document.getElementById("info-localtime").innerText = formatter.format(date);
    
    setTimeout(showTime, 1000);  
}