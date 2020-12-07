var canvas = this.__canvas = new fabric.Canvas('c');




fabric.Object.prototype.transparentCorners = false;
fabric.Object.prototype.cornerColor = 'blue';
fabric.Object.prototype.cornerStyle = 'circle';


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
        cornerStyle: 'rect',
        cornerSize: 6.5,
        transparentCorners: false,
        cornerColor: '#aaaaff',
    });

    canvas.add(rect);
    canvas.setActiveObject(rect);
}

function renderIcon(icon) {
    return function renderIcon(ctx, left, top, styleOverride, fabricObject) {
        var size = this.cornerSize;
        ctx.save();
        ctx.translate(left, top);
        ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
        ctx.drawImage(icon, -size / 2, -size / 2, size, size);
        ctx.restore();
    }
}

fabric.Object.prototype.controls.deleteControl = new fabric.Control({
    x: 0.5,
    y: -0.5,
    offsetY: -16,
    offsetX: 16,
    cursorStyle: 'pointer',
    mouseUpHandler: deleteObject,
    render: renderIcon(deleteImg),
    cornerSize: 24
});

fabric.Object.prototype.controls.clone = new fabric.Control({
    x: -0.5,
    y: -0.5,
    offsetY: -16,
    offsetX: -16,
    cursorStyle: 'pointer',
    mouseUpHandler: cloneObject,
    render: renderIcon(cloneImg),
    cornerSize: 24
});

Add();

function deleteObject(eventData, target) {
    var canvas = target.canvas;
    canvas.remove(target);
    canvas.requestRenderAll();
}

function cloneObject(eventData, target) {
    var canvas = target.canvas;
    target.clone(function (cloned) {
        cloned.left += 10;
        cloned.top += 10;
        canvas.add(cloned);
    });
}

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

