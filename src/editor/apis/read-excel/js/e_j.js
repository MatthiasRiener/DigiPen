var ExcelToJSON = function () {

    this.parseExcel = function (file) {
        var reader = new FileReader();

        reader.onload = function (e) {
            var data = e.target.result;
            var workbook = XLSX.read(data, {
                type: 'binary'
            });
            workbook.SheetNames.forEach(function (sheetName) {
                var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName], {header:1,  blankRows: true});
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

   console.log(data);

    var vArr = [];
    var struc = [];


    // insert header
    var maxLength = 0;
    data.forEach((row) => {
        for (const [key, value] of Object.entries(row)) {
            if(!struc.includes(key.toString())) {
                struc.push(key.toString());
            } 
        }

        if (maxLength < Object.entries(row).length) {
            maxLength = Object.entries(row).length;
        }
    });

    if (maxLength > struc.length) {
        console.log('Bitte geben Sie für alle Spalten eine Überschrift an.');
    }

    vArr.push(struc);

    data.forEach((row, rowIndex) => {
        var dummyArr = [];
        for (const [key, value] of Object.entries(row)) {
            dummyArr[struc.indexOf(key.toString())] = value;
        }

        vArr.push(dummyArr);
    });

    
    for(let i = 0; i < vArr.length; i++) {
        for(let j = 0; j < struc.length; j++) {
            if(vArr[i][j] == undefined) {
                vArr[i][j] = '      ';
            }
        }
    }




    var table = document.createElement('table');
    
    var tableBody = document.createElement('tbody');

   
    vArr.shift();

    vArr.forEach(function (rowData, rowIndex) {
        var row = document.createElement('tr');
        rowData.forEach(function (cellData) {
            var cell = rowIndex == 0 ? document.createElement('th') :document.createElement('td');
            cell.appendChild(document.createTextNode(cellData));
            row.appendChild(cell);
        });

        tableBody.appendChild(row);
    });

    table.appendChild(tableBody);

    document.getElementsByClassName('table-in')[0].appendChild(table);


}