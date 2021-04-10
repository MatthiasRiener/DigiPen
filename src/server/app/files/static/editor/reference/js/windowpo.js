// wait for messages from opener
window.addEventListener('message', function (e) {
    let output = document.getElementById("output")
    output.innerText += e.data;
    console.log(e.data);
});

$("#next").click(function () {
    window.opener.postMessage('next', '*');
});
$("#previous").click(function () {
    window.opener.postMessage('previous', '*');
});

// tell the opener we are waiting
window.opener.postMessage('inited', '*');

window.addEventListener("beforeunload", function (e) {
    // Do something
    window.opener.postMessage('stfu', '*');
    window = null;
}, false);