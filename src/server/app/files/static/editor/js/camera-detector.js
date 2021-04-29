console.log("CAMERA DETECTOR INTIALIZED");

$('body').on('click', '#localVideo', function(){
    videoInitialized()
})

function videoInitialized() {


    const videoContainer = document.getElementById('localVideo');
    const localVideo = (videoContainer.getElementsByTagName('video'))[0];


    console.info("Video was initialized.");
    console.log(localVideo);

    var img = getScreenshot(localVideo);
    var brightness = getBrightness(img);
    
    console.log(brightness);
    if (brightness < 35) {
        alert("You might wanna turn on some light u ni-");
    }

}


function getScreenshot(videoEl, scale) {
    scale = scale || 1;

    const canvas = document.createElement("canvas");
    canvas.width = videoEl.clientWidth * scale;
    canvas.height = videoEl.clientHeight * scale;
    canvas.getContext('2d').drawImage(videoEl, 0, 0, canvas.width, canvas.height);

    return canvas;
}

// liefert einen wert zwischen 0 und 100
function getBrightness(image) {
    let src = cv.imread(image);
    let dst = new cv.Mat();
// You can try more different parameters
    cv.cvtColor(src, dst, cv.COLOR_RGBA2GRAY, 0);


    brightness = 0;
    counter = 0;
    for (let row = 0; row < dst.rows; row++) {
        for (let col = 0; col < dst.cols; col++) {
            brightness += dst.data[counter] / 255;
            counter++;
        }
    }

    return brightness / dst.data.length * 100;
}


document.addEventListener("DOMContentLoaded", function(event){
    console.log("Everything loaded!")

  });