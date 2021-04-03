let form = document.getElementById("feedbackForm");

form.addEventListener('checkForm', e => {
    let validImputs = true;
    document.querySelectorAll(".corr").forEach(element => {
        element.style.display = "none";
    });

    let title = document.getElementById("title").value;
    if (title.trim().length == 0) {
        validImputs = false;
        document.querySelectorAll(".corr")[0].style.display = "block";
    }

    let email = document.getElementById("email").value;
    if (!validateEmail(email.trim())) {
        validImputs = false;
        document.querySelectorAll(".corr")[1].style.display = "block";
    }

    let category = document.getElementById("category").value;
    if (category.length == 0) {
        validImputs = false;
        document.querySelectorAll(".corr")[2].style.display = "block";
    }

    let description = document.getElementById("description").value;
    if (description.trim().length == 0) {
        validImputs = false;
        document.querySelectorAll(".corr")[3].style.display = "block";
    }

    if (!validImputs)
        e.preventDefault();
});

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}