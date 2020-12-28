import { template } from './template.js';

class TopNavigation extends HTMLElement {
    constructor() {
        super();

        this.temp = document.createElement('template');
        this.temp.innerHTML = template;

        this.attachShadow({
            mode: 'open',
        });

        this.shadowRoot.appendChild(this.temp.content.cloneNode(true));
        this.loadCss(this.getAttribute("path"));

        this.username = this.shadowRoot.querySelector('.content-right-container #username');
        this.userrole = this.shadowRoot.querySelector('.content-right-container #role');
        this.userImg = this.shadowRoot.querySelector('.nav-profile-image');
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
        this.userImg.style.backgroundImage = `url('${this.getAttribute("img")}')`;
        this.username.innerHTML = this.getAttribute('username');
        this.userrole.innerHTML = this.getAttribute('role');
    }

    disconnectedCallback() {

    }
}

window.customElements.define('top-nb', TopNavigation);

