const containers = $('#work-with-right-section div');

containers.eq(0).append(`<img src="${baseURL}/static/landing_page/img/users/user_2.png" />`);
containers.eq(0).append(`<img src="https://images.unsplash.com/photo-1506863530036-1efeddceb993?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fHBvcnRyYWl0fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" />`);
containers.eq(0).append(`<img src="https://images.unsplash.com/photo-1504834636679-cd3acd047c06?ixid=MnwxMjA3fDB8MHxzZWFyY2h8ODN8fHBvcnRyYWl0fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" />`);

// 
containers.eq(1).append(`<img src="https://images.unsplash.com/photo-1499651681375-8afc5a4db253?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzJ8fHBvcnRyYWl0fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" />`);

containers.eq(1).append(`<img src="https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjZ8fHBvcnRyYWl0fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" />`);

containers.eq(1).append(`<img src="https://images.unsplash.com/photo-1520998116484-6eeb2f72b5b9?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDd8fHBvcnRyYWl0fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" />`);

containers.eq(2).append(`<img src="https://images.unsplash.com/photo-1541271696563-3be2f555fc4e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTA5fHxwb3J0cmFpdHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" />`);


console.log("was geht ab!")


const firstSection = document.getElementById('first-section-intro');

var mouse = {
    _x: 0,
    _y: 0,
    x: 0,
    y: 0,
    updatePosition: function (event) {
        var e = event || window.event;
        this.x = e.clientX - this._x;
        this.y = (e.clientY - this._y) * -1;
    },
    setOrigin: function (e) {
        this._x = e.offsetLeft + Math.floor(e.offsetWidth / 2);
        this._y = e.offsetTop + Math.floor(e.offsetHeight / 2);
    },
    show: function () {
        return "(" + this.x + ", " + this.y + ")";
    }
};


var onMouseEnterHandler = function (event) {
    if (isTimeToUpdate()) {
        update(event);
    }
};
var onMouseLeaveHandler = function () {
    stopUpdating();
};
var onMouseMoveHandler = function (event) {
    if (isTimeToUpdate()) {
        update(event);
    }
};

var counter = 0;
var updateRate = 10;
var isTimeToUpdate = function () {
    return counter++ % updateRate === 0;
};


var update = function (event) {
    mouse.updatePosition(event);

    var companies = document.getElementById('first-section-intro').querySelectorAll(".company-element");
    companies.forEach((c) => {
        updateTransformStyle(
            (mouse.y / c.offsetHeight / 2).toFixed(2),
            (mouse.x / c.offsetWidth / 2).toFixed(2),
            c
        );
    })
};

var updateTransformStyle = function (x, y, company) {
    var style = "rotateX(" + x * 15 + "deg) rotateY(" + y * 15 + "deg)";
    company.style.transform = style;
};

function stopUpdating() {
    var companies = document.getElementById('first-section-intro').querySelectorAll(".company-element");
    companies.forEach((c) => {
        var style = "rotateX(" + 0 + "deg) rotateY(" + 0 + "deg)";
        c.style.transform = style;
    })
}

mouse.setOrigin(firstSection);

firstSection.onmouseenter = onMouseEnterHandler;
firstSection.onmouseleave = onMouseLeaveHandler;
firstSection.onmousemove = onMouseMoveHandler;




const SMALL_DEVICE = 1050;

$(document).ready(function () {
    var width = $(window).width();

    if (width < SMALL_DEVICE) {
        $('.company-element').css("visibility", "hidden");
    } else {
        $('.company-element').css("visibility", "visible");
    }
})

$(window).resize(function () {
    var width = $(window).width();

    if (width < SMALL_DEVICE) {
        $('.company-element').css("visibility", "hidden");
    } else {
        $('.company-element').css("visibility", "visible");
    }
})



$('.faq_question').click(function () {

    if ($(this).parent().is('.open')) {
        $(this).closest('.faq').find('.faq_answer_container').slideUp();
        $(this).closest('.faq').removeClass('open');
    } else {
        $('.faq_answer_container').slideUp();
        $('.faq').removeClass('open');
        $(this).closest('.faq').find('.faq_answer_container').slideDown();
        $(this).closest('.faq').addClass('open');
    }

});



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
        title: "Erstelle deinen Discord-Server",
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
    console.log(event.clientX)
    var windowWidth = window.innerWidth;
    var clickedPosX = event.clientX;

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

    var distance = (-1) * slideIndex * 40;

    $('#how-it-works-slider').css("transform", `translateX(${distance}vw)`);

}
