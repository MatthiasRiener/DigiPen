var canvas = this.__canvas = new fabric.Canvas('canvas', {
    hoverCursor: 'pointer',
    selection: true,
    selectionBorderColor: 'blue',
});

var selected;

var props = {
    canvasFill: '#ffffff',
    canvasImage: '',
    id: null,
    opacity: null,
    fill: null,
    fontSize: null,
    lineHeight: null,
    charSpacing: null,
    fontWeight: null,
    fontStyle: null,
    textAlign: null,
    fontFamily: null,
    TextDecoration: ''
};


var figureEditor = false, textEditor = false;


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
        'object:moving': (e) => {},
        'object:modified': (e) => {},
        'selection:created': (e) => {
            const selectedObject = e.target;
            selected = selectedObject;
            selectedObject.hasRotationPoint = true;
            selectedObject.transparentCorners = false;
            selectedObject.cornerColor = 'rgba(255, 87, 34, 0.7)';

            resetPanels();

            if (selectedObject.type !== 'group' && selectedObject) {
                getId();
                getOpacity();
            }


            switch(selectedObject.type) {
                case 'rect':
                case 'circle':
                case 'triangle':
                  figureEditor = true;
                  getFill();
                  break;
                case 'i-text':
                    textEditor = true;
                    break;
            }
        },
        'selection:cleared': (e) => {
            selected = null;
            resetPanels();
        }
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


function resetPanels() {

}


function getId() {
    props.id = canvas.getActiveObject().toObject().id;
}



function getActiveStyle(styleName, object) {
    object = object || canvas.getActiveObject();

    if(!object) { return ''; }

    if(object.getSelectionStyles && object.isEditing) {
        return (object.getSelectionStyles()[styleName] || '');
    } else {
        return (object[styleName] || '');
    }
}


/*------------------------Styles Functions------------------------*/


function getOpacity() {
    props.opacity = getActiveStyle('opacity', null) * 100;
}


function getFill() {
    this.props.fill = this.getActiveStyle('fill', null);
}