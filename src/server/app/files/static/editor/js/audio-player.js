var joinSound;

function audioSelfConnected() {
    
}

function audioSelfDisonnected() {
    var audio = new Audio(baseURL + "/static/editor/sounds/selfDisconnect.mp3");
    audio.play();
}

function audioUserJoined() {
    joinSound = new Audio(baseURL + "/static/editor/sounds/amoung.mp3");
    joinSound.play();
}

function selfJoined() {
    var audio = new Audio(baseURL + "/static/editor/sounds/IMPORTANT_404.mp3");
    audio.play();
}


function dismissCall() {
    joinSound.stop();
    joinSound.currentTime = 0;
}