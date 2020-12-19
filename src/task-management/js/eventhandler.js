// This is where all events are 

window.onload = function () {
    console.log('Document loaded.')
    loadCalendar()
    insertProfileImages()

    var start = new Date();
    var end = new Date();
    end.setDate(start.getDate() + 5);

    calculateTaskWidth(start, end);
}


$('#change-visibility').click(function () {
    $('.visibility-popup').toggleClass("visibility-class")
});


function loadCalendar() {
    let now = new Date()
    now.setDate(now.getDate() - 5)

   

    for (let i = 1; i <= 18; i++) {
        let newDate = new Date(now.setDate(now.getDate() + 1));
        $('.calendar-row').append(`<div class="calendar-day" data-date="${newDate}" ><p>${newDate.getDate()}</p></div>`)
    }

  
}

function insertProfileImages() {
    $('.profile-images').each(function (index, obj) {
        const number = randomNumber(2, 5);
        console.log(number)
        for (let i = 0; i < number; i++) {
            $('.profile-images').eq(index).append(`<div style="margin-left: -0.4vw; z-index: ${number - i}; background-image: url(../img/user_${randomNumber(1,14)}.png)" class="user"></div>`)
        }
    });
}

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}



function calculateTaskWidth(start, end) {
    // Calculate Width of Single Container (Day)
    var distance = $('.calendar-day').width();
    var startPos = $(`.calendar-day[data-date='${start}']`).offset().left - $(`.calendar-row`).offset().left;

    var diff = dateDiffInDays(start, end)


    $('.task-row').eq(0).append(`<div class="task-item" style="width:${distance * diff}px; left: ${startPos}px"></div>`)


    console.log(diff)

}

const _MS_PER_DAY = 1000 * 60 * 60 * 24;

// a and b are javascript Date objects
function dateDiffInDays(a, b) {
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}