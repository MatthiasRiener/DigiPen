// This is where all events are 

window.onload = function () {
    console.log('Document loaded.')
}

document.getElementById('upload').addEventListener('change', handleFileSelect, false);


var last = '';

$('.table-in').on('click', 'table td', function () {
    var y = $(this).data("y");


    if(last == 'X') {
        $(`.table-cell`).removeClass('active');
    }

    last = 'Y';

    if (!$(`.table-cell[data-y=${y}]`).hasClass('active')) {
        $(`.table-cell`).removeClass('active');
        $(`.table-cell[data-y=${y}]`).addClass('active');
    } else {
        $(`.table-cell[data-y=${y}]`).toggleClass('active');
    }

});


$('.table-in').on('click', 'table th', function () {
    var x = $(this).data("x");


    if(last == 'Y') {
        $(`.table-cell`).removeClass('active');
    }

    last = 'X';

    if (!$(`.table-cell[data-x=${x}]`).hasClass('active')) {
        $(`.table-cell`).removeClass('active');
        $(`.table-cell[data-x=${x}]`).addClass('active');
    } else {
        $(`.table-cell[data-x=${x}]`).toggleClass('active');
    }

});