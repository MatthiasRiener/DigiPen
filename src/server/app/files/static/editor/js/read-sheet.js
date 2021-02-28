var key = sheets.key;
var spreadsheet = "https://docs.google.com/spreadsheets/d/1hjaYOPUw23k8dSi4Kakn15pTfV1X9owmOXfZUSpBqGA/edit?usp=sharing",
    spreadsheet_id;
let sheets_doc;


$('body').on('change', '#addObjectPopup-inner-chart-top-input-background-field', function () {
    var val = $(this).val();

    spreadsheet_id = spreadsheet.trim().split("/")[5];

    $.getJSON(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheet_id}/?key=${key}`, function (res) {
        console.log(res);    
         $('#addObjectPopup-inner-chart-bottom-header-headline').html(res.properties.title);
    });
});