// This is where all events are handled

let questionCount = 1;

$(".quiz").click(function (e) {
    var count = Math.floor((Math.random() * 9999));
    $("#randomNumber").text('0000'.substr(String(count).length) + count);
    $("#quizjoinpopup").css('display', 'flex');
    console.log($(this).data().quiz);
    $("#title").text($(this).data().quiz);
    resizestartBTN();

});

$(window).resize(function () {
    resizestartBTN();
})

function resizestartBTN() {
    $("#startquizbutton").width($("#qrbox").outerWidth());
}

$("#quizjoinpopup").click(function (e) {
    if (e.target.id != "quizjoinpopup") return;
    $(this).css("display", "none")
})

$("#startquizbutton").click(function () {
    window.location = "https://www.youtube.com/watch?v=j42QOK4SLk4&ab_channel=WBKids";
})

$("#newQuiz, #backbox").click(function (e) {
    changeDisplay();
});

let firstanimation = true;
changeDisplay();

function changeDisplay() {
    if ($(".myquizbox")[0].style.display == "block") {
        // $(".myquizbox")[0].style.display = "none";
        $(".myquizbox")[1].style.display = "block";
        $(".myquizbox").eq(1).addClass("animateQuizboxForward");
    } else {
        if (firstanimation) {
            $(".myquizbox")[0].style.display = "block";
            $(".myquizbox")[1].style.display = "none";
            firstanimation = false;
        } else {
            $(".myquizbox")[0].style.display = "block";
            $(".myquizbox").eq(1).addClass("animateQuizboxBackward")
        }
    }
}

$('.myquizbox').on("animationend", function () {
    if ($(this).hasClass("animateQuizboxForward")) {
        $(".myquizbox")[0].style.display = "none";
        $(".myquizbox")[1].style.display = "block";
    }
    $(this).removeClass("animateQuizboxForward");
    if ($(this).hasClass("animateQuizboxBackward")) {
        $(".myquizbox")[0].style.display = "block";
        $(".myquizbox")[1].style.display = "none";
    }
    $(this).removeClass("animateQuizboxBackward");
});

$("#dublicate").click(function () {
    addQuestion();
});
addQuestion();

function addQuestion() {
    $(".QuestionCount").eq(questionCount - 1).html('Question ' + questionCount)
    $("#loadPattern").append($("#Questionpattern").html())
    questionCount++;
}

$("#saveQuiz").click(function () {
    let wasInput = true;
    [...$("#loadPattern .questionTitle, .quizTitle")].forEach(function (e) {
        if (e.value.trim().length == 0)
            wasInput = false;
    });
    [...$("#loadPattern .answertext")].forEach(function (e) {
        if (e.parentElement.children[0].checked && e.value.trim().length == 0)
            wasInput = false;
    });
    if (!wasInput) return;
    $("#loadPattern").html("");
    questionCount = 1;
    addQuestion();
    $(".quizTitle").val("");
    changeDisplay();
});