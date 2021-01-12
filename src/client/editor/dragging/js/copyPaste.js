function Copy() {
    // clone what are you copying since you
    // may want copy and paste on different moment.
    // and you do not want the changes happened
    // later to reflect on the copy.
    canvas.getActiveObject().clone(function (cloned) {
        _clipboard = cloned;
    });
}

function Paste() {
    // clone again, so you can do multiple copies.
    _clipboard.clone(function (clonedObj) {
        canvas.discardActiveObject();
        clonedObj.set({
            left: clonedObj.left + 10,
            top: clonedObj.top + 10,
            evented: true,
        });
        if (clonedObj.type === 'activeSelection') {
            // active selection needs a reference to the canvas.
            clonedObj.canvas = canvas;
            clonedObj.forEachObject(function (obj) {
                canvas.add(obj);
            });
            // this should solve the unselectability
            clonedObj.setCoords();
        } else {
            canvas.add(clonedObj);
        }
        _clipboard.top += 10;
        _clipboard.left += 10;
        canvas.setActiveObject(clonedObj);
        canvas.requestRenderAll();
    });
}

function Remove() {
    canvas.getActiveObjects().forEach((obj) => {
        canvas.remove(obj)
    });
    canvas.discardActiveObject().renderAll()
}

$(document).keydown(function (e) {
    if (e.ctrlKey && e.keyCode === 67) {
        Copy();
    }
    if (e.ctrlKey && e.keyCode === 86) {
        Paste();
    }
    if (e.ctrlKey && e.keyCode === 88) {
        Copy();
        Remove();
    }
    if (e.keyCode === 46) {
        Remove();
    }
});