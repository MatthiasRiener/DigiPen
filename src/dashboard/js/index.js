$("#myInput").keyup(myFunction);

function myFunction() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    ul = document.getElementsByClassName("myUl");
    [...ul].forEach(function (e) {
        li = e.getElementsByTagName("li");
        console.log("li");
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
    let templates = [
        { name: "Planner", image: '' },
        { name: "Science", image: '' },
        { name: "School", image: '' },
        { name: "Politics", image: '' },
        { name: "Christmas", image: '' },
        { name: "Winter", image: '' },
        { name: "Planner", image: '' },
        { name: "Creative", image: '' },
        { name: "Nature", image: '' },
        { name: "Food", image: '' },
        { name: "Portfolio", image: '' },
        { name: "Sport", image: '' },
        { name: "Health", image: '' }
    ],
        yourPresentations = [
            { name: "British Tea Tips", image: '', slides: 13 },
            { name: "Austrian History", image: '', slides: 22 },
            { name: "Government Work", image: '', slides: 47 },
        ],
        i = 0;

    templates.forEach((e) => {
        if (!$(".searchitem")[i] || !$(".template")[i]) {
            i = 0;
            return;
        }
        $(".searchitem")[i].innerText = e.name;
        $(".template")[i].style.backgroundImage = "url('./img/Presentation_" + i + ".png')";
        i++;
    });

    yourPresentations.forEach((e) => {
        if (!$(".searchitem_yourPresentation")[i] || !$(".template_yourPresentation")[i]) {
            i = 0;
            return;
        }
        $(".searchitem_yourPresentation")[i].innerText = e.name;
        $(".template_yourPresentation")[i].style.backgroundImage = "url('./img/Presentation_" + i + ".png')";
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

$(".ul li").click();