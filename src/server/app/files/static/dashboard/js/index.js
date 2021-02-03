let templates = [
    { name: "Planner", image: 'https://www.clipartkey.com/mpngs/m/184-1845555_img-simpsons-dr-nick-riviera.png', slides: 13, downloads: 12343, created: '28.12.2020' },
    { name: "Science", image: 'https://www.clipartkey.com/mpngs/m/184-1845555_img-simpsons-dr-nick-riviera.png', slides: 13, downloads: 12343, created: '28.12.2020' },
    { name: "School", image: 'https://www.clipartkey.com/mpngs/m/184-1845555_img-simpsons-dr-nick-riviera.png', slides: 13, downloads: 12343, created: '28.12.2020' },
    { name: "Politics", image: 'https://www.clipartkey.com/mpngs/m/184-1845555_img-simpsons-dr-nick-riviera.png', slides: 13, downloads: 12343, created: '28.12.2020' },
    { name: "Christmas", image: 'https://www.clipartkey.com/mpngs/m/184-1845555_img-simpsons-dr-nick-riviera.png', slides: 13, downloads: 12343, created: '28.12.2020' },
    { name: "Winter", image: 'https://www.clipartkey.com/mpngs/m/184-1845555_img-simpsons-dr-nick-riviera.png', slides: 13, downloads: 12343, created: '28.12.2020' },
    { name: "Planner", image: 'https://www.clipartkey.com/mpngs/m/184-1845555_img-simpsons-dr-nick-riviera.png', slides: 13, downloads: 12343, created: '28.12.2020' },
    { name: "Creative", image: 'https://www.clipartkey.com/mpngs/m/184-1845555_img-simpsons-dr-nick-riviera.png', slides: 13, downloads: 12343, created: '28.12.2020' },
    { name: "Nature", image: 'https://www.clipartkey.com/mpngs/m/184-1845555_img-simpsons-dr-nick-riviera.png', slides: 13, downloads: 12343, created: '28.12.2020' },
    { name: "Food", image: 'https://www.clipartkey.com/mpngs/m/184-1845555_img-simpsons-dr-nick-riviera.png', slides: 13, downloads: 12343, created: '28.12.2020' },
    { name: "Portfolio", image: 'https://www.clipartkey.com/mpngs/m/184-1845555_img-simpsons-dr-nick-riviera.png', slides: 13, downloads: 12343, created: '28.12.2020' },
    { name: "Sport", image: 'https://www.clipartkey.com/mpngs/m/184-1845555_img-simpsons-dr-nick-riviera.png', slides: 13, downloads: 12343, created: '28.12.2020' },
    { name: "Health", image: 'https://www.clipartkey.com/mpngs/m/184-1845555_img-simpsons-dr-nick-riviera.png', slides: 13, downloads: 12343, created: '28.12.2020' }
],
    yourPresentations = [
        { name: "British Tea Tips", image: 'https://www.clipartkey.com/mpngs/m/184-1845555_img-simpsons-dr-nick-riviera.png', slides: 13, downloads: 12343, created: '28.12.2020' },
        { name: "Austrian History", image: 'https://www.clipartkey.com/mpngs/m/184-1845555_img-simpsons-dr-nick-riviera.png', slides: 22, downloads: 12343, created: '28.12.2020' },
        { name: "Government Work", image: 'https://www.clipartkey.com/mpngs/m/184-1845555_img-simpsons-dr-nick-riviera.png', slides: 47, downloads: 12343, created: '28.12.2020' },
    ],
    i = 0;


$("#myInput").keyup(myFunction);

function myFunction() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    ul = document.getElementsByClassName("myUl");
    [...ul].forEach(function (e) {
        li = e.getElementsByTagName("li");
        for (i = 0; i < li.length; i++) {
            a = li[i].getElementsByClassName("searchitem")[0] || li[i].getElementsByClassName("searchitem_yourPresentation")[0];
            txtValue = a.textContent || a.innerText;
            if (txtValue.toUpperCase().indexOf(filter) === 0) {
                li[i].style.display = "";
            } else {
                li[i].style.display = "none";
            }
        }
    });

}

function dynamicDisplay() {
    templates.forEach((e) => {
        if (!$(".searchitem")[i] || !$(".template")[i]) {
            i = 0;
            return;
        }
        $(".searchitem")[i].innerText = e.name;
        $(".template")[i].style.backgroundImage = "url('" + templates[i].image + "')";
        i++;
    });

    yourPresentations.forEach((e) => {
        if (!$(".searchitem_yourPresentation")[i] || !$(".template_yourPresentation")[i]) {
            i = 0;
            return;
        }
        $(".searchitem_yourPresentation")[i].innerText = e.name;
        $(".template_yourPresentation")[i].style.backgroundImage = "url('" + templates[i].image + "')";
        console.log("loading img")
        $(".amoutofslides")[i].innerText = e.slides + " Slides";
        i++;
    });
}

dynamicDisplay();

$(".fa-angle-down, .fa-angle-up").click(function (e) {
    let position = 0,
        ignoreAmount = 4;
    if (e.target.classList.contains("fa-angle-down")) {
        e.target.classList.remove("fa-angle-down");
        e.target.classList.add("fa-angle-up");
        [...$(".myUl")].forEach((uls) => {
            if (uls.children.length <= ignoreAmount) return;
            [...uls.children].forEach((e) => {
                if (position >= ignoreAmount) {
                    e.style.display = "none";
                }
                position++;
            })
            position = 0;
        })
    } else {
        e.target.classList.add("fa-angle-down");
        e.target.classList.remove("fa-angle-up");
        [...$(".myUl")].forEach((uls) => {
            [...uls.children].forEach((e) => {
                e.style.display = "block";
            })
        })
    }

});

$(".myUl li").click(function (e) {
    title = "";
    if (["searchitem_yourPresentation", "searchitem"].includes(e.target.parentElement.parentElement.children[1].classList.value)) {
        title = e.target.parentElement.parentElement.children[1].innerText;
    } else if (["searchitem_yourPresentation", "searchitem"].includes(e.target.parentElement.children[1].classList.value)) {
        title = e.target.parentElement.children[1].innerText;
    }

    $("#usetemplatebox").css('display', 'flex')
    $("#template_title").text(title);

    [yourPresentations, templates].forEach((e) => {
        e.forEach((templates) => {
            if (templates.name == title) {
                $("#downloadamount").text(templates.downloads)
                $("#createddate").text(templates.created)
                $("#template_big_img, #template_small_img").attr("src", templates.image);
            }
        })
    })
    sizetoimg();
});

$("#usetemplatebox").click(function (e) {
    if (e.target.id == "usetemplatebox" || e.target.classList.contains("closeicon")) {
        $(this).css('display', 'none')
        $("#template_big, #template_scroll, #usetemplate").css('display', 'flex');
        $(".controllsandshareview").css('display', 'none');
    }
})

$("#usetemplate").click(function (e) {
    $(this).css('display', 'none');
    $("#template_big, #template_scroll").css('display', 'none');
    $(".controllsandshareview").css('display', 'flex');
    sizetoimg();
});

$(window).resize(sizetoimg);

function sizetoimg() {
    if ($("#template_big").css("display") != "none") {
        let img_width = $("#template_big_img").width();
        $("#usetemplateboxheader, #template_scroll").css('width', img_width);
    } else {
        $("#usetemplateboxheader").css('width', $(".controllsandshareview").width() - parseFloat($("#template_small_img").css('marginLeft')) * 2);
        $(".shareview").css('width', $("#template_small_img").width())
    }
};

$('body').on('click', '.createPresentation', function(){
    window.location = "../../src/editor/view/index.html"
});

$('body').on('click', '#submitcontrolls', function(){
    window.location = "../../../src/editor/view/index.html"
});