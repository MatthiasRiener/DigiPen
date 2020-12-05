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

    var vArr = [], struct = [];

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