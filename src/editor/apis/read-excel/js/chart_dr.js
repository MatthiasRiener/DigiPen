// chart config variables

var beginAtZero = true,
    c_color = $('#chart_color').val(),
    chart_type = $('#chart_type').val(),
    random_c_color = false;

const colorScheme = [
    "#25CCF7", "#FD7272", "#54a0ff", "#00d2d3",
    "#1abc9c", "#2ecc71", "#3498db", "#9b59b6", "#34495e",
    "#16a085", "#27ae60", "#2980b9", "#8e44ad", "#2c3e50",
    "#f1c40f", "#e67e22", "#e74c3c", "#ecf0f1", "#95a5a6",
    "#f39c12", "#d35400", "#c0392b", "#bdc3c7", "#7f8c8d",
    "#55efc4", "#81ecec", "#74b9ff", "#a29bfe", "#dfe6e9",
    "#00b894", "#00cec9", "#0984e3", "#6c5ce7", "#ffeaa7",
    "#fab1a0", "#ff7675", "#fd79a8", "#fdcb6e", "#e17055",
    "#d63031", "#feca57", "#5f27cd", "#54a0ff", "#01a3a4"
]

var ctx = document.getElementById('myChart').getContext('2d');


var options = {
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero: beginAtZero
            }
        }]
    }
};

var data_chart = {
    datasets: [{
        label: 'servus',
        backgroundColor: [],
        borderWidth: [0],
        data: chartData
    }]
};


var chart = new Chart(ctx, {
    type: chart_type,
    data: data_chart,
    options: options,
});

$('#start_zero').click(function () {
    beginAtZero = !beginAtZero;
    chart.options.scales.yAxes[0].ticks.beginAtZero = beginAtZero;
    chart.update();
});


$('#chart_color').change(function () {
    c_color = $('#chart_color').val();
    data_chart.datasets.forEach((dataset) => {
        dataset.data.forEach((el, i) => {
            dataset.backgroundColor[i] = c_color;
        })
    });

    chart.update();


    $('#random_c_chart').prop('checked', false);
    random_c_color = false;

});



$('#chart_type').change(function () {
    chart_type = $('#chart_type').val();
    chart.destroy();
    chart = new Chart(ctx, {
        type: chart_type,
        data: data_chart,
        options: options,
    });


})








$('#random_c_chart').click(function () {

    random_c_color = !random_c_color;

    if (random_c_color) {
        data_chart.datasets.forEach((dataset) => {
            dataset.data.forEach((el, i) => {
                dataset.backgroundColor[i] = colorScheme[Math.floor(Math.random() * colorScheme.length)];
            })
        });
    } else {
        c_color = $('#chart_color').val();
        data_chart.datasets.forEach((dataset) => {
            dataset.data.forEach((el, i) => {
                dataset.backgroundColor[i] = c_color;
            })
        });

    }

    chart.update();

});


function addData(label, data) {
    data_chart.labels.push(label);
    data_chart.datasets.forEach((dataset) => {
        dataset.data.push(data);
        dataset.label = label;
    });
    chart.update();
}

