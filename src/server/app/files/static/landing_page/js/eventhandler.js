// set width of slider-spacer



const containers = $('#work-with-right-section div');

containers.eq(0).append(`<img src="${baseURL}/static/landing_page/img/users/user_2.png" />`);
containers.eq(0).append(`<img src="https://images.unsplash.com/photo-1506863530036-1efeddceb993?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fHBvcnRyYWl0fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" />`);
containers.eq(0).append(`<img src="https://images.unsplash.com/photo-1504834636679-cd3acd047c06?ixid=MnwxMjA3fDB8MHxzZWFyY2h8ODN8fHBvcnRyYWl0fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" />`);

// 
containers.eq(1).append(`<img src="https://images.unsplash.com/photo-1499651681375-8afc5a4db253?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzJ8fHBvcnRyYWl0fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" />`);

containers.eq(1).append(`<img src="https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjZ8fHBvcnRyYWl0fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" />`);

containers.eq(1).append(`<img src="https://images.unsplash.com/photo-1520998116484-6eeb2f72b5b9?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDd8fHBvcnRyYWl0fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" />`);

containers.eq(2).append(`<img src="https://images.unsplash.com/photo-1541271696563-3be2f555fc4e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTA5fHxwb3J0cmFpdHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" />`);



// 


$('.slideshow-item').eq(0).css('background-image', `url("https://images.unsplash.com/photo-1620550580806-9426033a77a3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1001&q=80")`);

$('.slideshow-item').eq(1).css('background-image', `url("https://images.unsplash.com/photo-1423768164017-3f27c066407f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80")`)

$('.slideshow-item').eq(2).css('background-image', `url("https://images.unsplash.com/photo-1504309092620-4d0ec726efa4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80")`)




// slideshow stuff

var slideIndex = 0, maxSlides = $('.how-it-works-slider-item').length;

$('.slider-left').click(function () {
    goLeft();
});


$('.slider-right').click(function () {
    goRight();
});

function goLeft() {

    if (slideIndex > 0) {
        slideIndex--;
    } else {
        slideIndex = maxSlides - 1;
    }

    changeSlide();

}

function goRight() {
    if (slideIndex < maxSlides - 1) {
        slideIndex++;
    } else {
        slideIndex = 0;
    }

    changeSlide();

}


const slideArray = [
    {
        title: "Los geht's!",
        text: "Lade Discord herunter, wo immer du bist – auf deinen PC, Mac oder dein Smartphone. Einen Account zu erstellen, ist einfach. Du brauchst nur eine E-Mail und einen Namen. Sei du selbst und wähle deinen bevorzugten Nicknamen.",
    },
    {
        title: "Erstelle deine Präsentationen",
        text: "Dein Server ist ein Ort, den man nur mit Einladung betreten kann und an dem du dich mit deinen Communitys und Freunden unterhalten kannst. Unterteile deinen Server in verschiedene Textkanäle, in denen du über all die Dinge sprechen kannst, die du liebst.",
    },
    {
        title: "Rede drauflos",
        text: "Mach es dir in einem Sprachkanal gemütlich, wenn du Zeit hast, und Freunde können problemlos über Sprach- oder Videochat vorbeischauen.",
    },
    {
        title: "Hänge mit Freunden ab",
        text: "Mit unserer Videotechnologie kannst du deinen Bildschirm direkt für andere übertragen. Streame ein Spiel mit Freunden, zeig deine Kunst live oder stell dich einer Gruppe mit nur einem Klick vor.",
    },
    {
        title: "Organisiere deine Mitglieder",
        text: "Passe den Zugriff für Mitglieder mithilfe von Rollen an. So kannst du Moderatoren ernennen, Fans besondere Belohnungen geben oder Arbeitsgruppen erstellen, die du alle auf einmal anschreiben kannst.",
    },

];



$('#section-how-it-works').click(function (event) {
    console.log(event.target.classList)
    var windowWidth = window.innerWidth;
    var clickedPosX = event.clientX;

    if (event.target.classList.contains("slideshow-element")) {
        return;
    }

    if (clickedPosX <= windowWidth / 2) {
        goLeft();
    } else {
        goRight();
    }
});

function changeSlide() {
    console.log(slideIndex);

    $('.how-it-works-dot').removeClass("active-dot");
    $('.how-it-works-dot').eq(slideIndex).addClass("active-dot");
    $('#showing-feature-title').html(slideArray[slideIndex].title);
    $('#showing-feature-text').html(slideArray[slideIndex].text);

    var marginOfContainer = parseInt($('.how-it-works-slider-item').css("marginLeft").replace('px', ''));
    console.log(marginOfContainer)
    var distance = (-1) * slideIndex * ($('.how-it-works-slider-item').width() + 2 * marginOfContainer) / $(window).width() * 100;

    $('#how-it-works-slider').css("transform", `translateX(${distance}vw)`);

}


// event listeners

$('#top-bar-login').click(function() {
    window.location.href = "/authentication/login";
});


$('#top-bar-sign').click(function() {
    window.location.href = "/authentication/login";
})

$('#work-with-get-started').click(function() {
    window.location.href = "/authentication/login";
});

$('#get-started-button').click(function() {
    window.location.href = "/authentication/login";
});

$('#download-button').click(function() {
    window.location.href = "/authentication/login";
});

$('#work-with-watch-demo').click(function() {

    $('#video-section').css("display", "flex");
    document.getElementById('product-video').play();
});

$('#video-icon').click(function() {
    $('#video-section').css("display", "none");
    document.getElementById('product-video').pause();
    document.getElementById('product-video').currentTime = 0;
})


// scroll button


mybutton = document.getElementById("scroll-button");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () { scrollFunction() };

function scrollFunction() {
    if (window.scrollY > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}


mybutton.addEventListener('click', topFunction);

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}


$('#top-bar-subpoints p').click(function() {
    const el = $(this).index();
    $('#top-bar-subpoints p').removeClass("active");
    $('#top-bar-subpoints p').eq(el).addClass("active");
    console.log(el, "was clicked!")
});


$('#support-nav-point').click(() => {
    goToByScroll("map-section")
});


$('#pricing-nav-point').click(() => {
    goToByScroll("section-pricing")
});


$('#features-nav-point').click(() => {
    goToByScroll("section-special")
});


$('#customers-nav-point').click(() => {
    goToByScroll("section-customers")
});


function goToByScroll(id){
    // Reove "link" from the ID
    // Scroll
  $('html,body').animate({
      scrollTop: $("#" + id).offset().top - window.innerHeight / 100 * 5},
      'slow');
}