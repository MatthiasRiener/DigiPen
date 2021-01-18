// Fake horizontal scrolling with mouse wheel
var elem = document.getElementsByClassName('bigquizscrollbar')[0],
    width = parseInt(elem.offsetWidth, 10),
    cldWidth = parseInt(elem.children[0].offsetWidth, 10),
    distance = cldWidth - width,
    mean = 40, // Just for multiplier (go faster or slower)
    current = position = 0,
    maxscroll,
    oldPos;

elem.children[0].style.left = current + "px"; // Set default `left` value as `0` for initiation

var doScroll = function (e) {

    // cross-browser wheel delta
    e = window.event || e;
    var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));

    oldPos = position;
    position = position + (delta * mean);

    // Move element to the left or right by updating the `left` value
    maxscroll = -1 * ($(".bigquizes").eq(0).width() - $(".bigquizscrollbar").eq(0).width());
    if (position <= 0 && position >= maxscroll) {
        elem.children[0].style.left = position + 'px';
    } else {
        position = oldPos;
    }
    e.preventDefault();
};

if (elem.addEventListener) {
    elem.addEventListener("mousewheel", doScroll, false);
    elem.addEventListener("DOMMouseScroll", doScroll, false);
} else {
    elem.attachEvent("onmousewheel", doScroll);
}