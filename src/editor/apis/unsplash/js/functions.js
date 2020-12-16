var res;


function getUnsplashDocuments() {
    var http = new XMLHttpRequest();
    http.open("GET", "https://raw.githubusercontent.com/MatthiasRiener/Slidea/main/src/editor/apis/unsplash/response_01.json", false);
    http.send(null);


    res = JSON.parse(http.responseText);

    console.log(res);

    res.results.forEach(element => {
        document.getElementsByClassName('content')[0].innerHTML += getPost(element);
    });

}

function getPost(post) {
    console.log(`Image loaded: ${post.id}`)
    var c_height = post.cover_photo.height / post.cover_photo.width * 500;
    return (
        `<div style="background-image: url(${post.cover_photo.urls.regular}); height: ${c_height}px" class="img-container">
            <div class="overlay">
                <div class="overlay-info-header">
                    <div style="background-image: url('${post.user.profile_image.medium}')" class="overlay-img"></div>
                    <p><strong>${post.title}</strong><br>${post.cover_photo.description != null ? (post.cover_photo.description.length > 25 ? post.cover_photo.description.slice(0, 25) + '...'  :  post.cover_photo.description) : ''}</p>
                    <div class="overlay-img download-custom" ><a style="color: #383838" href="${post.cover_photo.links.download}"><ion-icon class="download-icon" name="download-outline"></ion-icon></a></div>
                
                </div> 

                 <div class="img-info-bottom">
                <a href="${post.cover_photo.links.html}">${post.user.name} on Unsplash!</a>
            </div>
            </div>


            
    </div>`
    );
}