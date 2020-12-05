var key = sheets.key;
var spreadsheet = "https://docs.google.com/spreadsheets/d/1hjaYOPUw23k8dSi4Kakn15pTfV1X9owmOXfZUSpBqGA/edit?usp=sharing", spreadsheet_id;
let sheets_doc;

$('#spreadsheet-link').change(function () {
    spreadsheet_id = spreadsheet.trim().split("/")[5];
    console.log(spreadsheet_id);

    $.getJSON(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheet_id}/?key=${key}`, function (res) {
        console.log(res);
        console.log("================")
        console.log('Title:', res.properties.title)

         sheets_doc = res.sheets.map(el => {
            var obj = {};
            obj["title"] = el.properties.title;
            obj["row"] = el.properties.gridProperties.rowCount;
            obj["col"] = el.properties.gridProperties.columnCount;
            return obj;
        });

        console.log('Sheets:', sheets_doc);
        console.log("================")

    });
});


$('#sheet-title').change(function() {
    var sheet_title = $(this).val();
    $.getJSON(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheet_id}/values/${sheet_title}/?key=${key}`, function(res) {
        console.log(res);
        createTableFromJson(res.values);
    });
});