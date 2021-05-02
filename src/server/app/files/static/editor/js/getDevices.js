/*
*  Copyright (c) 2015 The WebRTC project authors. All Rights Reserved.
*
*  Use of this source code is governed by a BSD-style license
*  that can be found in the LICENSE file in the root of the source
*  tree.
*/

'use strict';

// const videoElement = document.querySelector('video');
const audioInputSelect = document.querySelector('#micPopup-inner-popup-top-main');
const audioOutputSelect = document.querySelector('#micPopup-inner-popup-bottom-main');
const videoSelect = document.querySelector('#camPopup-inner-popup-top-main');
const selectors = [audioInputSelect, audioOutputSelect, videoSelect];

audioOutputSelect.disabled = !('sinkId' in HTMLMediaElement.prototype);

function gotDevices(deviceInfos) {
    // Handles being called several times to update labels. Preserve values.
    const values = selectors.map(select => select.value);
    selectors.forEach(select => {
        while (select.firstChild) {
            select.removeChild(select.firstChild);
        }
    });
    for (let i = 0; i !== deviceInfos.length; ++i) {
        const deviceInfo = deviceInfos[i];
        const option = document.createElement('div');
        option.dataset.deviceinfo = deviceInfo.deviceId;
        if (deviceInfo.kind === 'audioinput') {
            option.setAttribute('class', 'micPopup-inner-popup-top-main-row');
            option.innerHTML = document.getElementById('micPopup-input-layout').innerHTML;
            option.getElementsByClassName('micPopup-inner-popup-top-main-row-left')[0].innerHTML = deviceInfo.label || `microphone ${audioInputSelect.length + 1}`;
            audioInputSelect.appendChild(option);
        } else if (deviceInfo.kind === 'audiooutput') {
            option.setAttribute('class', 'micPopup-inner-popup-bottom-main-row');
            option.innerHTML = document.getElementById('micPopup-output-layout').innerHTML;
            option.getElementsByClassName('micPopup-inner-popup-bottom-main-row-left')[0].innerHTML = deviceInfo.label || `speaker ${audioOutputSelect.length + 1}`;
            audioOutputSelect.appendChild(option);
        } else if (deviceInfo.kind === 'videoinput') {
            option.setAttribute('class', 'camPopup-inner-popup-top-main-row');
            option.innerHTML = document.getElementById('camPopup-layout').innerHTML;
            option.getElementsByClassName('camPopup-inner-popup-top-main-row-left')[0].innerHTML = deviceInfo.label || `camera ${videoSelect.length + 1}`;
            videoSelect.appendChild(option);
        } else {

        }
    }
    selectors.forEach((select, selectorIndex) => {
        if (Array.prototype.slice.call(select.childNodes).some(n => n.value === values[selectorIndex])) {
            select.value = values[selectorIndex];
        }
    });
}

navigator.mediaDevices.enumerateDevices().then(gotDevices).catch(handleError);


function gotStream(stream) {
    window.stream = stream; // make stream available to console
    // videoElement.srcObject = stream;
    // Refresh button list in case labels have become available
    return navigator.mediaDevices.enumerateDevices();
}

function handleError(error) {
}

function start() {
    if (window.stream) {
        window.stream.getTracks().forEach(track => {
            track.stop();
        });
    }
    const audioSource = audioInputSelect.value;
    const videoSource = videoSelect.value;
    const constraints = {
        audio: { deviceId: audioSource ? { exact: audioSource } : undefined },
        video: { deviceId: videoSource ? { exact: videoSource } : undefined }
    };
    navigator.mediaDevices.getUserMedia(constraints).then(gotStream).then(gotDevices).catch(handleError);
}



start();