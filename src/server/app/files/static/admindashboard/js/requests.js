$(window).on('load', function () {
    let today = new Date();
    today.setDate(today.getDate() + 1);
    $('#dashboardEnd').val(today.toISOString().substr(0, 10));
    today.setDate(today.getDate() - 8);
    $('#dashboardStart').val(today.toISOString().substr(0, 10));
    getData();
});

$('#dashboardStart').on('change', getData);
$('#dashboardEnd').on('change', getData);

function getData() {
    getTotalUsers();
    getTotalInteractions();
    getTotalPresentation();
    getDailyLogins();
    getTotalActiveUsers();
    getLocationDataFromUsers();
    getDailyGoalData();
    getDailyGoalDataPresentations();
    getDailyGoalDataSlides();
    getDailyInformationVideoChat();
    getLocationWithCount();
    getRequestDataWithLocation();
    getLocationDataFromRequests();
    getReportedIssues();
}


function getLocationDataFromUsers() {
    sendRequestToServer({type: "POST", url: "/admin/getLocation", data: {start: getStartTimestamp(), end: getEndTimestamp()}}).then(data => {
        createCountryChart(data.res)
    });
}

function getReportedIssues() {
    sendRequestToServer({type: "POST", url: "/admin/getIssues", data: {start: getStartTimestamp(), end: getEndTimestamp()}}).then(data => {
        $('#issues-count').html(`(${data.res.length})`)
        insertIssues(data.res);
    });
}

function getLocationDataFromRequests() {
    sendRequestToServer({type: "POST", url: "/admin/getLocationFromRequests", data: {start: getStartTimestamp(), end: getEndTimestamp()}}).then(data => {
        createCountryChartRequests(data.res)
    });
}

function getLocationWithCount() {
    sendRequestToServer({type: "POST", url: "/admin/getLocationCount", data: {start: getStartTimestamp(), end: getEndTimestamp()}}).then(data => {;
        insertLastLoginFromCountryList(data.res, data.total_request);
    });
}

function getRequestDataWithLocation() {
    sendRequestToServer({type: "POST", url: "/admin/getLocationRequestsCount", data: {start: getStartTimestamp(), end: getEndTimestamp()}}).then(data => {
        insertRequestFromCountry(data.res, data.total_request);
    });
}

function getDailyGoalData() {
    sendRequestToServer({type: "GET", url: "/admin/getCreatedTasks"}).then(data => {
        var goal = 30;
        //<p id="><span >1.860</span> / 3k Goal</p>
        $('#current-interaction-count-daily').html(`<span>${data.res}</span> / ${goal} Goal`);
       dailyGoalPrinter(data.res, goal);
    });
}

function getDailyGoalDataPresentations() {
    sendRequestToServer({type: "GET", url: "/admin/getCreatedPresentations"}).then(data => {
        var goal = 5;
        //<p id="><span >1.860</span> / 3k Goal</p>
        $('#current-interaction-count-daily-presentations').html(`<span>${data.res}</span> / ${goal} Goal`);
       dailyGoalPrinterPresentations(data.res, goal);
    });
}

function getDailyGoalDataSlides() {
    sendRequestToServer({type: "GET", url: "/admin/getCreatedSlides"}).then(data => {
        var goal = 5;
        //<p id="><span >1.860</span> / 3k Goal</p>
        $('#current-interaction-count-daily-slides').html(`<span>${data.res}</span> / ${goal} Goal`);
       dailyGoalPrinterSlides(data.res, goal);
    });
}

function getDailyInformationVideoChat() {
    sendRequestToServer({type: "GET", url: "/admin/getVideoChatInformation"}).then(data => {
        var goal = 100;
        //<p id="><span >1.860</span> / 3k Goal</p>
        $('#current-interaction-count-daily-meetings').html(`<span>${data.res["group-rooms-participant-minutes"]}</span> / ${goal} Goal`);
       dailyGoalPrinterMeetingMinutes(data.res["group-rooms-participant-minutes"], goal);
    });
}

function getTotalUsers() {
    sendRequestToServer({type: "POST", url: "/admin/getTotalUsers", data: {start: getStartTimestamp(), end: getEndTimestamp()}}).then(data => {
        $('#userCount').text(data.total_users);
        $('#userCountPlus').text(getSign(data.new_users, document.getElementById('userCountPlus')) + data.new_users);
    });
}

function getTotalInteractions() {
    sendRequestToServer({type: "POST", url: "/admin/getTotalInteractions", data: {start: getStartTimestamp(), end: getEndTimestamp()}}).then(data => {
        $('#interactionCount').text(data.total_interactions);
        $('#interactionCountPlus').text(getSign(data.new_interactions, document.getElementById('interactionCountPlus')) + data.new_interactions);
    });
}

function getTotalPresentation() {
    sendRequestToServer({type: "POST", url: "/admin/getTotalPresentations", data: {start: getStartTimestamp(), end: getEndTimestamp()}}).then(data => {
        $('#presentationCount').text(data.total_presentations);
        $('#presentationCountPlus').text(getSign(data.new_presentations, document.getElementById('presentationCountPlus')) + data.new_presentations);
    });
}

function getTotalActiveUsers() {
    sendRequestToServer({type: "POST", url: "/admin/getActiveUsersOverTime", data: {start: getStartTimestamp(), end: getEndTimestamp()}}).then(data => {
       showDailyActiveUsers(data.res)
       getCurrentUserCount();
    });
}

function getStartTimestamp() {
    return new Date($('#dashboardStart').val()).getTime() / 1000;
}

function getEndTimestamp() {
    return new Date($('#dashboardEnd').val()).getTime() / 1000;
}

function getSign(num, container)  {
    container.classList.add("plus");
    container.classList.remove("minus");
   
    if (num >= 0) {
        return "+ ";
     }
    if (num < 0) {
        container.classList.remove("plus");
        container.classList.add("minus");
        return "- ";
   } 
}

function getDailyLogins() {
    sendRequestToServer({type: "POST", url: "/admin/getUserInteractions", data: {start: getStartTimestamp(), end: getEndTimestamp()}}).then(data => {
        showDailyLogins(data.res);
    });
}