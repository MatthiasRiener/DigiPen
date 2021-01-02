var canvas = this.__canvas = new fabric.Canvas('canvas', {
    hoverCursor: 'pointer',
    selection: true,
    selectionBorderColor: 'blue',
});


$(document).ready(function () {

    init();

});


$('#addObjectPopup-inner-popup-text').on('click', function () {
    addText();
});


function init() {
    canvas.setWidth($('#content-main-inner-spacing-middle').width());
    canvas.setHeight($('#content-main-inner-spacing-middle').height());

    canvas.on({
        
    })
}

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

    console.log("added element");
}





/*------------------------Helper Functions------------------------*/
function extend(obj, id) {
    obj.toObject = ((toObject) => {
        return function () {
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