console.log('Authentification JavaSript loaded!');

function sendRequestToServer(args) {
    $.ajax({
        type: args.type,
        url: args.url,
        headers: {
          Authorization: "Bearer " + getAToken(),
        },
        statusCode: {
          400: function () {
            alert("400 status code! user error");
          },
          401: function () {
            silentLogin(getRToken(), sendRequestToServer(args));
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
        Authorization: "Bearer " + getRToken(),
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
            setAToken(data);
            callback(args);
        },
    });
 }

 function setAToken(token) {
    localStorage.setItem("a_token", token);
}

 function getAToken() {
    return localStorage.getItem("a_token");
 }

 function setRToken(token) {
    localStorage.setItem("r_token", token);
 }

 function getRToken() {
    return localStorage.getItem("r_token");
 }