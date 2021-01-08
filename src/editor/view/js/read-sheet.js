var key = sheets.key;
var spreadsheet = "https://docs.google.com/spreadsheets/d/1hjaYOPUw23k8dSi4Kakn15pTfV1X9owmOXfZUSpBqGA/edit?usp=sharing", spreadsheet_id;
let sheets_doc;

$('#spreadsheet-link').change(function() {
    console.log($(this).val());
});
