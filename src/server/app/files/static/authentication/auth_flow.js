console.log('Authentification JavaSript loaded!');

const baseURL = "http://localhost:5000";

function sendRequestToServer(args) {

    if('isCallback' in args) {
        ajaxRequest(args['resolve'], args['reject'], args)
        return;
    } 
    return new Promise(function(resolve, reject) {
        ajaxRequest(resolve, reject, args);
    })
}

function ajaxRequest(resolve, reject, args) {
    $.ajax({
        type: args.type,
        url: baseURL + args.url,
        data: args.data == undefined ? {} : args.data,
        headers: {
            Authorization: "Bearer " + getAToken(),
        },
        statusCode: {
            400: function () {
                alert("400 status code! user error");
            },
            401: function () {
                silentLogin(getRToken(), sendRequestToServer, args, resolve, reject);
            },
        },
        success: function (data) {
            console.log("Return from " + args.url + ": " + data);
            resolve(JSON.parse(data));
        },
    })
}

function silentLogin(r_token, callback, args, resolve, reject) {
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
            console.log("Token refreshed", args);
            args["isCallback"] = true;
            args['resolve'] = resolve;
            args['reject'] = reject;
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