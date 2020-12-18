// This is where all events are 

window.onload = function () {
    console.log('Document loaded.')
    loadCalendar()
    insertProfileImages()
}


$('#change-visibility').click(function() {
    $('.visibility-popup').toggleClass("visibility-class")
});


function loadCalendar() {
    let now = new Date()
    now.setDate(now.getDate() - 5)
   
    $('.calendar-row').eq(0).append(` <div class="spacing-calendar">

    </div>`)

    for(let i = 1; i <= 18; i++) {
        let newDate = new Date(now.setDate(now.getDate() + 1));
        $('.calendar-row').append(`<div class="calendar-day"><p>${newDate.getDate()}</p></div>`)
    }

    $('.calendar-row').eq(0).append(` <div class="spacing-calendar">

    </div>`)
}

function insertProfileImages() {
    $('.profile-images').each(function(index, obj) {
        const number = randomNumber(2, 5);
        console.log(number)
        for(let i = 0; i < number; i++) {
            $('.profile-images').eq(index).append(`<div style="margin-left: -0.4vw; z-index: ${number - i}" class="user"></div>`)
        }
    });
}

function randomNumber(min, max) {
    return Math.floor(Math.random()*(max-min+1)+min)
}