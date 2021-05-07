const isServer = true;

if (isServer) {
    const baseURL = "http://http://130.61.115.67:5000
else {
    const baseURL = "http://localhost:5000";
}

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
            801: function() {
                window.location.href = "/permission_denied";
            }
        },
        success: function (data) {
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
            args["isCallback"] = true;
            args['resolve'] = resolve;
            args['reject'] = reject;
            setAToken(data);
            callback(args);
        },
    });
 }

 function logOut() {
    sendRequestToServer({type: "GET", url: "/auth/logout"}).then(data => {
        unsetAToken();
        unsetRToken();
        window.location.href = baseURL + "/auth/login";
    });
}

 function setAToken(token) {
    if(token == null || token == undefined || token === '') {
        return;
    }
    localStorage.setItem("a_token", token);
}

 function getAToken() {
    return localStorage.getItem("a_token");
 }

 function unsetAToken() {
    localStorage.removeItem("a_token");
 }

 function setRToken(token) {
    if(token == null || token == undefined || token === '') {
        return;
    }
    localStorage.setItem("r_token", token);
 }

 function getRToken() {
    return localStorage.getItem("r_token");
 }

 function unsetRToken() {
    localStorage.removeItem("r_token");
 }

 function setCustomStorage(key, value) {
    localStorage.setItem(key, value);
 }

 function getCustomStorage(key) {
    return localStorage.getItem(key);
 }



 function getCurrentLocation() {
    // https://ipgeolocation.abstractapi.com/v1?api_key=389111a28499498884fbbcddd8767fe2
    $.ajax({
        type: "GET",
        url: "https://ipgeolocation.abstractapi.com/v1?api_key=389111a28499498884fbbcddd8767fe2",
        success: function (data) {
            sendRequestToServer({type: "POST", url: "/location/tracker", data: {"location": JSON.stringify(data)}}).then(data => {

            });
        },
    })
 }

