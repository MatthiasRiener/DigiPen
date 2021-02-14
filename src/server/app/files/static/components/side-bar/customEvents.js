var workspace = document.getElementById('workspace-comp');
var notifications = document.getElementById('notifications-comp');
var sideBar = document.getElementById('sidebar-comp');

sideBar.addEventListener('animWorkSpace', e => {  
    workspace.animateWorkspace();
})

sideBar.addEventListener('animNotifications', e => {
    console.log("animation 1");
    notifications.animateNotifications();
})