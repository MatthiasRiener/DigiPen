// This is where all events are 

window.onload = function () {
    fillObjects();
}


function fillObjects() {

    var objects = [{
        "radius": 25,
        "color": "#EB328D",
        "top": 15,
        "left": 20
    },
    {
        "radius": 22,
        "color": "#00B285",
        "top": 20,
        "left": 67
    },
    {
        "radius": 14,
        "color": "#F6D05A",
        "top": 30,
        "left": 25
    },
    {
        "radius": 16,
        "color": "#D2352F",
        "top": 50,
        "left": 20
    },
    {
        "radius": 19,
        "color": "#73E7E8",
        "top": 30,
        "left": 65
    },
    {
        "radius": 23,
        "color": "#4360E5",
        "top": 42,
        "left": 76
    },

    {
        "radius": 22,
        "color": "#7C18EA",
        "top": 40,
        "left": 30
    },
];




    objects.forEach((el) => {
        document.getElementsByClassName("header-section")[0].innerHTML +=
            `<div class="object-header" style="width:${el.radius}px;height:${el.radius}px; top:${el.top}vh;left:${el.left}vw; background:${el.color}"></div>`;
    })



}