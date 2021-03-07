function checkTaskInputs() {
    let returnValue = true;

    $('#taskPopup-top-left').css('border', 'none');
    $('#taskPopup-second-headline').css('color', '#383838');
    $('#currentUser').css("color", "#383838");
    $('#taskPopup-fifth-date-start').css('border-color', '#383838');
    $('#taskPopup-fifth-date-end').css('border-color', '#383838');

    if($('#currentPresentation').data('presentation') === "" || typeof $('#currentPresentation').data('presentation') === 'undefined') {
        $('#taskPopup-top-left').css('border', 'solid 2px red');
        returnValue =  false;
    }

    if($('#taskPopup-second-headline').text() === "" || typeof $('#taskPopup-second-headline').text() === 'undefined') {
        $('#taskPopup-second-headline').text("Taskname...");
        $('#taskPopup-second-headline').css('color', 'red');
        returnValue =  false;
    }

    if($('#currentUser').data('user') === "" || typeof $('#currentUser').data('user') === 'undefined') {
        $('#currentUser').css("color", "red");
        $('#taskPopup-fourth-left-image').css("background", "red");
        returnValue =  false;
    }

    if($('#taskPopup-fifth-date-start').val() === "" || typeof $('#taskPopup-fifth-date-start').val() === 'undefined') {
        $('#taskPopup-fifth-date-start').css('border', 'solid 2px red');
        returnValue =  false;
    }

    if($('#taskPopup-fifth-date-end').val() === "" || typeof $('#taskPopup-fifth-date-end').val() === 'undefined') {
        $('#taskPopup-fifth-date-end').css('border', 'solid 2px red');
        returnValue =  false;
    }

    // check if start date > end date
    if(Date.parse($('#taskPopup-fifth-date-start').val()) > Date.parse($('#taskPopup-fifth-date-end').val())) {
        $('#taskPopup-fifth-date-end').css('border', 'solid 2px red');
        returnValue =  false;
    }

    return returnValue;
}