console.log('Authentification JavaSript loaded!');

function sendGetRequestToServer(url, a_token) {
    $.ajax({
        type: "GET",
        url: url,
        headers: {
          Authorization: "Bearer " + a_token,
        },
        statusCode: {
          400: function () {
            alert("400 status code! user error");
          },
          401: function () {
            silentLogin(localStorage.getItem("r_token"), sendGetRequestToServer());
          },
        },
        success: function (data) {
          alert(data);
        },
      });
}

function silentLogin(r_token, callback) {
    $.ajax({
        type: "POST",
        url: "http://localhost:5000/auth/refresh_token",
        headers: {
        Authorization: "Bearer " + r_token,
        },
        statusCode: {
        400: function () {
            alert("400 status code! user error");
        },
        401: function () {
            alert("500 status code! server error");
        },
        },
        success: function (data) {
            localStorage.setItem("a_token", data);
            callback();
        },
    });
 }