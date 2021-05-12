var renderer, scene, camera, ww, wh, particles;

$('.team-member').each(function (index) {
    $(this).css('background-image', `url(${baseURL}/static/landing_page/img/users/user_${index + 1}.png)`)
});



ww = $('#map-section').width(),
    wh = $('#map-section').height();

var centerVector = new THREE.Vector3(0, 0, 0);
var previousTime = 0;

var getImageData = function (image) {

    var canvas = document.createElement("canvas");
    canvas.width = image.width;
    canvas.height = image.height;

    var ctx = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0);

    return ctx.getImageData(0, 0, image.width, image.height);
}

var drawTheMap = function () {

    var geometry = new THREE.Geometry();
    var geometry2 = new THREE.Geometry();



    // test
   

    

    //

    var material = new THREE.PointsMaterial({
        size: 3,
        color: 0x000000,
        sizeAttenuation: false
    });

    var material2 = new THREE.PointsMaterial({
        color: 0xE7E7E7,
        size: 2,
        sizeAttenuation: false
    });

    console.log(imagedata.width, imagedata.height)
    for (var y = 0, y2 = imagedata.height; y < y2; y += 2) {
        for (var x = 0, x2 = imagedata.width; x < x2; x += 2) {
            if (imagedata.data[(x * 4 + y * 4 * imagedata.width) + 3] > 128) {

                var vertex = new THREE.Vector3();
                vertex.x = Math.random() * 1000 - 500;
                vertex.y = Math.random() * 1000 - 500;
                vertex.z = -Math.random() * 500;

                vertex.destination = {
                    x: x - imagedata.width / 2,
                    y: -y + imagedata.height / 2,
                    z: 0
                };

                vertex.speed = Math.random() / 200 + 0.015;


                if (x == 28 && y == 40) {

                    console.log(x, y)

                    console.log("hi")

                    geometry2.vertices.push(vertex);
                }


                geometry.vertices.push(vertex);


            } else {
                var vertex = new THREE.Vector3();
                vertex.x = Math.random() * 1000 - 500;
                vertex.y = Math.random() * 1000 - 500;
                vertex.z = -Math.random() * 500;

                vertex.destination = {
                    x: x - imagedata.width / 2,
                    y: -y + imagedata.height / 2,
                    z: 0
                };

                vertex.speed = Math.random() / 200 + 0.015;




                geometry2.vertices.push(vertex);

            }
        }
    }



    particles = new THREE.Points(geometry, material);
    particles2 = new THREE.Points(geometry2, material2);


    scene.add(particles);
    scene.add(particles2)

    requestAnimationFrame(render);
};

var init = function () {
    THREE.ImageUtils.crossOrigin = '';
    renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById("map"),
        antialias: true
    });
    renderer.setSize(ww, wh);
    renderer.setClearColor(0xffffff);

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(50, ww / wh, 0.1, 10000);
    camera.position.set(-100, 0, 220);
    camera.lookAt(centerVector);
    scene.add(camera);

    texture = THREE.ImageUtils.loadTexture("https://s3-us-west-2.amazonaws.com/s.cdpn.io/127738/transparentMap.png", undefined, function () {
        imagedata = getImageData(texture.image);
        drawTheMap();
    });
    window.addEventListener('resize', onResize, false);

};
var onResize = function () {
    ww = $('#map-section').width(),
        wh = $('#map-section').height();
    camera.aspect = ww / wh;
    camera.updateProjectionMatrix();
    renderer.setSize(ww, wh);

};

var render = function (a) {

    requestAnimationFrame(render);

    for (var i = 0, j = particles.geometry.vertices.length; i < j; i++) {
        var particle = particles.geometry.vertices[i];

        particle.x += (particle.destination.x - particle.x) * particle.speed;
        particle.y += (particle.destination.y - particle.y) * particle.speed;
        particle.z += (particle.destination.z - particle.z) * particle.speed;

        particle.color = new THREE.Color("rgb(255,255,255)");
    }

    

    for (var i = 0, j = particles2.geometry.vertices.length; i < j; i++) {
        var particle = particles2.geometry.vertices[i];

        particle.x += (particle.destination.x - particle.x) * particle.speed;
        particle.y += (particle.destination.y - particle.y) * particle.speed;
        particle.z += (particle.destination.z - particle.z) * particle.speed;

        particle.color = new THREE.Color("rgb(255,255,255)");
    }



    particles.geometry.verticesNeedUpdate = true;
    particles2.geometry.verticesNeedUpdate = true;

    camera.position.x = 0;
    camera.lookAt(centerVector);

    renderer.render(scene, camera);
};



function isOnScreen(element)
{
    var top_of_element = element.offset().top;
    var bottom_of_element = element.offset().top + element.outerHeight();
    var bottom_of_screen = $(window).scrollTop() + $(window).innerHeight();
    var top_of_screen = $(window).scrollTop();

    return (bottom_of_screen > top_of_element) && (top_of_screen < bottom_of_element);
}

var canvasLoaded = false;
$(window).scroll(function() {
    var visible = isOnScreen($('#map-section'));
    
    if (visible && !canvasLoaded) {
        canvasLoaded = true;
        init();
        
    }
})