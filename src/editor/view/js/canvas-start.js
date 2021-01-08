var canvas = this.__canvas = new fabric.Canvas('canvas', {
    hoverCursor: 'pointer',
    selection: true,
    selectionBorderColor: 'blue',
});

canvas.enableGLFiltering = false;

let shortcuts = [];

var selected;
var canDeleteText = true;

var propsText = {
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

var propsImage = {
    // done
    strokeWidth: null,
    // done
    strokeColor: null,
    // done
    grayscale: {
        active: false,
        mode: null,
    },
    // done
    invert: false,
    // done
    sepia: false,
    // done
    black_white: false,
    // done
    brownie: false,

    // done
    vintage: false,
    // done
    kodachrome: false,
    // done
    technicolor: false,
    // done
    polaroid: false,
    // done
    remove_color: {
        active: false,
        color: null,
        distance: 0,
    },
    // done
    brightness: {
        active: false,
        val: null,
    },

    gamma: {
        active: false,
        red: null,
        green: null,
        blue: null,
    },
    contrast: {
        active: false,
        val: null,
    },
    saturation: {
        active: false,
        val: null,
    },
    hue: {
        active: false,
        val: null,
    },
    noise: {
        active: false,
        val: null,
    },
    pixelate: {
        active: false,
        val: null,
    },
    blur: {
        active: false,
        val: null,
    },
    sharpen: false,
    emboss: false,
    blend: {
        active: false,
        mode: null,
        color: null,
        alpha: null,
    },
    blend: {
        active: false,
        mode: null,
        alpha: null,
    }
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
            const id = getId();

            
            selected = selectedObject;
            selectedObject.hasRotationPoint = true;
            selectedObject.transparentCorners = false;
            selectedObject.cornerColor = 'rgba(255, 87, 34, 0.7)';

            resetPanels();

            if (selectedObject.type !== 'group' && selectedObject) {
                getId();
            }

       
            if(typeof id === 'string' && id.includes('chart')) {
                chartEditor['visible'] = true;
                return;
            }

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
                    imageEditor['visible'] = true;
                    break;
            }
        },
        'selection:cleared': (e) => {
            selected = null;
            resetPanels();
        }
    })
}



function addText(t) {
    const text = new fabric.Textbox(t == undefined ? 'hallo' : t, {
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

var chart;

function addChart() {
    var ctx = document.getElementById('chart-last-config').getContext('2d');
    chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [{
                label: 'My First dataset',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: [0, 10, 5, 2, 20, 30, 45]
            }]
        },

        // Configuration options go here
        options: {
            animation: {
                onComplete: chartLoaded
            }
        }
    });
}



function chartLoaded() {
    const data = chart.toBase64Image();
    addImage(data, true);
}

function addImage(customurl, isChart) {
    const url = customurl || "https://m.media-amazon.com/images/M/MV5BYjFkMTlkYWUtZWFhNy00M2FmLThiOTYtYTRiYjVlZWYxNmJkXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_.jpg";

    if (url) {
        const img = fabric.Image.fromURL(url, (image) => {
            image.set({
                left: 10,
                top: 10,
                angle: 0,
                padding: 10,
                cornerSize: 10,
                strokeWidth: 0,
                stroke: '#000000',
                hasRotationPoint: true,
            });
            image.scaleToWidth(200);
            image.scaleToHeight(200);
            extend(image, isChart ? `chart_${randomId()}` : randomId());
            canvas.add(image);
            selectItemAfterAdded(image);
        }, {
            crossOrigin: 'Anonymous'
        });


    }
}





/*------------------------Events------------------------*/

$('body').on('input', '.fill-color-picker', function () {
    propsText.fill = $(this).val();
    setFill();
});

var curKeys = [];

$('body').keydown(function (event) {
    curKeys = [];
    var keycode = (event.keycode ? event.keycode : event.which);
    curKeys.push(event.code);
    event.preventDefault();
    event.stopImmediatePropagation();

    if (event.ctrlKey && event.code != "ControlLeft") {
        curKeys.push("ControlLeft");
    }

    if (event.shiftKey && event.code != "ShiftLeft") {
        curKeys.push("ShiftLeft");
    }

    try {
        const [index, val] = Object.entries(shortcuts).find(([i, e]) => JSON.stringify(e.keys.sort()) === JSON.stringify(curKeys.sort()));
        if (val.params) {

            window[val.callback](val.params);
        } else {

            window[val.callback]();
        }
    } catch (e) {

    }


    curKeys = [];
    return false;
});


$('body').on('input', '.text-opacity-slider', function () {
    propsText.opacity = $(this).val();
    setOpacity();
});

$('body').on('change', '.text-font-family', function () {
    propsText.fontFamily = $(this).val();
    setFontFamily();
});


$('body').on('input', '.font-size-text', function () {
    propsText.fontSize = $(this).val();
    setFontSize();
});


$('body').on('change', '.text-isbold', function () {
    propsText.fontWeight = !propsText.fontWeight;
    console.log(propsText.fontWeight)
    setBold();
});

$('body').on('click', '.text-centerYX', function () {
    centerObj();
});


$('body').on('input', '.text-char-spacing', function () {
    propsText.charSpacing = $(this).val();
    setCharSpacing();
});

$('body').on('input', '.text-line-height', function () {
    propsText.lineHeight = $(this).val();
    setLineHeight();
});


$('body').on('click', '.btn-text-style', function () {
    var val = $(this).data("val");
    console.log(val)
    setTextDecoration(val);
});


$('body').on('click', '.btn-text-align', function () {
    var val = $(this).data("val");
    setTextAlign(val);
});



/*--------Canvas-------- */

$('body').on('input', '.canvas-fill-color', function () {
    propsText.canvasFill = $(this).val();
    setCanvasFill();
});


$('body').on('keypress', '.canvas-background-img', function (e) {
    if (e.which === 13) {
        propsText.canvasImage = $(this).val();
        setCanvasImage();
    }
})



$('body').on('click', '.btn-export-to-json', function () {
    saveCanvasToJson();
});



/*--------Image-------*/
$('body').on('input', '.img-stroke-width', function () {
    var val = $(this).val();
    propsImage.strokeWidth = val;
    setImgStrokeWidth();
});


$('body').on('input', '.img-stroke-color', function () {
    var val = $(this).val();
    propsImage.strokeColor = val;
    setImgStrokeColor();
});

$('body').on('click', '.img-invert-img', function () {
    propsImage.invert = !propsImage.invert;
    setImgInvert();
});

$('body').on('click', '.img-grayscale-img', function () {
    propsImage.grayscale.active = !propsImage.grayscale.active;
    setImgGrayScale();
});


$('body').on('click', '.img-avg-img', function () {
    propsImage.grayscale.avg = !propsImage.grayscale.avg;
    setFilterValue("grayscale", 'mode', 'average', propsImage.grayscale.avg);
});

$('body').on('change', '.img-grayscale-val', function () {
    var val = $(this).children("option:selected").val();

    if (val !== 'cancel') {
        propsImage.grayscale.mode = val;
        setFilterValue("grayscale", 'mode', val, 1, null);
    } else {
        propsImage.grayscale.mode = null;
        setFilterValue("grayscale", 'mode', val, 0, null);
    }
});



$('body').on('click', '.img-sepia-img', function () {
    propsImage.sepia = !propsImage.sepia;
    setImgSepia();
});


$('body').on('click', '.img-black_white-img', function () {
    propsImage.black_white = !propsImage.black_white;
    setBlackAndWhite();
});

$('body').on('click', '.img-brownie-img', function () {
    propsImage.brownie = !propsImage.brownie
    setImgBrownie();
});


$('body').on('click', '.img-vintage-img', function () {
    propsImage.vintage = !propsImage.vintage
    setImgVintage();
});

$('body').on('click', '.img-kodachrome-img', function () {
    propsImage.kodachrome = !propsImage.kodachrome
    setImgKodachrome();
});


$('body').on('click', '.img-technicolor-img', function () {
    propsImage.technicolor = !propsImage.technicolor
    setImgTechnicolor();
});

$('body').on('click', '.img-polaroid-img', function () {
    propsImage.polaroid = !propsImage.polaroid
    setImgPolaroid();
});


$('body').on('click', '.img-removeColor-img', function () {
    propsImage.remove_color.active = !propsImage.remove_color.active;
    propsImage.remove_color.distance = parseInt($('.img-removeColor-slider-img').val(), 10) / 100;
    propsImage.remove_color.color = $('.img-removeColor-color-img').val();
    console.log(propsImage.remove_color);
    setImgRemoveColor();
});

$('body').on('input', '.img-removeColor-slider-img', function () {
    propsImage.remove_color.distance = parseInt($('.img-removeColor-slider-img').val(), 10) / 100;
    setImgRemoveColor();
});


$('body').on('input', '.img-removeColor-color-img', function () {
    propsImage.remove_color.color = $('.img-removeColor-color-img').val();
    setImgRemoveColor();
});


$('body').on('click', '.img-brightness-img', function () {
    propsImage.brightness.active = !propsImage.brightness.active;

    propsImage.brightness.val = parseFloat($('.img-brightness-slider-img').val(), 10) / 100;
    setImgBrightness();
});


$('body').on('input', '.img-brightness-slider-img', function () {
    propsImage.brightness.val = parseFloat($(this).val(), 10) / 100;
    setFilterValue("brightness", 'brightness', propsImage.brightness.val, propsImage.brightness.active);
});


/*------------------------Helper Functions------------------------*/


function move(params) {
    var dir = params[0];
    var mode = params[1];

    console.log(dir, mode)

    var obj = canvas.getActiveObject();

    switch (dir) {
        case "left":
            obj.left = mode == "jump" ? obj.left - 10 : obj.left - 1;
            break;
        case "right":
            obj.left = mode == "jump" ? obj.left + 10 : obj.left + 1;
            break;

        case "up":
            obj.top = mode == "jump" ? obj.top - 10 : obj.top - 1;
            break;

        case "down":
            obj.top = mode == "jump" ? obj.top + 10 : obj.top + 1;
            break;
    }

    canvas.renderAll();

}


function saveCanvasToJson() {
    const json = canvas.toJSON();
}

function rasterizeSVG() {
    const w = window.open('')
    w.document.write(canvas.toSVG());
    return 'data:image/svg+xml;utf8,' + encodeURIComponent(canvas.toSVG());

}


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
    imageEditor['visible'] = false;
    chartEditor['visible'] = false;
}


function getId() {
    return propsText.id = canvas.getActiveObject().toObject().id;
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

function setActiveImgFilter(filterName, filter, operation, obj) {
    var index = Object.keys(propsImage).indexOf(filterName);

    if (index === -1) {
        console.log('kein Filter gefunden.');
    }


    var object = obj || canvas.getActiveObject();

    if (!operation) {
        object.filters.splice(index, 1);
    } else {
        object.filters[index] = filter;
    }

    object.applyFilters();
    canvas.renderAll();

}


function setFilterValue(index, prop, value, status, obj) {
    var obj = obj || canvas.getActiveObject();
    var index = Object.keys(propsImage).indexOf(index);
    console.log(index);

    obj.filters[index][prop] = null;

    if (status) {
        obj.filters[index][prop] = value;
    } else {
        delete obj.filters[index].mode;
    }

    obj.applyFilters();
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


async function paste() {
    var clipBoard;
    await navigator.clipboard.readText().then(text => {
        clipBoard = text;
    });
    var obj = canvas.getActiveObject() || clipBoard;
    console.log(canvas.getActiveObject());



    if (canvas.getActiveObject() != null) {
        const activeObject = canvas.getActiveObject();
        console.log(activeObject);

        if (activeObject) {
            let clone;
            switch (activeObject.type) {
                case 'rect':
                    clone = new fabric.Rect(activeObject.toObject());
                    break;
                case 'circle':
                    clone = new fabric.Circle(activeObject.toObject());
                    break;
                case 'triangle':
                    clone = new fabric.Triangle(activeObject.toObject());
                    break;
                case 'i-text':
                    clone = new fabric.IText('', activeObject.toObject());
                    break;
                case 'image':
                    clone = fabric.util.object.clone(activeObject);
                    break;
            }
            if (clone) {
                clone.set({
                    left: activeObject.left + 30,
                    top: activeObject.top + 30
                });
                this.canvas.add(clone);
                this.selectItemAfterAdded(clone);
            }
        }
        return;
    }

    var isImg = obj.match(/\.(jpeg|jpg|gif|png)$/) != null;

    console.log(canvas.getActiveObject());

    if (isImg) {
        console.log('link is a img');
    } else {
        // if link is not a image create new text

        addText(obj);
        console.log('link is not a img');
    }
    // show image popup

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
    propsText.opacity = getActiveStyle('opacity', null) * 100;
    document.getElementsByClassName('text-opacity-slider')[0].value = propsText.opacity;

}

function setOpacity() {
    setActiveStyle('opacity', parseInt(propsText.opacity, 10) / 100, null);
}

function getFill() {
    propsText.fill = getActiveStyle('fill', null);
    $('.fill-color-picker').val(propsText.fill);
}

function setFill() {
    setActiveStyle('fill', propsText.fill, null);
}

function getLineHeight() {
    propsText.lineHeight = getActiveStyle('lineHeight', null);
    document.getElementsByClassName('text-line-height')[0].value = propsText.lineHeight;
}

function setLineHeight() {
    setActiveStyle('lineHeight', parseFloat(propsText.lineHeight), null);
}

function getCharSpacing() {
    propsText.charSpacing = getActiveStyle('charSpacing', null);
    $('.text-char-spacing').val(propsText.charSpacing);
}

function setCharSpacing() {
    setActiveStyle('charSpacing', parseInt(propsText.charSpacing, 10), null);
}

function getFontSize() {
    propsText.fontSize = getActiveStyle('fontSize', null);
    $('.font-size-text').val(propsText.fontSize);
}


function setFontSize() {
    setActiveStyle('fontSize', parseInt(propsText.fontSize, 10), null);
}


function getBold() {
    propsText.fontWeight = getActiveStyle('fontWeight', null);
    $('.text-isbold').prop('checked', propsText.fontWeight);
}

function setBold() {
    setActiveStyle('fontWeight', propsText.fontWeight ? 'bold' : '', null);
}

function getTextDecoration() {
    propsText.TextDecoration = getActiveStyle('textDecoration', null);
}

function setTextDecoration(value) {
    let iclass = propsText.TextDecoration;
    if (iclass.includes(value)) {
        iclass = iclass.replace(RegExp(value, 'g'), '');
    } else {
        iclass += ` ${value}`;
    }
    propsText.TextDecoration = iclass;
    setActiveStyle('textDecoration', propsText.TextDecoration, null);
}

function getTextAlign() {
    propsText.textAlign = getActiveProp('textAlign');
}

function setTextAlign(value) {
    propsText.textAlign = value;
    setActiveProp('textAlign', propsText.textAlign);
}

function getFontFamily() {
    propsText.fontFamily = getActiveProp('fontFamily');
    $('.text-font-family').val(propsText.fontFamily);
}

function setFontFamily() {
    setActiveProp('fontFamily', propsText.fontFamily);
}

/*Canvas*/

function setCanvasFill() {
    if (!propsText.canvasImage) {
        canvas.backgroundColor = propsText.canvasFill;
        canvas.renderAll();
    }
}


function setCanvasImage() {
    if (propsText.canvasImage) {
        this.canvas.setBackgroundColor({
            source: propsText.canvasImage,
            repeat: 'repeat'
        }, function () {
            canvas.renderAll();
        })
    }
}


/* Image */

function setImgStrokeWidth() {
    setActiveStyle('strokeWidth', parseInt(propsImage.strokeWidth, 10), null);
}


function setImgStrokeColor() {
    setActiveStyle('stroke', propsImage.strokeColor, null);
}


function setImgInvert() {
    setActiveImgFilter("invert", new fabric.Image.filters.Invert(), propsImage.invert, null);
}

function setImgGrayScale() {
    setActiveImgFilter("grayscale", new fabric.Image.filters.Grayscale(), propsImage.grayscale.active, null);
}

function setImgSepia() {
    setActiveImgFilter("sepia", new fabric.Image.filters.Sepia(), propsImage.sepia, null);
}

function setBlackAndWhite() {
    setActiveImgFilter("black_white", new fabric.Image.filters.BlackWhite(), propsImage.black_white, null);
}

function setImgBrownie() {
    setActiveImgFilter("brownie", new fabric.Image.filters.Brownie(), propsImage.brownie, null);
}

function setImgVintage() {
    setActiveImgFilter("vintage", new fabric.Image.filters.Vintage(), propsImage.vintage, null);
}

function setImgKodachrome() {
    setActiveImgFilter("kodachrome", new fabric.Image.filters.Kodachrome(), propsImage.kodachrome, null);
}

function setImgTechnicolor() {
    setActiveImgFilter("technicolor", new fabric.Image.filters.Technicolor(), propsImage.technicolor, null);
}


function setImgPolaroid() {
    setActiveImgFilter("polaroid", new fabric.Image.filters.Polaroid(), propsImage.polaroid, null);
}


function setImgRemoveColor() {

    setActiveImgFilter("remove_color", new fabric.Image.filters.RemoveColor({
        distance: propsImage.remove_color.distance,
        color: propsImage.remove_color.color
    }), propsImage.remove_color.active);
}


function setImgBrightness() {
    setActiveImgFilter("brightness", new fabric.Image.filters.Brightness({
        brightness: propsImage.brightness.val
    }), propsImage.brightness.active);
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


var imageEditorContainer = document.getElementById('image-editor');
var imageEditor = new CustomNGIf(imageEditorContainer, function () {}, 'visible');

imageEditor['visible'] = false;


var chartEditorContainer = document.getElementById('chart-editor');
var chartEditor = new CustomNGIf(chartEditorContainer, function () {}, 'visible');

chartEditor['visible'] = false;