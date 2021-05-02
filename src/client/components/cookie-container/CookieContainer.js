import { template } from './template.js';

class CookieContainer extends HTMLElement {
    constructor() {
        super();

        this.temp = document.createElement('template');
        this.temp.innerHTML = template;

        this.attachShadow({
            mode: 'open',
        });

        this.shadowRoot.appendChild(this.temp.content.cloneNode(true));
        this.loadCss(this.getAttribute("path"));

        this.agree = this.shadowRoot.querySelector('#agree');
        this.disagree = this.shadowRoot.querySelector('#disagree');

    }

    loadCss(path) {
        fetch(path)
            .then(response => response.text())
            .then(data => {
                let node = document.createElement('style');
                node.innerHTML = data;
                this.shadowRoot.appendChild(node);
            });
    }

    connectedCallback() {
        this.agree.addEventListener('click', (e) => {
        });
    }

    disconnectedCallback() { }
}

window.customElements.define('cookie-container', CookieContainer);

