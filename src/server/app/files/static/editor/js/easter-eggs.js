sendRequestToServer({ type: "GET", url: "/keybinding/getEasterEggs" }).then(data => {
    addToShortcuts(data);
});



function createSpaceInvader() {
    alert("CUM WAS PRESSED")
}