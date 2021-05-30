function audioSelfConnected() {
    
}

function audioSelfDisonnected() {
    var audio = new Audio(baseURL + "/static/editor/sounds/selfDisconnect.mp3");
    audio.play();
}

function audioUserJoined() {
    var audio = new Audio(baseURL + "/static/editor/sounds/IMPORTANT_404.mp3");
    audio.play();
}