let data;
self.addEventListener("message", function(event) {
    console.log("NEW WORKER INTIAUZED")

    reLoop();

});


function reLoop() {

    setInterval(function() {
        self.postMessage({})
    }, 2000)
}