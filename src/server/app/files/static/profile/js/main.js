$('.content-main-section').click(function() {
    var index = $(this).index();
    $('.content-container').removeClass("active");
    $('.content-container').eq(index).addClass("active");

    $('.content-main-section').removeClass("active-bar");
    $(this).addClass("active-bar");
})


// dropzone test

$('#content-bottom-left-right-card-inner-top').click(
    function () { $('#imgupload').trigger('click'); }
);

$('#imgupload').on('change', function(evt) {
    var files = evt.target.files;
    var reader = new FileReader();

    reader.onload = function(fileData) {
        var img = fileData.target.result;


        sendRequestToServer({type: "POST", url: "/profile/uploadImage", data: {"img": img, "name": files[0].name, "lm": files[0].lastModified}}).then(data => {
            $('#content-bottom-left-right-card-inner-top').css('background-image', 'url("' + data.res.img + '")');
            //$('#secppContainer').css('background-image', 'url("' + data.res.img + '")');
	        var sideBar = document.getElementById("sidebar-comp");
	        sideBar.userImg.style.backgroundImage = `url('${data.res.img}')`;
        })
    }
    

    reader.readAsDataURL(files[0])
})


// der ganze expand scheiß und so

// wenn ma auf eine präsi klcikt


$('.close-presentation-section').click(function() {
    toggleVisibility($('#unfinished-presentations-container'), $(this));
});

$('.close-task-section').click(function() {
    toggleVisibility($('.dashboard-tasks-section'), $(this));
});

$('body').on('click', '.dashboard-tasks-presentation-dropdown', function() {
    
    const rotation = $(this).css("transform");
    $(this).css("transform", `rotateX(${180 + $(this).css("transform")}deg)`);

    const parent = $(this).parent();
    if (parent.hasClass("dashboard-tasks-presentation-container")) {
        const closest = parent.next(".dashboard-tasks-container");
        toggleVisibility(closest, $(this));
    } else if(parent.hasClass("dashboard-task-item")) {
        const closest = parent.next(".subtask-container");
        toggleVisibility(closest, $(this));
    }
});

function toggleVisibility(element, icon) {
    if (element.is(":visible")) {
        element.css("display", "none");
        icon.css("transform", `rotateX(180deg)`);
    } else {
        element.css("display", "flex");
        icon.css("transform", `rotateX(0deg)`);
    }
}
