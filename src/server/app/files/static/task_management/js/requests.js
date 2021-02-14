function getPresentations() {
    sendRequestToServer({type: "GET", url: "/task/getTasks"}).then(data => {
        console.log(data);
        return data;
    });
}