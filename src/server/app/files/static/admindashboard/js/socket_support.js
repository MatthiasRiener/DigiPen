console.log("Socket Support!!!!!")


socket.on('notifyUserCount', function(data) {
    changeCurrentUserCount(data);
});