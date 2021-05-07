
import { template } from './template.js';

class LoadingScreen extends HTMLElement {
    constructor() {
        super();

        this.temp = document.createElement('template');
        this.temp.innerHTML = template;


        this.attachShadow({
            mode: 'open'
        });

        this.shadowRoot.appendChild(this.temp.content.cloneNode(true));

        this.message = this.shadowRoot.querySelector('#loader-message');
        this.getRandomTipp();

        this.loadCss();
        this.loadJS();
    }
    getRandomTipp() {
        sendRequestToServer({ type: "GET", url: "/tipps/getTipp" }).then(data => {
            this.message.innerHTML = "Tipp: " + data.res;
            this.message.classList.add('loader-text-fade-in');
        });
    }

    loadJS() {

        var sc = $.getScript(`${baseURL}/static/components/loading-screen/domObserver.js`)
            .done(function (script, textStatus) {
               return script;
            })
            .fail(function (jqxhr, settings, exception) {
                
            });


        let node = document.createElement('script');
        node.innerHTML = sc.responseText;
        this.shadowRoot.appendChild(node);
      
    }

    jsLoaded() {

        
    }

    loadCss(path) {
        fetch(`${baseURL}/static/components/loading-screen/loader-basic.css`)
            .then(response => response.text())
            .then(data => {
                let node = document.createElement('style');
                node.innerHTML = data;
                this.shadowRoot.appendChild(node);
                //this.calculateWorkspaceWidth();
            });

        const loadingOptions = ["first", "second", "third"];
        var item = loadingOptions[Math.floor(Math.random() * loadingOptions.length)];


        fetch(`${baseURL}/static/components/loading-screen/loading-fade-out-${item}.css`)
            .then(response => response.text())
            .then(data => {
                let node = document.createElement('style');
                node.innerHTML = data;
                this.shadowRoot.appendChild(node);
                //this.calculateWorkspaceWidth();
            });
    }
    connectedCallback() {
    }
    disconnectedCallback() {

    }

    documentLoaded() {

        const wrapper = this.shadowRoot.querySelector('#wrapper');
        wrapper.classList.add('loaded');


    }

    relightLoader(msg) {
        const wrapper = this.shadowRoot.querySelector('#wrapper');
        wrapper.classList.remove('loaded');
        this.message.innerHTML = msg;
    }

    changeMessage(msg) {
        this.message.innerHTML = msg;
    }





}

window.customElements.define('loading-screen', LoadingScreen);
