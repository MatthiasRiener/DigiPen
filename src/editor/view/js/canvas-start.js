var canvas = this.__canvas = new fabric.Canvas('c');


$(document).ready(function() {
    console.log("moin meister");
});


$('#addObjectPopup-inner-popup-text').on('click', function() {
    addText();
});

function addText() {
    const text = new fabric.IText('hallo', {
        left: 10,
        top: 10,
        fontFamily: 'helvetica',
        angle: 0,
        fill: '#000000',
        scaleX: 0.5,
        scaleY: 0.5,
        fontWeight: '',
        hasRotationPoint: true,
    });

    extend(text, randomId());
    canvas.add(text);
    selectItemAfterAdded(text);
}



  /*------------------------Helper Functions------------------------*/
function extend(obj, id) {
    fabric.toObject((toObject) => {
        return function() {
            return fabric.util.object.extend(toObject.call(this), {
                id
            });
        };
    })(obj.toObject);
}

function selectItemAfterAdded(obj) {
    canvas.discardActiveObject().renderAll();
    canvas.setActiveObject(obj);
}

function randomId() {
    return Math.floor(Math.random() * 999999) + 1;
}