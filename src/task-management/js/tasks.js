const tasks = [{
        id: "6123125",
        name: "Friesi und die ITP Gruppe",
        members: 4,
        taskColor: "#F02700",
        tasks: [{
                taskName: "Schaut Österreich wie ein Schnitzel aus?",
                start: "12/21/2020",
                end: "12/24/2020"
            },
            {
                taskName: "Sollte Südtirol zu Österreich gehören?",
                start: "12/22/2020",
                end: "12/27/2020"
            },

            {
                taskName: "Sollte Südtirol zu Österreich gehören?",
                start: "12/24/2020",
                end: "12/28/2020"
            },
        ]
    },

    {
        id: "432561123",
        name: "Austrian Government",
        members: 2,
        taskColor: "#079992",
        tasks: [{
                taskName: "How to eat Cookies with Heroin?",
                start: "12/17/2020",
                end: "12/20/2020"
            },
            {
                taskName: "How to eat Cookies with Crack?",
                start: "12/24/2020",
                end: "12/28/2020"
            }
        ]
    },
];



window.onload = function () {
    initializeContainers();
    loadCalendar()


    initializePresentationContainers();


    loadBackgroundGrid();
    positionCursor();

}

function initializePresentationContainers() {
    tasks.forEach((pres) => {
        $('.task-of-presentations').eq(0).append(`
         <div data-presentation-id="${pres.id}"  class="presentation-section">
             <div class="presentation-header">
                <p>${pres.name}</p>
                    <div class="profile-images"></div>

                 <div class="spacer-header"></div>
            </div>
        </div>
        `);


        initializeUsers(pres);
        calculateTasks(pres);
    });

}


function initializeUsers(pres) {
    for (let i = 0; i < pres.members; i++) {
        $(`.presentation-section[data-presentation-id=${pres.id}] .presentation-header .profile-images`).append(`<div style="margin-left: -0.4vw; z-index: ${pres.members - i}; background-image: url(../img/user_${randomNumber(1,14)}.png)" class="user"></div>`)
    }
}


function calculateTasks(pres) {
    let arr = [
        []
    ];

    pres.tasks.forEach((task) => {
        arr.forEach((curArray, index) => {

            var dummyArray = curArray.map(({taskName,...keep}) => {return {start: new Date(keep.start),end: new Date(keep.end)}});


            dummyArray.push({
                start: new Date(task.start),
                end: new Date(task.end)
            })
            var overflow = overlap(dummyArray)

            if (!overflow.overlap) {
                curArray.push(task);
            } else if (curArray.length - 1 == index) {
                arr.push([task]);
            }
        });
    });


    insertTasks(arr, pres);
}

function insertTasks(tasks, pres) {
    tasks.forEach((row, rIndex) => {
        $(`.presentation-section[data-presentation-id=${pres.id}]`).append(`<div class="task-row"></div>`);
        row.forEach((task) => {
            const distance = $('.calendar-day').width();
            const cWidth = $('.calendar-row-days').eq(0).width();
            const startPos = dateDiffInDays(new Date($('.calendar-day').eq(0).data("date")), new Date(task.start)) * distance;
            const diff = dateDiffInDays(new Date(task.start), new Date(task.end))
            $(`.presentation-section[data-presentation-id=${pres.id}] .task-row`).eq(rIndex).append(`<div class="task-item" style="background-color:${pres.taskColor};width:${(distance * diff) / cWidth * 100 - 0.2}%; left: ${startPos / cWidth * 100 + 0.2}%"><div class="user-task" style="background-image: url('../img/user_${randomNumber(1,14)}.png')"></div><p>${task.taskName}</p></div>`)
        });
    })
}

function positionCursor() {
    var now = new Date();
    var container = $('.calendar-row-days').find(`.calendar-day[data-date='${now}']`)
    var top = container.position().top;
    var left = container.position().left;


    $('.active-bar').css('top', `${top}px`)
    $('.active-bar').css('left', `${left}px`)

    $('.active-bar').height($('.task-of-presentations').height());

    $('.top-active').height(container.height());
    $('.top-active').width(container.width());

    $('.top-active p').html(now.getDate());


}

function initializeContainers() {
    $('.cur-workspace').width(`${$('.cur-workspace').height()}px`);
}


$('#change-visibility').click(function () {
    $('.visibility-popup').toggleClass("visibility-class")
});

function loadBackgroundGrid() {
    const distance = $('.calendar-day').width();
    const completeWidth = $('.calendar-row-days').eq(0).width();

    var gridWidth = distance / completeWidth * 100;
    $('.task-row').css("background-size", gridWidth + "% " + gridWidth + "%");
}


function loadCalendar() {
    let now = new Date()
    now.setDate(now.getDate() - 5)



    for (let i = 1; i <= 18; i++) {
        let newDate = new Date(now.setDate(now.getDate() + 1));
        $('.calendar-row-days').append(`<div class="calendar-day" data-date="${newDate}" ><p>${newDate.getDate()}</p></div>`)
    }


}



function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}






const _MS_PER_DAY = 1000 * 60 * 60 * 24;


function dateDiffInDays(a, b) {
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}