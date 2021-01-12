/* -----------------------------------------------
/* How to use? : Check the GitHub README
/* ----------------------------------------------- */

/* To load a config file (particles.json) you need to host this demo (MAMP/WAMP/local)... */
/*
particlesJS.load('particles-js', 'particles.json', function() {
  console.log('particles.js loaded - callback');
});
*/

/* Otherwise just put the config content (json): */

particlesJS('particles-js',
  
  {
    "particles": {
      "number": {
        "value": Math.round(Math.random() * 200) + 50 ,
        "density": {
          "enable": true,
          "value_area": 800
        }
      },
      "color": {
        "value": ["#383838" ]
      },
      "shape": {
        "type": ["circle"],
        "stroke": {
          "width": 0,
          "color": ["#383838" ]
        },
        "polygon": {
          "nb_sides": 5
        },
        "image": {
          "src": "../img/tik.svg",
          "width": 100,
          "height": 100
        }
      },
      "opacity": {
        "value": 1,
        "random": false,
        "anim": {
          "enable": false,
          "speed": 1,
          "opacity_min": 0.1,
          "sync": false
        }
      },
      "size": {
        "value": 10,
        "random": true,
        "anim": {
          "enable": true,
          "speed": 10,
          "size_min": 3,
          "sync": false
        }
      },
      "line_linked": {
        "enable": true,
        "distance": 60,
        "color": "#383838",
        "opacity": 1,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 1,
        "random": false,
        "direction": "none",
        "out_mode": "out",
        "attract": {
          "enable": false,
          "rotateX": 10,
          "rotateY": 10
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": false,
          "mode": "repulse"
        },
        "onclick": {
          "enable": true,
          "mode": "push"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 400,
          "line_linked": {
            "opacity": 1
          }
        },
        "bubble": {
          "distance": 400,
          "size": 10,
          "duration": 2,
          "opacity": 8,
          "speed": 3
        },
        "repulse": {
          "distance": -200
        },
        "push": {
          "particles_nb": 4
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": true,
    "config_demo": {
      "hide_card": false,
      "background_color": "#b61924",
      "background_image": "",
      "background_position": "50% 50%",
      "background_repeat": "no-repeat",
      "background_size": "cover"
    }
  }

);