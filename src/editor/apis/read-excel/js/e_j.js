var vArr = [];
var label = "";

var ExcelToJSON = function () {

    this.parseExcel = function (file) {
        var reader = new FileReader();

        reader.onload = function (e) {
            var data = e.target.result;
            var workbook = XLSX.read(data, {
                type: 'binary'
            });
            workbook.SheetNames.forEach(function (sheetName) {
                var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName], {
                    header: 1,
                    blankRows: true
                });
                var json_object = JSON.stringify(XL_row_object);
                createTableFromJson(JSON.parse(json_object));
            })
        };

        reader.onerror = function (ex) {
            console.log(ex);
        };

        reader.readAsBinaryString(file);
    };
};

function handleFileSelect(evt) {
    var files = evt.target.files;
    var xl2json = new ExcelToJSON();
    xl2json.parseExcel(files[0]);
}

function createTableFromJson(data) {

    var struct = [];

    data.forEach((row) => {
        for (const [key, _] of Object.entries(row)) {
            if (!struct.includes(key.toString())) {
                struct.push(key.toString());
            }
        }
    });


    vArr.push(struct);

    data.forEach((row) => {
        var dummyArr = [];
        for (const [key, value] of Object.entries(row)) {
            dummyArr[struct.indexOf(key.toString())] = value;
        }

        vArr.push(dummyArr);
    });


    for (let i = 0; i < vArr.length; i++) {
        for (let j = 0; j < struct.length; j++) {
            if (vArr[i][j] == undefined || vArr[i][j].isEmpty) {
                vArr[i][j] = '      ';
            }
        }
    }

    var table = document.createElement('table');
    var tableBody = document.createElement('tbody');


    vArr.shift();

    vArr.forEach(function (rowData, rowIndex) {
        var row = document.createElement('tr');
        rowData.forEach(function (cellData, x) {
            var cell = rowIndex == 0 ? document.createElement('th') : document.createElement('td');
            cell.appendChild(document.createTextNode(cellData));
            cell.classList += 'table-cell';
            cell.dataset.x = x;
            cell.dataset.y = rowIndex;
            row.appendChild(cell);
        });

        tableBody.appendChild(row);
    });

    table.appendChild(tableBody);

    document.getElementsByClassName('table-in')[0].appendChild(table);

}




var last = '';
var chartData = [];


$('.table-in').on('click', 'table td', function () {
    chartData.length = 0;


    var y = $(this).data("y");


    if (last == 'X') {
        $(`.table-cell`).removeClass('active');
    }

    last = 'Y';

    if (!$(`.table-cell[data-y=${y}]`).hasClass('active')) {
        $(`.table-cell`).removeClass('active');
        $(`.table-cell[data-y=${y}]`).addClass('active');
        chartData = vArr[y];
    } else {
        $(`.table-cell[data-y=${y}]`).toggleClass('active');
    }


    createDataArray();

});


$('.table-in').on('click', 'table th', function () {
    chartData.length = 0;
    var x = $(this).data("x");
    var y = $(this).data("y");



    if (last == 'Y') {
        $(`.table-cell`).removeClass('active');
    }

    last = 'X';

    if (!$(`.table-cell[data-x=${x}]`).hasClass('active')) {
        $(`.table-cell`).removeClass('active');
        $(`.table-cell[data-x=${x}]`).addClass('active');

        for (let i = 0; i < vArr.length; i++) {
            for (let j = 0; j < vArr[i].length; j++) {
                if (j == x) {
                    chartData.push(vArr[i][j]);
                }
            }
        }

    } else {
        $(`.table-cell[data-x=${x}]`).toggleClass('active');
    }

    createDataArray();


});


function createDataArray() {
    label = chartData.shift();
    chartData = chartData.filter(value => !isNaN(parseInt(value, 10))).map((i) => Number(i));

   if(chartData.length == 0) {
       
       chart.clear();
   }

    chart.data.datasets.forEach((dataset) => {
        dataset.data.length = 0;
    });


    chart.data.labels.length = 0;

    chartData.forEach((el) => {
        addData(label, el);
    });
}