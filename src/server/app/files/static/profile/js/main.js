$('body').on('click', '.pp_bt_logo_click', function () {
    window.location = "../../../src/landing_page/index.html"
})

$('body').on('click', '.Task', function () {
    window.location = "../../../src/task-management/index.html"
})


// dropzone test


$('#ppContainer').click(
    function () { $('#imgupload').trigger('click'); }
);


$('#imgupload').on('change', function(evt) {
    console.log(evt)
    var files = evt.target.files;
    var reader = new FileReader();

    reader.onload = function(fileData) {
        var img = fileData.target.result;
        console.log("IMG")
        console.log(files[0])

        sendRequestToServer({type: "POST", url: "/profile/uploadImage", data: {"img": img, "name": files[0].name, "lm": files[0].lastModified}}).then(data => {
            console.log("IMAGE WAS UPLOADED TO THE SERVER!");
            $('#ppContainer').css('background-image', 'url("' + data.res.img + '")');
        })
    }
    

    reader.readAsDataURL(files[0])
})

/*
    sendRequestToServer({
        type: "POST",
        url: "/profile/uploadImage",
        data: {"img": data}
    }).then(data => {
        console.log("IMAGE WAS UPLOADED TO THE SERVER")
    })
})

*/