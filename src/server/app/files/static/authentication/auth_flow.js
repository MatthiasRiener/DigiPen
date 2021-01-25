console.log('Authentification JavaSript loaded!');

const baseURL = "http://localhost:5000";

function sendRequestToServer(args) {
    return new Promise(function(resolve, reject) {
        $.ajax({
            type: args.type,
            url: baseURL + args.url,
            headers: {
                Authorization: "Bearer " + getAToken(),
            },
            statusCode: {
                400: function () {
                    alert("400 status code! user error");
                },
                401: function () {
                    silentLogin(getRToken(), sendRequestToServer, args);
                },
            },
            success: function (data) {
                console.log("Return from " + args.url + ": " + data);
                resolve(JSON.parse(data));
            },
        })
    });
}

function silentLogin(r_token, callback, args) {
    $.ajax({
        type: "POST",
        url: baseURL + "/auth/refresh_token",
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
            console.log("Token refreshed");
            setAToken(data);
            callback(args);
        },
    });
 }

 function logOut() {
    $.ajax({
        type: "GET",
        url: "http://localhost:5000/auth/logout",
        headers: {
            Authorization: "Bearer " + getAToken(),
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
            window.location.href = "/";
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