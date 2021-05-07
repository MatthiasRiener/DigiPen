let sprite;
let i = 1;

function openNav() {
    document.getElementById("myNav").style.height = "100%";
    closeNavHow();
    closeNavWhat();
}

function closeNav(navigateTo) {
    document.getElementById("myNav").style.height = "0%";
    if (navigateTo != null) {
        if (navigateTo == 'how') openNavHow();
        if (navigateTo == 'what') openNavWhat();
    }
}

document.getElementById('onWhat').addEventListener('click', openNavWhat);

function openNavWhat() {
    document.getElementById("mySidenav2").style.width = "20vw";
    closeNavHow();
}

function closeNavWhat() {
    document.getElementById("mySidenav2").style.width = "0";
}


document.getElementById('onHow').addEventListener('click', openNavHow);

function openNavHow() {
    closeNavWhat();
    document.getElementById("mySidenav").style.width = "20vw";
}

function closeNavHow() {
    document.getElementById("mySidenav").style.width = "0";
}