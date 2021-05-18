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

var lastLocation;

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

    lastLocation = locations.features[0];

    map.flyTo({
        center: [
            locations.features[0].geometry.coordinates[0],
            locations.features[0].geometry.coordinates[1],
        ],
        zoom: 12,
        essential: true // this animation is considered essential with respect to prefers-reduced-motion
    });
    
    flying = true;
    
}

var flying = false;

map.on('moveend', function(){
    if (flying) {
        new mapboxgl.Popup()
        .setLngLat([locations.features[0].geometry.coordinates[0],
            locations.features[0].geometry.coordinates[1]])
        .setHTML("Was geht ab lol")
        .addTo(map);

        flying = false;
    }
   
});

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




// custom control
class MapboxGLButtonControl {
    constructor({
      className = "",
      title = "",
      eventHandler = evtHndlr
    }) {
      this._className = className;
      this._title = title;
      this._eventHandler = eventHandler;
    }
  
    onAdd(map) {
      this._btn = document.createElement("button");
      this._btn.className = "mapboxgl-ctrl-icon" + " " + this._className;
      this._btn.type = "button";
      this._btn.title = this._title;
      this._btn.onclick = this._eventHandler;
  
      this._container = document.createElement("div");
      this._container.className = "mapboxgl-ctrl-group mapboxgl-ctrl";
      this._container.appendChild(this._btn);
  
      return this._container;
    }
  
    onRemove() {
      this._container.parentNode.removeChild(this._container);
      this._map = undefined;
    }
  }


  const ctrlPolygon = new MapboxGLButtonControl({
    className: "mapbox-gl-draw_polygon",
    title: "Draw Polygon",
    eventHandler: getLocation
  });

  map.addControl(ctrlPolygon, "top-right");
