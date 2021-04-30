let data;
self.addEventListener("message", function(event) {
    data = event.data;
    console.log(data);
    loop(data);
});

var seconds;

function loop(data) {
    console.log(data.time);
    var date = new Date(data.time * 1000);
    seconds = date.getSeconds() + 1;

    console.log("Seconds" + seconds);
    
    reLoop(true)
    

    
}


function reLoop(bool) {

    var endDate = new Date();
    var startDate = new Date(data.time * 1000);

    var diff = (endDate.getTime() - startDate.getTime()) / 1000;
    
    self.postMessage({id: data.index, time: secondsToHms(diff)})

    setTimeout(function() {
        console.log("SOOOS")
        reLoop(false);
    }, bool ?  ((60-seconds) * 1000) : 60 * 1000)
}


function secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);

    var h_r = h < 10 ? '0' + h : h;
    var m_r = m < 10 ? '0' + m : m;

    return h_r + ":" + m_r;
}