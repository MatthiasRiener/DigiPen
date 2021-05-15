var renderer, scene, camera, ww, wh, particles;

$('.team-member').each(function (index) {
    $(this).css('background-image', `url(${baseURL}/static/landing_page/img/users/user_${index + 1}.png)`)
});


mapboxgl.accessToken = 'pk.eyJ1Ijoic2xpZGVhIiwiYSI6ImNrb3EybTA1ejA5Y2Iyc25sazBhanM3aXIifQ.4VkwdxqmiCrZCjJb9RgpYQ';

var monument = [-77.0353, 38.8895];

var map = new mapboxgl.Map({
    container: 'map',
    center: monument,
    style: 'mapbox://styles/mapbox/light-v10'
});




// standorte

var locations = {
    'type': 'FeatureCollection',
    'features': [
        {
            'type': 'Feature',
            'geometry': {
                'type': 'Point',
                'coordinates': [14.2495914, 48.2685109]
            },
            'properties': {

            }
        },
        
        {
            'type': 'Feature',
            'geometry': {
                'type': 'Point',
                'coordinates': [-73.9109737, 40.8517687]
            },
            'properties': {

            }
        },
        {
            'type': 'Feature',
            'geometry': {
                'type': 'Point',
                'coordinates': [-118.2879734, 33.8309233]
            },
            'properties': {

            }
        }

    ]
};


// add unique id

locations.features.forEach(function (location, i) {
    location.properties.id = i;
});


map.on('load', function (e) {
    map.addControl(new mapboxgl.NavigationControl());
    addMarkers();
})


// if button was clicked

$('#find-nearest-location').click(function () {

    getLocation();


});


function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getNearestLocation);
    } else {
        console.log("Location not supported on device..")
    }
}

function getNearestLocation(position) {
    var searchResult = [position.coords.latitude, position.coords.longitude];

    var options = { units: 'miles' };
    locations.features.forEach(function (store) {
        Object.defineProperty(store.properties, 'distance', {
            value: turf.distance(searchResult, store.geometry, options),
            writable: true,
            enumerable: true,
            configurable: true
        });
    });


    locations.features.sort(function (a, b) {
        if (a.properties.distance > b.properties.distance) {
            return 1;
        }
        if (a.properties.distance < b.properties.distance) {
            return -1;
        }
        return 0; // a must be equal to b
    });

    console.log(locations.features[0])


    map.flyTo({
        center: [
            locations.features[0].geometry.coordinates[0],
            locations.features[0].geometry.coordinates[1],
        ],
        zoom: 12,
        essential: true // this animation is considered essential with respect to prefers-reduced-motion
    });
}

function addMarkers() {
    locations.features.forEach((location) => {
        var el = document.createElement('div');
        el.id = 'marker';
        console.log(location)
        // create the marker
        new mapboxgl.Marker(el)
            .setLngLat(location.geometry.coordinates)
            .addTo(map);
    })
}