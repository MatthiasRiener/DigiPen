var renderer, scene, camera, ww, wh, particles;

$('.team-member').each(function (index) {
    $(this).css('background-image', `url(${baseURL}/static/landing_page/img/users/user_${index + 1}.png)`)
});



ww = $('#map').width(),
    wh = $('#map').height();

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
    var geometry3 = new THREE.Geometry();


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

    var material3 = new THREE.PointsMaterial({
        color: 0xff0000,
        size: 11,
        sizeAttenuation: false
    });


    function getColorIndicesForCoord(x, y, width) {
        var red = y * (width * 4) + x * 4;
        return [red, red + 1, red + 2, red + 3];
    }


    for (var y = 0, y2 = imagedata.height; y < y2; y += 2) {
        for (var x = 0, x2 = imagedata.width; x < x2; x += 2) {

            var colorIndices = getColorIndicesForCoord(x, y, imagedata.width);

            var redIndex = colorIndices[0];
            var greenIndex = colorIndices[1];
            var blueIndex = colorIndices[2];
            var alphaIndex = colorIndices[3];

            var imgBrightness = imagedata.data[alphaIndex];
            var redCoordinate = imagedata.data[redIndex];
            var blueCoordinate = imagedata.data[blueIndex];
            var greenCoordinate = imagedata.data[greenIndex];

            
            if (redCoordinate == 255 && blueCoordinate == 0 && greenCoordinate == 0) {
                console.log(redCoordinate);

                var vertex = new THREE.Vector3();
                vertex.x = 0;
                vertex.y = 0;
                vertex.z = -Math.random() * 500;

                var destX = x - imagedata.width / 2;
                var destY = -y + imagedata.height / 2;

                vertex.destination = {
                    x: destX,
                    y: destY,
                    z: 1
                };

                vertex.speed = Math.random() / 200 + 0.015;

                geometry3.vertices.push(vertex);
            } else if (imgBrightness > 128) {
                var vertex = new THREE.Vector3();
                vertex.x = Math.random() * 1000 - 500;
                vertex.y = Math.random() * 1000 - 500;
                vertex.z = -Math.random() * 500;

                var destX = x - imagedata.width / 2;
                var destY = -y + imagedata.height / 2;

                vertex.destination = {
                    x: destX,
                    y: destY,
                    z: 0
                };

                vertex.speed = Math.random() / 200 + 0.015;

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
    particles3 = new THREE.Points(geometry3, material3);

    scene.add(particles);
    scene.add(particles2)
    scene.add(particles3);

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

    texture = THREE.ImageUtils.loadTexture(`${baseURL}/static/landing_page/img/map/transparentMap_test.png`, undefined, function () {
        imagedata = getImageData(texture.image);
        drawTheMap();
    });
    window.addEventListener('resize', onResize, false);

};
var onResize = function () {
    ww = $('#map').width(),
        wh = $('#map').height();

        console.log(wh)
    camera.aspect = ww / wh;
    camera.updateProjectionMatrix();
    //renderer.setSize(ww, wh);

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

    for (var i = 0, j = particles3.geometry.vertices.length; i < j; i++) {
        var particle = particles3.geometry.vertices[i];

        particle.x += (particle.destination.x - particle.x) * particle.speed;
        particle.y += (particle.destination.y - particle.y) * particle.speed;
        particle.z += (particle.destination.z - particle.z) * particle.speed;

        particle.color = new THREE.Color("rgb(255,255,255)");
    }



    particles.geometry.verticesNeedUpdate = true;
    particles2.geometry.verticesNeedUpdate = true;
    particles3.geometry.verticesNeedUpdate = true;

    camera.position.x = 0;
    camera.lookAt(centerVector);

    renderer.render(scene, camera);
};



function isOnScreen(element) {
    var top_of_element = element.offset().top;
    var bottom_of_element = element.offset().top + element.outerHeight();
    var bottom_of_screen = $(window).scrollTop() + $(window).innerHeight();
    var top_of_screen = $(window).scrollTop();

    return (bottom_of_screen > top_of_element) && (top_of_screen < bottom_of_element);
}

var canvasLoaded = false;
$(window).scroll(function () {
    var visible = isOnScreen($('#map-section'));

    if (visible && !canvasLoaded) {
        canvasLoaded = true;
        init();

    }
})