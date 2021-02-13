
 import { template } from './template.js';

  class Notification extends HTMLElement {
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

        this.invitesOutput = this.shadowRoot.querySelector('.invitesOutput');
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
        data.res.forEach(presentation => {
          console.log(presentation);

          this.invitesOutput.innerHTML += (`
            <div class="invites-row" data-presentation="${presentation._id}">
              <div class="invites-row-left">
                <div class="invites-picture" style="background: url('${presentation.creator.img}')"></div>
              </div>
              <div class="invites-row-middle">
                <h2 class="invites-presentation">${presentation.name}</h2>
                <h2 class="invites-owner">${presentation.creator.name}</h2>
              </div>
              <div class="invites-row-right">
                <button class="invites-accept inviteBtn"
                  onClick="handleInvite($(this).data('type'), $(this).data('presentation'))"
                  data-type="decline" data-presentation="${presentation._id}"><ion-icon name="close-outline"></ion-icon>
                </button>
                <button class="invites-decline inviteBtn"
                  onClick="handleInvite($(this).data('type'), $(this).data('presentation'))"
                  data-type="accepted" data-presentation="${presentation._id}"><ion-icon name="checkmark-outline"></ion-icon>
                </button>
              </div>
            </div>
          `);
        });
      });
    }

    deleteEntry(data) {
      data = JSON.parse(data)
      this.shadowRoot.querySelector(`.invites-row[data-presentation="${data.p_id}"]`).remove();
    }
  }

window.customElements.define('check-notifications', Notification);
