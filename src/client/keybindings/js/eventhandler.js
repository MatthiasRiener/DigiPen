// This is where all events are

let optionscount = 0,
    oldval,
    jsondata;
var infoOuter;
var info, oldInfo = null;

var lastEvent;
var heldKeys = {};

$.getJSON("ajax/shortcuts.json", function (data) {
    jsondata = data;
    data.forEach(element => {
        $("#bindings").append($("#template").html());
        $("#bindings .displayname").eq(optionscount).text(element.displayname);
        if (element.keys.length > 0) {
            $("#bindings .keybindinginput").eq(optionscount).text(element.keys[0]);
            if (element.keys.length > 1)
                $.each(element.keys, function (i, key) {
                    if (i > 0)
                        $("#bindings .keybindinginput").eq(optionscount).text($("#bindings .keybindinginput").eq(optionscount).text() + " + " + key);
                });
        } else
            $("#bindings .keybindinginput").eq(optionscount).css('background-color', 'rgba(100, 198, 237, 0.4)');

        $("#bindings .keybindinginput").eq(optionscount).on('focusin', function (e) {
            oldval = this.value;
            this.value = ""
            this.placeholder = "Press Any Key"
        });

        $("#bindings .keybindinginput").eq(optionscount).on('focusout', function (e) {
            if (this.value.trim().length == 0) {
                this.placeholder = "Empty"
                this.value = oldval
            }
        });

        $("#bindings .keybindinginput").eq(optionscount).click(function (event) {
            infoOuter = this;
            info = infoOuter.appendChild(document.createTextNode(''));
            this.style.backgroundColor = 'rgba(100, 198, 237, 1)';

            if (oldInfo != this && oldInfo != null) {
                oldInfo.style.backgroundColor = 'rgba(100, 198, 237, .7)';
            }
            oldInfo = this;
        });

        optionscount++;
    });
});

window.onkeydown = function (event) {
    if (lastEvent && lastEvent.keyCode == event.keyCode) {
        return;
    }

    lastEvent = event;
    heldKeys[event.keyCode] = true;
    info.data = JSON.stringify(heldKeys);
};

window.onkeyup = function (event) {
    lastEvent = null;
    delete heldKeys[event.keyCode];
    // info.data = JSON.stringify(heldKeys);
};