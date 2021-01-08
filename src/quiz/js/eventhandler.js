// This is where all events are handled

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
    console.log($("#qrbox").width())
    $("#startquizbutton").width($("#qrbox").outerWidth());
}

$("#quizjoinpopup").click(function (e) {
    if (e.target.id != "quizjoinpopup") return;
    $(this).css("display", "none")
})

$("#startquizbutton").click(function () {
    window.location = "https://www.youtube.com/watch?v=j42QOK4SLk4&ab_channel=WBKids";
})