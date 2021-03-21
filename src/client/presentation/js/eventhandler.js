let canvas,
    originalSize;

// onload erzeugt einen neuen fabric canvas und resized diesen
// sodass er responsiv ist
window.onload = function () {
    createCanvas();
    originalSize = canvas.getWidth();
    resizeCanvas()
}

$(window).resize(function () {
    resizeCanvas()
});

// IMPORTANT canvas hintergrund ist mit css gefüllt
function createCanvas() {
    const fabric = window.fabric;
    // create `Canvas` object using `<canvas>` DOM node
    canvas = new fabric.Canvas('canvas');
    // create a rectangle object
    var rect = new fabric.Rect({
        left: 100,
        top: 100,
        fill: 'red',
        width: 20,
        height: 20
    });
    // "add" rectangle onto canvas
    canvas.add(rect);
    canvas.renderAll();
}

function resizeCanvas() {
    let w = $("body").width()
    let h = $("body").height()

    if (originalSize) {
        val = canvas.width / originalSize;
        canvas.setZoom(val);
    }

    canvas.setWidth(h * 16 / 9);
    canvas.setHeight(h);
    if (w / h < 16 / 9) {
        canvas.setWidth(w);
        canvas.setHeight(w * 9 / 16);
    }
    canvas.renderAll();
}