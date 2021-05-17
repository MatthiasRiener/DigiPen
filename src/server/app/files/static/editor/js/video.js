let room;
let container = document.getElementById("content-main-inner-spacing-top");
let userCounter = 1;
let connected = false;

function connectToVideo() {

    const loader = document.getElementById('loadingScreen');
    loader.style.display = "flex";
    loader.relightLoader("Connecting...");


    sendRequestToServer({ type: "POST", url: "/editor/connectToVideoChat", data: { p_id: getCustomStorage("p_id") } }).then(data => {
        document.getElementById("localVideoText").innerHTML = data.faggot;
        return Twilio.Video.connect(data.vt);
    }).then(_room => {
        room = _room;
        room.participants.forEach(participantConnected);
        room.on('participantConnected', participantConnected);
        room.on('participantDisconnected', participantDisconnected);
        connected = true;
        updateParticipantCount();
        audioSelfConnected();


        loader.documentLoaded();

        setTimeout(() => {
            loader.style.display = "none";
        }, 700)

    }).catch((err) => {
        console.log("ERROR WHILE CONNECTING....")
        console.log(err)
    });;
}

function updateParticipantCount() {
    document.getElementById("content-navigation-third-box-counter").innerHTML = userCounter;



    $('body').addClass('loaded');
    resetWorker();


};

var worker;

function startWorker() {

    if (userCounter == 1) {
        worker = new Worker(baseURL + "/static/editor/js/checkConnectionsWorker.js?" + Math.random());

        worker.postMessage({})
        worker.addEventListener('message', function (event) {

            if (connected) {
                disconnect();
            }

            worker.terminate();
        });
    }

}


function resetWorker() {
    if (userCounter == 1) {
        startWorker();
    } else {
        worker.terminate();
    }

}

function participantConnected(participant) {
    let participantDiv = document.createElement('div');
    participantDiv.setAttribute('id', participant.sid);
    participantDiv.setAttribute('class', 'content-main-inner-spacing-top-profile');

    let participantVideoContainer = document.createElement('div');
    participantVideoContainer.setAttribute('class', 'content-main-inner-spacing-top-profile-image');
    participantDiv.appendChild(participantVideoContainer);

    let participantText = document.createElement('h2');
    participantText.setAttribute('class', 'content-main-inner-spacing-top-profile-text');
    participantText.innerHTML = participant.identity;
    participantDiv.appendChild(participantText);

    container.appendChild(participantDiv);

    participant.tracks.forEach(publication => {
        if (publication.isSubscribed)
            trackSubscribed(participantVideoContainer, publication.track);
    });
    participant.on('trackSubscribed', track => trackSubscribed(participantVideoContainer, track));
    participant.on('trackUnsubscribed', trackUnsubscribed);

    userCounter++;
    updateParticipantCount();
};

function participantDisconnected(participant) {
    document.getElementById(participant.sid).remove();
    userCounter--;
    updateParticipantCount();
};

function trackSubscribed(div, track) {
    div.appendChild(track.attach());
};

function trackUnsubscribed(track) {
    track.detach().forEach(element => element.remove());
};

function disconnect() {
    room.disconnect();
    audioSelfDisonnected();
    while (container.lastChild !== null && container.lastChild !== undefined && container.lastChild.id != 'local')
        container.removeChild(container.lastChild);
    //button.innerHTML = 'Join call';

    let video = document.getElementById('localVideo');
    video.innerHTML = "";

    let videoText = document.getElementById('localVideoText');
    videoText.innerHTML = "";

    let presi_vid = document.getElementById('my-video-track');
    presi_vid.innerHTML = "";

    connected = false;
    updateParticipantCount();
};

function addLocalVideo() {
    Twilio.Video.createLocalVideoTrack().then(track => {
        let video = document.getElementById('localVideo');
        video.appendChild(track.attach());

        let presi_vid = document.getElementById('my-video-track');
        presi_vid.appendChild(track.attach());

        videoInitialized()

    }).catch((err) => {

    });
};

