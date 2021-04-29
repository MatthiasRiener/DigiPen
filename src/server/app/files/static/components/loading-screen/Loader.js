
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
        this.loadCss();
    }

    loadCss(path) {
        fetch(`http://localhost:5000/static/components/loading-screen/loader-basic.css`)
            .then(response => response.text())
            .then(data => {
                let node = document.createElement('style');
                node.innerHTML = data;
                this.shadowRoot.appendChild(node);
                //this.calculateWorkspaceWidth();
            });

        const loadingOptions = ["first", "second", "third"];
        var item = loadingOptions[Math.floor(Math.random() * loadingOptions.length)];


        fetch(`http://localhost:5000/static/components/loading-screen/loading-fade-out-${item}.css`)
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

        console.log("DOCUMENT WAS LOADED")
        const wrapper = this.shadowRoot.querySelector('#wrapper');
        wrapper.classList.add('loaded');
    }





}

window.customElements.define('loading-screen', LoadingScreen);
