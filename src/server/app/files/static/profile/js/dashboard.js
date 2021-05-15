$(document).ready(function () {
    getPresentations();
    getTasks();
});

function getPresentations() {
    sendRequestToServer({
        type: "GET",
        url: "/dashboard/getOwnPresentations"
    }).then(data => {
    
        console.log("Meine Presentationen")
        console.log(data);
        
        var canvas = new fabric.Canvas();
        canvas.enableGLFiltering = false;
    
        //canvas.setWidth($('#invisibleCanvas').width());
        //canvas.setHeight($('#invisibleCanvas').height());
    
        data.res.forEach(presentation => {
            if (presentation.canvas[0] == null || presentation.canvas[0] == undefined || presentation.canvas.length == 0) {
                return;
            }
    
    
            canvas.clear();
    
            canvas.setDimensions({width: 1920, height: 1080})
    
          
    
            canvas.loadFromJSON(presentation.canvas[0].canvas, function () {
                canvas.renderAll();
    
                imgageTest = canvas.toDataURL({
                    format: 'png',
                    quality: 0.8
                })
    
                $('#unfinished-presentations-container').append(`
                <div class="unfinished-presentation" data-presentation="${presentation._id}">
                    <div class="unfinished-presentation-img" style="background: url('${imgageTest}'); background-size: cover; background-position: center; background-repeat: no-repeat"></div>
                    <p class="unfinished-presentation-name">${presentation.name}</p>
                </div>
            `);
    
    
            }, function (o, object) {
            })
        });
    });
}

$('body').on('click', '.unfinished-presentation', function () {
    setCustomStorage("p_id", $(this).data("presentation"));
    window.location.href = baseURL + "/editor";
})


function getTasks() {
    
}