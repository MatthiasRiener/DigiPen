let data;
self.addEventListener("message", function(event) {

    reLoop();

});


function reLoop() {

    setInterval(function() {
        self.postMessage({})
        self.close();
    }, 50 * 1 * 1000)
} 