let data;
self.addEventListener("message", function(event) {
    console.log(event)
    reLoop(event.data.session);

});


function reLoop(session) {

    setInterval(function() {
        self.postMessage({session: session})
    }, 50 * 1 * 1000)
} 