// This is where all events are 

window.onload = function () {
    initializeContainers();
    loadCalendar()
    insertProfileImages()

    var start1 = new Date();
    var end1 = new Date();
    end1.setDate(start1.getDate() + 1);

    calculateTaskWidth(start1, end1, '30123414');

    var start2 = new Date();
    start2.setDate(start2.getDate() - 3);
    var end2 = new Date();
    end2.setDate(start2.getDate() + 5);

    calculateTaskWidth(start2, end2, '30123414');

    calculateTaskWidth(start2, end2, '3013414');


    loadBackgroundGrid();
    positionCursor();

}


function positionCursor() {
    var now = new Date();
    var container = $('.calendar-row-days').find(`.calendar-day[data-date='${now}']`)
    console.log(container.position().top)
    var top = container.position().top;
    var left = container.position().left;


    $('.active-bar').css('top', `${top}px`)
    $('.active-bar').css('left', `${left}px`)

    $('.active-bar').height($('.task-of-presentations').height());

    $('.top-active').height(container.height());
    $('.top-active').width(container.width());

    $('.top-active p').html(now.getDate());


    console.log(height)
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
    $('.task-row').css("background-size", gridWidth+"% " + gridWidth + "%");
}


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
const presentations = new Map();



function calculateTaskWidth(start, end, id) {
    // Calculate Width of Single Container (Day)
    start = new Date(start)
    end = new Date(end)

    const distance = $('.calendar-day').width();
    const completeWidth = $('.calendar-row-days').eq(0).width();
    const startPos = dateDiffInDays(new Date($('.calendar-day').eq(0).data("date")), start) * distance;
    const diff = dateDiffInDays(start, end)


    if (!presentations.has(id)) {
        presentations.set(id, []);

        presentations.get(id).push([{
            "start": start,
            "end": end
        }]);


        var index = [...presentations.keys()].indexOf(id);

        console.log("hallo", index, id, presentations)

        $('.presentation-section').eq(index).append(`<div class="task-row"></div>`);


        insertTask(index, 0, {
            distance: distance,
            diff: diff,
            cWidth: completeWidth,
            sPos: startPos
        })

    } else {
        // loop through each row
        presentations.get(id).forEach((row, index) => {
            var arr = [...row];
            arr.push({
                "start": start,
                "end": end
            });
            var overlaps = overlap(arr);
            var pres_index = [...presentations.keys()].indexOf(id);



            if (!overlaps.overlap) {
                insertTask(pres_index, index, {
                    distance: distance,
                    diff: diff,
                    cWidth: completeWidth,
                    sPos: startPos
                })
            } else if (presentations.get(id).length - 1 == index) {
                presentations.get(id).push([{
                    "start": start,
                    "end": end
                }]);
                console.log("creating new row.....");
                $('.presentation-section').eq(pres_index).append(`<div class="task-row"></div>`);
                insertTask(pres_index, index + 1, {
                    distance: distance,
                    diff: diff,
                    cWidth: completeWidth,
                    sPos: startPos
                })
            }

        });
    }



}

function insertTask(p_index, index, pos) {
    console.log(p_index, index)
    $('.presentation-section').eq(p_index).find('.task-row').eq(index).append(`<div class="task-item" style="width:${(pos.distance * pos.diff) / pos.cWidth * 100}%; left: ${pos.sPos / pos.cWidth * 100}%"><div class="user-task" style="background-image: url('../img/user_${randomNumber(1,14)}.png')"></div><p>Schaut Österreich wie ein Schnitzel aus?</div>`)
}



const _MS_PER_DAY = 1000 * 60 * 60 * 24;


function dateDiffInDays(a, b) {
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}