// This is where all events are 

window.onload = function () {
    console.log('Document loaded.')

    getUnsplashDocuments();
}

$(document).ajaxStop(function() {
    console.log("all content loaded.")
})

