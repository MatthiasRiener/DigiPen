var joinSound = new Audio(baseURL + "/static/editor/sounds/amoung.mp3");

function audioSelfConnected() {
    var audio = new Audio(baseURL + "/static/editor/sounds/IMPORTANT_404.mp3");
    audio.play();
}

function audioSelfDisonnected() {
    var audio = new Audio(baseURL + "/static/editor/sounds/selfDisconnect.mp3");
    audio.play();
}

function audioUserJoined() {
    joinSound.play();
}




function dismissCall() {
    joinSound.pause();
    joinSound.currentTime = 0;
}