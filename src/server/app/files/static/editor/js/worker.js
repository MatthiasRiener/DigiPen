let data;
self.addEventListener("message", function(event) {

    reLoop();

});


function reLoop() {

    setInterval(function() {
        self.postMessage({})
    }, 5000)
}