// This is where all events are 

window.onload = function () {
    console.log('Document loaded.')
    loadCalendar()
    insertProfileImages()

    var start1 = new Date();
    var end1 = new Date();
    end1.setDate(start1.getDate() + 1);

    calculateTaskWidth(start1, end1, '30123414');

    var start2 = new Date();
    start2.setDate(start2.getDate() - 3);
    var end2 = new Date();
    end2.setDate(start2.getDate() + 4);

    calculateTaskWidth(start2, end2, '30123414');
}


$('#change-visibility').click(function () {
    $('.visibility-popup').toggleClass("visibility-class")
});


function loadCalendar() {
    let now = new Date()
    now.setDate(now.getDate() - 5)



    for (let i = 1; i <= 18; i++) {
        let newDate = new Date(now.setDate(now.getDate() + 1));
        $('.calendar-row-days').append(`<div class="calendar-day" data-date="${newDate}" ><p>${newDate.getDate()}</p></div>`)
    }


}

function insertProfileImages() {
    $('.profile-images').each(function (index, obj) {
        const number = randomNumber(2, 5);
        for (let i = 0; i < number; i++) {
            $('.profile-images').eq(index).append(`<div style="margin-left: -0.4vw; z-index: ${number - i}; background-image: url(../img/user_${randomNumber(1,14)}.png)" class="user"></div>`)
        }
    });
}

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
const presentations = {};



function calculateTaskWidth(start, end, id) {
    // Calculate Width of Single Container (Day)

    
    const distance = $('.calendar-day').width();
    const completeWidth = $('.calendar-row-days').eq(0).width();
    const startPos = dateDiffInDays(new Date($('.calendar-day').eq(0).data("date")), start) * distance;
    const diff = dateDiffInDays(start, end)


    if (presentations[id] == null || presentations[id] === undefined) {
        presentations[id] = [];

        presentations[id].push([{"start": start, "end": end}]);
    } else {
        console.log(elementOverlaps(presentations[id], {"start": start, "end": end}));
    }



    console.log(presentations)

    $('.task-row').eq(0).append(`<div class="task-item" style="width:${(distance * diff) / completeWidth * 100}%; left: ${startPos / completeWidth * 100}%"></div>`)


}


function elementOverlaps(pres, el) {
   return (pres, el)
}


const _MS_PER_DAY = 1000 * 60 * 60 * 24;


function dateDiffInDays(a, b) {
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}
