sendRequestToServer({ type: "GET", url: "/keybinding/getEasterEggs" }).then(data => {
    addToShortcuts(data);
});



function createSpaceInvader() {
    let script = document.createElement('script');
    script.src = 'http://localhost:5000/static/editor/js/SpaceInvader/ship/moveDiv.js';
    script.setAttribute('id', 'studentProjectScript');
    document.body.appendChild(script);
}