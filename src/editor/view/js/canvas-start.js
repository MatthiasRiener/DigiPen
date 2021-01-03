var canvas = this.__canvas = new fabric.Canvas('canvas', {
    hoverCursor: 'pointer',
    selection: true,
    selectionBorderColor: 'blue',
});

let shortcuts = [];

var selected;
var canDeleteText = true;

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

    initializeShortcuts();


    canvas.setWidth($('#content-main-inner-spacing-middle').width());
    canvas.setHeight($('#content-main-inner-spacing-middle').height());

    canvas.on({
        'object:moving': (e) => {},
        'object:modified': (e) => {
            const selectedObject = e.target;
            // don't allow delete inside text

            switch (selectedObject.type) {
                case 'i-text':
                    canDeleteText = !canDeleteText;
                    break;
            }
        },
        'selection:created': (e) => {
            const selectedObject = e.target;
            selected = selectedObject;
            selectedObject.hasRotationPoint = true;
            selectedObject.transparentCorners = false;
            selectedObject.cornerColor = 'rgba(255, 87, 34, 0.7)';

            resetPanels();

            if (selectedObject.type !== 'group' && selectedObject) {
                getId();
            }

            console.log(selectedObject.type);


            switch (selectedObject.type) {
                case 'rect':
                case 'circle':
                case 'triangle':
                    figureEditor = true;
                    getFill();
                    break;
                case 'textbox':
                    textEditor['visible'] = true;
                    getOpacity();
                    getLineHeight();
                    getCharSpacing();
                    getBold();
                    getFill();
                    getTextDecoration();
                    getTextAlign();
                    getFontFamily();
                    getFontSize();
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
    const text = new fabric.Textbox('hallo', {
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
    var curKeys = [];
    var keycode = (event.keycode ? event.keycode : event.which);

    curKeys.push(event.code);
    if (event.ctrlKey && event.code != "ControlLeft") {
        curKeys.push("ControlLeft");
    }

    try {
        const [index, val] = Object.entries(shortcuts).find(([i, e]) => JSON.stringify(e.keys.sort()) === JSON.stringify(curKeys.sort()));
        window[val.callback]();
    } catch(e) {
       
    }
   

    curKeys = [];
});


$('body').on('input', '.text-opacity-slider', function () {
    props.opacity = $(this).val();
    setOpacity();
});

$('body').on('change', '.text-font-family', function () {
    props.fontFamily = $(this).val();
    setFontFamily();
});


$('body').on('input', '.font-size-text', function () {
    props.fontSize = $(this).val();
    setFontSize();
});


$('body').on('change', '.text-isbold', function () {
    props.fontWeight = !props.fontWeight;
    console.log(props.fontWeight)
    setBold();
});

$('body').on('click', '.text-centerYX', function () {
    centerObj();
});


$('body').on('input', '.text-char-spacing', function () {
    props.charSpacing = $(this).val();
    setCharSpacing();
});

$('body').on('input', '.text-line-height', function() {
    props.lineHeight = $(this).val();
    setLineHeight();
});


$('body').on('click', '.btn-text-style', function() {
    var val = $(this).data("val");
    console.log(val)
   setTextDecoration(val);
});


$('body').on('click', '.btn-text-align', function() {
    var val = $(this).data("val");
    setTextAlign(val);
});



/*--------Canvas-------- */

$('body').on('input', '.canvas-fill-color', function () {
    props.canvasFill = $(this).val();
    setCanvasFill();
});

/*------------------------Helper Functions------------------------*/

function initializeShortcuts() {
    $.getJSON("js/shortcuts.json", function (data) {
        shortcuts = [...data];
    });
}

function removeSelected() {
    const activeObject = canvas.getActiveObject();
    const activeGroup = canvas.getActiveObjects();

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
    canvas.discardActiveObject();
    canvas.setActiveObject(obj);
    canvas.renderAll();
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

function setActiveProp(name, value) {
    const object = canvas.getActiveObject();
    if (!object) {
        return '';
    }
    object.set(name, value).setCoords();
    canvas.renderAll();
}

function getActiveProp(name) {
    const object = canvas.getActiveObject();
    if (!object) {
        return '';
    }
    return object[name] || '';
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


function centerObj() {
    const obj = canvas.getActiveObject();
    obj.animate('left', canvas.width / 2, {
        duration: 400,
        onChange: canvas.renderAll.bind(canvas),
        easing: fabric.util.ease['easeInQuint'],
    });

    obj.animate('top', canvas.height / 2, {
        duration: 400,
        onChange: canvas.renderAll.bind(canvas),
        easing: fabric.util.ease['easeInQuint'],
    });
}

function getOpacity() {
    props.opacity = getActiveStyle('opacity', null) * 100;
    document.getElementsByClassName('text-opacity-slider')[0].value = props.opacity;

}

function setOpacity() {
    setActiveStyle('opacity', parseInt(props.opacity, 10) / 100, null);
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
    document.getElementsByClassName('text-line-height')[0].value = props.lineHeight;
}

function setLineHeight() {
    setActiveStyle('lineHeight', parseFloat(props.lineHeight), null);    
}

function getCharSpacing() {
    props.charSpacing = getActiveStyle('charSpacing', null);
    $('.text-char-spacing').val(props.charSpacing);
}

function setCharSpacing() {
    setActiveStyle('charSpacing', parseInt(props.charSpacing, 10), null);
}

function getFontSize() {
    props.fontSize = getActiveStyle('fontSize', null);
    $('.font-size-text').val(props.fontSize);
}


function setFontSize() {
    setActiveStyle('fontSize', parseInt(props.fontSize, 10), null);
}


function getBold() {
    props.fontWeight = getActiveStyle('fontWeight', null);
    $('.text-isbold').prop('checked', props.fontWeight);
}

function setBold() {
    setActiveStyle('fontWeight', props.fontWeight ? 'bold' : '', null);
}

function getTextDecoration() {
    props.TextDecoration = getActiveStyle('textDecoration', null);
}

function setTextDecoration(value) {
    let iclass = props.TextDecoration;
    if (iclass.includes(value)) {
      iclass = iclass.replace(RegExp(value, 'g'), '');
    } else {
      iclass += ` ${value}`;
    }
    props.TextDecoration = iclass;
    setActiveStyle('textDecoration', props.TextDecoration, null);
}

function getTextAlign() {
    props.textAlign = getActiveProp('textAlign');
}

function setTextAlign(value) {
    props.textAlign = value;
    setActiveProp('textAlign', props.textAlign);
}

function getFontFamily() {
    props.fontFamily = getActiveProp('fontFamily');
    $('.text-font-family').val(props.fontFamily);
}

function setFontFamily() {
    setActiveProp('fontFamily', props.fontFamily);
}

/*Canvas*/

function setCanvasFill() {
    if(!props.canvasImage) {
        canvas.backgroundColor = props.canvasFill;
        canvas.renderAll();
    }
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
var textEditor = new CustomNGIf(textEditorContainer, function () {}, 'visible');

textEditor['visible'] = false;