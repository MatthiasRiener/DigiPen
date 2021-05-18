function audioSelfConnected() {
    
}

function audioSelfDisonnected() {
    var audio = new Audio(baseURL + "/static/editor/sounds/selfDisconnect.mp3");
    audio.play();
}