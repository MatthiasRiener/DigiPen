import {
    template
} from './template.js';

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

        this.logo = this.shadowRoot.querySelector('#logo');

        this.getUserData();
    }

    loadCss(path) {
        fetch(baseURL + `/static/components/nav/styles.css`)
        .then(response => response.text())
            .then(data => {
                let node = document.createElement('style');
                node.innerHTML = data;
                this.shadowRoot.appendChild(node);
            });
    }

    connectedCallback() {
        this.logo.addEventListener('click', (e) => {
            window.location = "../../../src/landing_page/index.html";
        });


        this.userImg.addEventListener('click', (e) => {
            window.location = "../../../src/profilseite/index.html";
        });
    }

    disconnectedCallback() {

    }

    getUserData() {
        sendRequestToServer({type: "GET", url: "/profile/user"}).then(data => {
            this.userImg.style.backgroundImage = `url('${data.img}')`;
            this.username.innerHTML = data.name;
            this.userrole.innerHTML = data.mail;
        });
    }
}

window.customElements.define('top-nb', TopNavigation);