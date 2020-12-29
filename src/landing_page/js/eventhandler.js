// This is where all events are 

window.onload = function () {
    fillObjects();
    insertUsers();
    fillTemplates();
}

new fullpage('#fullpage', {
    
});

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

let users = [];
let index, picture;
const PICTURECOUNT = 16;

function insertUsers() {
    for(let i = 1; i <= 15; i++) {
        console.log(Math.ceil(i / 5) - 1);
        $('.flex-container').eq(Math.ceil(i / 5) - 1).append(`<div class="flex-item" style="background-image: url(img/users/user_${i}.png)"></div>`)
        users[i] = i;
    }
}

function updateUsers() {
    let counter = 0;
    do {
        index = Math.floor(Math.random() * users.length) + 1;
        picture = Math.floor(Math.random() * PICTURECOUNT) + 1;
        counter++;
        console.log("break: " + counter)
        if(counter == 200) {
            break;
        }
    } while(users.includes(picture));

    console.log("index:" + index);
    console.log("picture:" + picture);
    users[index] = picture;
    $(`.flex-item:eq(${index - 1})`).css('background-image', `url(img/users/user_${picture}.png)`);
}

setInterval(updateUsers, 3000);

function fillTemplates() {
    for (let i = 1; i <= 3; i++) {
        $('.grid-container').eq(0).append(`<div class="grid-templates" style="background-image: url(img/templates/template_${i}.png)"></div>`);
    }
}