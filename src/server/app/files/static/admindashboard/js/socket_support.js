console.log("Socket Support!!!!!")


socket.on('notifyUserCount', function(data) {
    changeCurrentUserCount(data);
});

socket.on('notifyOnlineUsers', function(data) {
    data = JSON.parse(data);
    console.log(data);

    insertActiveUsers(data.res);
})

function insertActiveUsers(users) {
    console.log("users")
    console.log(users)
    $('#dashboardMain-right-inner-user-list').empty();

    users.forEach((u,index) => {
        worker = new Worker(baseURL + "/static/admindashboard/js/worker.js?" + Math.random());

        const mainContainer = document.createElement('div');
        mainContainer.classList.add("currently-active-user-item");

        const profileImageContainer = document.createElement('div');
        profileImageContainer.classList.add("currently-active-user-profile-pic");
        profileImageContainer.style.backgroundImage = "url('" + u.img + "')";

        const usernameContainer = document.createElement('p');
        usernameContainer.classList.add("currently-active-user-username");
        usernameContainer.innerHTML = u.name;


        const timeOnline = document.createElement('p');
        timeOnline.classList.add("currently-active-user-time-online");
        timeOnline.dataset.user_id = u._id;

        console.log("Last login of user: " + u.last_login);

        worker.postMessage({index: u._id, time: u.last_login })
        worker.addEventListener('message', function(event) {updateTime(event)});

        mainContainer.appendChild(profileImageContainer);
        mainContainer.appendChild(usernameContainer);
        mainContainer.appendChild(timeOnline);
        



        document.getElementById('dashboardMain-right-inner-user-list').appendChild(mainContainer);

    
    });
}

function updateTime(event) {
    console.log("Moin!")
    console.log(event)
    var container = $(".currently-active-user-time-online[data-user_id='" + event.data.id + "']");
    console.log(container);
    container.html(event.data.time);
}