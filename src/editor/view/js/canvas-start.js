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


var figureEditor = false;


$(document).ready(function () {

    init();

});

var counter = 0;
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


            switch (selectedObject.type) {
                case 'rect':
                case 'circle':
                case 'triangle':
                    figureEditor = true;
                    getFill();
                    break;
                case 'i-text':
                    textEditor['visible'] = true;
                    getLineHeight();
                    getCharSpacing();
                    getBold();
                    getFill();
                    getTextDecoration();
                    getTextAlign();
                    getFontFamily();
                    break;

                case 'image':
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

}


/*------------------------Events------------------------*/

$('body').on('input', '.fill-color-picker', function () {
    props.fill = $(this).val();
    setFill();
});


$('body').keydown(function (event) {
    var keycode = (event.keycode ? event.keycode : event.which);
    console.log(keycode);
    // delete key pressed => delete selected objects
    if (keycode === 46) {
        removeSelected();
    }
})

/*------------------------Helper Functions------------------------*/


function removeSelected() {
    const activeObject = canvas.getActiveObject();
    const activeGroup = canvas.getActiveObjects();

    console.log(activeObject, activeGroup);

    if (activeObject) {
        canvas.remove(activeObject);
    }
    
    if (Array.isArray(activeGroup)) {
        canvas.discardActiveObject();
        const self = this;
        activeGroup.forEach((object) => {
            self.canvas.remove(object);
        });
    }
}

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
    textEditor['visible'] = false;
}


function getId() {
    props.id = canvas.getActiveObject().toObject().id;
}



function getActiveStyle(styleName, object) {
    object = object || canvas.getActiveObject();

    if (!object) {
        return '';
    }

    if (object.getSelectionStyles && object.isEditing) {
        return (object.getSelectionStyles()[styleName] || '');
    } else {
        return (object[styleName] || '');
    }
}

function setActiveStyle(styleName, value, object) {
    object = object || this.canvas.getActiveObject();
    console.log(this.canvas.getActiveObject());
    if (!object) {
        return;
    }

    if (object.setSelectionStyles && object.isEditing) {
        const style = {};
        style[styleName] = value;

        if (typeof value === 'string') {
            if (value.includes('underline')) {
                object.setSelectionStyles({
                    underline: true
                });
            } else {
                object.setSelectionStyles({
                    underline: false
                });
            }

            if (value.includes('overline')) {
                object.setSelectionStyles({
                    overline: true
                });
            } else {
                object.setSelectionStyles({
                    overline: false
                });
            }

            if (value.includes('line-through')) {
                object.setSelectionStyles({
                    linethrough: true
                });
            } else {
                object.setSelectionStyles({
                    linethrough: false
                });
            }
        }

        object.setSelectionStyles(style);
        object.setCoords();

    } else {
        if (typeof value === 'string') {
            if (value.includes('underline')) {
                object.set('underline', true);
            } else {
                object.set('underline', false);
            }

            if (value.includes('overline')) {
                object.set('overline', true);
            } else {
                object.set('overline', false);
            }

            if (value.includes('line-through')) {
                object.set('linethrough', true);
            } else {
                object.set('linethrough', false);
            }
        }

        object.set(styleName, value);
    }
    object.setCoords();
    canvas.renderAll();

}


/*------------------------Styles Functions------------------------*/


function getOpacity() {
    props.opacity = getActiveStyle('opacity', null) * 100;
}


function getFill() {
    props.fill = getActiveStyle('fill', null);
    $('.fill-color-picker').val(props.fill);
}

function setFill() {
    setActiveStyle('fill', props.fill, null);
}

function getLineHeight() {
    props.lineHeight = getActiveStyle('lineHeight', null);
}

function getCharSpacing() {
    props.charSpacing = getActiveStyle('charSpacing', null);
}

function getFontSize() {
    props.fontSize = getActiveStyle('fontSize', null);
}

function getBold() {
    props.fontWeight = getActiveStyle('fontWeight', null);
}


function getTextDecoration() {
    props.TextDecoration = getActiveStyle('textDecoration', null);
}

function getTextAlign() {
    props.textAlign = getActiveProp('textAlign');
}

function getFontFamily() {
    props.fontFamily = getActiveProp('fontFamily');
}

function getActiveProp(name) {
    const object = canvas.getActiveObject();
    if (!object) {
        return '';
    }
    return object[name] || '';
}


/*------------------------Custom NGIF------------------------*/



var CustomNGIf = function (element, callback, propertyName) {
    var _value = null;

    // Create copies of elements do that you can store/use it in future 
    this.parent = element.parentNode;
    this.element = element;
    this.clone = null;

    // Create a property that is supposed to be watched
    Object.defineProperty(this, propertyName, {
        get: function () {
            return _value;
        },
        set: function (value) {
            // If same value is passed, do nothing.
            if (_value === value) return;
            _value = !!value;
            this.handleChange(_value);
        }
    });

    this.handleChange = function (value) {
        this.clone = this.element.cloneNode(true);
        if (_value) {
            var index = Array.from(this.parent.children).indexOf(this.element);

            // Check if element is already existing or not.
            // This can happen if some code breaks before deleting node.
            if (index >= 0) return;
            this.element = this.clone.cloneNode(true);
            this.parent.appendChild(this.element);
        } else {
            this.element.remove();
        }

        // For any special handling
        callback && callback();
    }
}



/*------------------------EDITOR-WINDOWS------------------------*/


var textEditorContainer = document.getElementById('text-editor');
var textEditor = new CustomNGIf(textEditorContainer, function () {
    console.log('textEditor visible');
}, 'visible');

textEditor['visible'] = false;