// This is where all events are 

window.onload = function () {
    fillObjects();
}


function fillObjects() {

    var objects = [{
        "radius": 25,
        "color": "#EB328D",
        "top": 5,
        "left": -19
    },
    {
        "radius": 22,
        "color": "#00B285",
        "top": -20,
        "left": -17
    },
    {
        "radius": 14,
        "color": "#F6D05A",
        "top": -25,
        "left": 1
    },
    {
        "radius": 16,
        "color": "#D2352F",
        "top": -14,
        "left": -14
    },
    {
        "radius": 19,
        "color": "#73E7E8",
        "top": -16,
        "left": 16
    },
    {
        "radius": 23,
        "color": "#4360E5",
        "top": -6,
        "left": 18
    },

    {
        "radius": 22,
        "color": "#7C18EA",
        "top": -2,
        "left": 10
    },
];

    var x1 = $('.header-section').width() / 4;
    var x2 = $('.header-section').width() - $('.header-section').width() / 4;
    var y1 = $('.header-section').position().top;
    var y2 = y1 + $('.header-section').height();


    objects.forEach((el) => {
        document.getElementsByClassName("header-section")[0].innerHTML +=
            `<div class="object-header" style="width:${el.radius}px;height:${el.radius}px; top:${el.top}vh;left:${el.left}vw; background:${el.color}"></div>`;
    })





    console.log(x1, x2, y1, y2)

}