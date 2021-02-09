let keywords = [];

$('#addkeyword').keypress(function (e) {
    if (e.which == 13 && !keywords.includes($('#addkeyword').val())) {
        keywords.push($('#addkeyword').val());
        $('.keywords').append('<span>' + $('#addkeyword').val() + '</span>');
        $('#addkeyword').val('');
    }
});

$('#submitcontrolls').click(function () {
    console.log(keywords);

    let presentation = {
        name: $('#template_title').text(),
        keywords: keywords
    }
});