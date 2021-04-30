
var curKeys = [];
let shortcuts = [];


$('body').keyup(function(event) {
    console.log(event.code + " was raised.")
    const index = curKeys.indexOf(event.code);
    if (index > -1) {
        curKeys.splice(index, 1);
    }
})


$('body').keydown(function (event) {
    
    var keycode = (event.keycode ? event.keycode : event.which);

    if (curKeys.includes(event.code)) {
        return;
    }
    

    curKeys.push(event.code);


    if (event.ctrlKey && event.code != "ControlLeft" && !curKeys.includes("ControlLeft")) {
        
        curKeys.push("ControlLeft");
    }

    if (event.shiftKey && event.code != "ShiftLeft" && !curKeys.includes("ShiftLeft")) {
      
        curKeys.push("ShiftLeft");
    }
    try {
        const [index, val] = Object.entries(shortcuts).find(([i, e]) => JSON.stringify(e.keys.sort()) === JSON.stringify(curKeys.sort()));
        if (val.params) {

            window[val.callback](val.params);
        } else {

            window[val.callback]();
        }
    } catch (e) {
        console.error("Keybinding was not found.")
    }

});


function addToShortcuts(keybindings) {
    console.log("SHORTCUTS");
    console.log(keybindings)

    keybindings.res.forEach((binding) => {
        console.log("ADDING SHORTCUT")
        console.log(binding)
        shortcuts.push(binding);
    })
}
