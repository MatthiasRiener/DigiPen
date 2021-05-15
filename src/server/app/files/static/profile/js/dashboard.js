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

        $('#presentationCount').text("(" + data.res.length + ")");
    });
}

$('body').on('click', '.unfinished-presentation', function () {
    setCustomStorage("p_id", $(this).data("presentation"));
    window.location.href = baseURL + "/editor";
})


function getTasks() {
    sendRequestToServer({
        type: "GET",
        url: "/profile/getUpComingTasks"
    }).then(data => {
        console.warn(data);

        for (const [key, value] of Object.entries(data.res)) {
            console.warn(key, value);
            const presentationSection = document.createElement("div");
            presentationSection.classList.add("dashboard-tasks-presentation-section");

            presentationSection.appendChild(appendHeader(value));
            presentationSection.appendChild(appendTasks(value));

            document.getElementsByClassName("dashboard-tasks-section")[0].appendChild(presentationSection);
        }

    });
}

function appendHeader(value) {
    const presentationSectionInfo = document.createElement("div");
    presentationSectionInfo.classList.add("dashboard-tasks-presentation-container");

    const presentationTitle = document.createElement("p");
    presentationTitle.classList.add("task-title");
    presentationTitle.innerText = value.pres_info.name;

    const presentationTaskCount = document.createElement("p");
    presentationTaskCount.classList.add("task-count");
    presentationTaskCount.innerText = value.tasks.length + " Tasks";

    presentationSectionInfo.appendChild(presentationTitle);
    presentationSectionInfo.appendChild(presentationTaskCount);
    presentationSectionInfo.innerHTML += `<ion-icon name="chevron-down" class="dashboard-tasks-presentation-dropdown"></ion-icon>`;

    return presentationSectionInfo;
}

function appendTasks(value) {
    const taskSection = document.createElement("div");
    taskSection.classList.add("dashboard-tasks-container");

    value.tasks.forEach(task => {
        const taskContainer = document.createElement("div");
        taskContainer.classList.add("task-container");

        const taskItem = document.createElement("div");
        taskItem.classList.add("dashboard-task-item");

        const taskItemTitle = document.createElement("p");
        taskItemTitle.classList.add("task-title");
        taskItemTitle.innerText = task.task.name;
    
        const taskItemTaskCount = document.createElement("p");
        taskItemTaskCount.classList.add("task-count");
        taskItemTaskCount.innerText = task.subtasks.length + " Subtasks";
    
        taskItem.appendChild(taskItemTitle);
        taskItem.appendChild(taskItemTaskCount);
        taskItem.innerHTML += `<ion-icon name="chevron-down" class="dashboard-tasks-presentation-dropdown"></ion-icon>`;

        taskContainer.appendChild(taskItem);
        taskContainer.appendChild(appendSubtasks(task));
        taskSection.appendChild(taskContainer);
    });

    return taskSection;
}

function appendSubtasks(value) {
    const subtaskContainer = document.createElement("div");
    subtaskContainer.classList.add("subtask-container");

    value.subtasks.forEach(subtask => {
        console.warn(subtask);
        const subtaskItem = document.createElement("div");
        subtaskItem.classList.add("dashboard-subtask-item");

        const subtaskTitle = document.createElement("p");
        subtaskTitle.classList.add("task-title");
        subtaskTitle.innerText = subtask.name;

        const subtaskStatus = document.createElement("div");
        subtaskStatus.classList.add("subtask-status");

        subtask.finished ? subtaskStatus.classList.add("subtask-finished") : subtaskStatus.classList.add("subtask-pending");

        subtaskItem.appendChild(subtaskTitle);
        subtaskItem.appendChild(subtaskStatus);
        subtaskContainer.appendChild(subtaskItem);
    });

    return subtaskContainer;
}