
 import { template } from './template.js';

  class Workspace extends HTMLElement {
    constructor() {
      super();

      this.temp = document.createElement('template');
      this.temp.innerHTML = template;


        this.attachShadow({
        mode: 'open'
      });

        this.shadowRoot.appendChild(this.temp.content.cloneNode(true));
        this.loadCss(this.getAttribute("path"));
        this.container = this.shadowRoot.querySelector('.notifications-container');
        this.closeBtn = this.shadowRoot.querySelector('.closePopups');
        this.closeBtn.addEventListener('click', e => {
          this.closePopups();
        });

        this.invitesContainer = this.shadowRoot.querySelector('.invites-container');
        this.openInvitesBtn = this.shadowRoot.querySelector('.openInvites');
        this.openInvitesBtn.addEventListener('click', e => {
          this.openInvites();
        });
    }

      loadCss(path) {
          fetch(`http://localhost:5000/static/components/check-notifications/styles.css`)
          .then(response => response.text())
              .then(data => {
                  let node = document.createElement('style');
                  node.innerHTML = data;
                this.shadowRoot.appendChild(node);
                //this.calculateWorkspaceWidth();
              });
      }
    connectedCallback() {
        // intialize start state
        this.classList.add('hidden');
    }

    disconnectedCallback() {

    }

    animateNotifications() {
        this.classList.remove('hidden');
        this.classList.add('visible');

        this.container.classList.add('popTransition');
        this.invitesContainer.classList.add('slideTransition');
    }

    closePopups() {
      this.classList.remove('visible');
      this.classList.add('hidden');
      this.container.classList.remove('popTransition');
      this.invitesContainer.classList.remove('slideTransition');
    }

    openInvites() {
      //this.invitesContainer.remove('hidden');
      //this.invitesContainer.add('visible');

      //this.invitesContainer.classList.add('slideTransition');

      sendRequestToServer({type: "GET", url: "/dashboard/getInvites"}).then(data => {
        console.log("invites: " + data);
      });
    }
  }

window.customElements.define('check-notifications', Workspace);
