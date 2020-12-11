var canvas = this.__canvas = new fabric.Canvas('c');

fabric.Object.prototype.transparentCorners = false;
fabric.Object.prototype.cornerStyle = 'rect';
fabric.Object.prototype.cornerSize = 6.5;
fabric.Object.prototype.transparentCorners = false;
fabric.Object.prototype.cornerColor = '#aaaaff';


function Add() {
    var rect = new fabric.Rect({
        left: 100,
        top: 50,
        fill: 'yellow',
        width: 200,
        height: 100,
        objectCaching: false,
        stroke: 'lightgreen',
        strokeWidth: 4,
    });

    canvas.add(rect);
    canvas.setActiveObject(rect);
}

Add();

/*
function cloneObject(eventData, target) {
    var canvas = target.canvas;
    target.clone(function (cloned) {
        cloned.left += 10;
        cloned.top += 10;
        canvas.add(cloned);
    });
}
*/

let originalSize;

window.onload = function () {
    console.log('Document loaded.');
    resizeCanvas();
    originalSize = canvas.width;
}

$(window).resize(function () {
    resizeCanvas();
});

function resizeCanvas() {
    if (originalSize) {
        val = canvas.width / originalSize;
        canvas.setZoom(val);
    }
    canvas.setWidth($(window).width() * 0.8);
    canvas.setHeight($(window).width() * 0.45);
    cC = $(".canvas-container");
    cC.css('width', $(window).width() * 0.8 + 'px');
    cC.css('height', $(window).width() * 0.45 + 'px');
    lC = $(".lower-canvas");
    lC.css('width', $(window).width() * 0.8 + 'px');
    lC.css('height', $(window).width() * 0.45 + 'px');
    lC.attr('width', $(window).width() * 0.8);
    lC.attr('height', $(window).width() * 0.45);
    uC = $(".upper-canvas");
    uC.css('width', $(window).width() * 0.8 + 'px');
    uC.css('height', $(window).width() * 0.45 + 'px');
    uC.attr('width', $(window).width() * 0.8);
    uC.attr('height', $(window).width() * 0.45);
}

// create a rectangle object
var rect = new fabric.Rect({
    left: 100,
    top: 50,
    fill: '#D81B60',
    width: 100,
    height: 100,
    strokeWidth: 2,
    stroke: "#880E4F",
    rx: 10,
    ry: 10,
    angle: 45,
    hasControls: true
});

canvas.add(rect);

// create a rectangle object
var rect2 = new fabric.Rect({
    left: 200,
    top: 50,
    fill: '#F06292',
    width: 100,
    height: 100,
    strokeWidth: 2,
    stroke: "#880E4F",
    rx: 10,
    ry: 10,
    angle: 45,
    hasControls: true
});

canvas.add(rect2);

var circle1 = new fabric.Circle({
    radius: 65,
    fill: '#039BE5',
    left: 0
});

var circle2 = new fabric.Circle({
    radius: 65,
    fill: '#4FC3F7',
    left: 110,
    opacity: 0.7
});

var group = new fabric.Group([circle1, circle2,], {
    left: 40,
    top: 250
});

canvas.add(group); 
