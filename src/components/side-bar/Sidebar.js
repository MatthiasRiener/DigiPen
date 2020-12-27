
(function () {
  const template = document.createElement('template');

  template.innerHTML = `

    <style>

.left-side-bar {
    margin-top: 1%;
    width: 17%;
    height: 98%;
    background: white;
    box-shadow: 1px 0px 10px #00000020;

    display: flex;
    flex-direction: column;
    align-items: center;
}

.left-side-bar #title-nav {
    font-size: 24px;
    margin-top: 50px;
    color: #38383880;
    font-weight: bold;
}

.left-side-content {
    width: 86%;
    height: 100%;
}


.workspace-container {
    width: 100%;
    height: 6vh;
    border-radius: 15px;
    border: 2px solid #70707020;

    display: flex;
    align-items: center;
}

.cur-workspace {
    height: 70%;
    background: #5765FF;
    margin: 3%;
    border-radius: 15px;
}

#workspace-text {
    margin-left: 20px !important;
}

.workspace-arrows {
    margin-left: auto;
    display: flex;
    flex-direction: column;
    margin-right: 20px;
}


.nav-bar-element {
    width: 100%;
    height: 5.5vh;
    background: #E4E5E9;
    border-radius: 10px;
    display: flex;
    align-items: center;
    margin-top: 10px;
    color: #383838;
    font-weight: bold;
    font-size: 17px;
}

.nav-bar-element .icon-navbar {
    margin-left: 10px;
    font-size: 25px;
}

.nav-bar-element p {
    margin-left: 20px;
}

.notification-navbar {
    width: 30px;
    height: 30px;
    margin-left: auto;
    margin-right: 10px;
    background: var(--dark-grey);

    display: flex;
    justify-content: center;
    align-items: center;

    border-radius: 10px;
    box-shadow: 0px 0px 5px var(--dark-grey);
    color: white;
}

.notification-navbar p {
    margin: 0 !important;
}


.nav-bar-element-subtask {
    width: 80%;
    height: 5.5vh;
    background: #F8F7F9;
    border-radius: 10px;
    display: flex;
    align-items: center;
    margin-top: 10px;
    color: #383838;
    font-weight: bold;
    font-size: 17px;
}

.nav-bar-element-subtask .icon-navbar {
    margin-left: 10px;
    font-size: 25px;
}

.nav-bar-element-subtask p {
    margin-left: 20px;
}
    </style>
<div>
   <div class="left-side-bar">
        <div class="left-side-content">
          <p id="title-nav">Navigation</p>

          <div class="workspace-container">
            <div class="cur-workspace"></div>
            <p id="workspace-text">4BHITM<br />Workspace</p>
            <div class="workspace-arrows">
              <ion-icon name="chevron-up-outline"></ion-icon>
              <ion-icon name="chevron-down-outline"></ion-icon>
            </div>
          </div>

          <div class="nav-bar-element">
            <ion-icon name="albums-outline" class="icon-navbar"></ion-icon>
            <p>Dashboard</p>
          </div>

          <div class="nav-bar-element">
            <ion-icon name="checkbox-outline" class="icon-navbar"></ion-icon>
            <p>Tasks</p>
            <div class="notification-navbar"><p>3</p></div>
          </div>

          <div class="nav-bar-element">
            <ion-icon name="people-outline" class="icon-navbar"></ion-icon>
            <p>Workspaces</p>
            <ion-icon
              name="add-outline"
              style="margin-left: auto; margin-right: 15px"
              class="icon-navbar"
            ></ion-icon>
          </div>

          <div class="nav-bar-element">
            <ion-icon name="cog-outline" class="icon-navbar"></ion-icon>
            <p>Settings</p>
            <ion-icon
              name="chevron-down-outline"
              style="margin-left: auto; margin-right: 15px"
              class="icon-navbar"
            ></ion-icon>
          </div>

          <div class="nav-bar-element-subtask">
            <ion-icon name="sunny-outline" class="icon-navbar"></ion-icon>
            <p>Slidea</p>
          </div>

          <div class="nav-bar-element-subtask">
            <ion-icon name="person-outline" class="icon-navbar"></ion-icon>
            <p>Profile</p>
          </div>
        </div>
      </div>
      </div>
`;

  class Sidebar extends HTMLElement {
    constructor() {
      super();

      this.attachShadow({
        mode: 'open'
      });
      this.shadowRoot.appendChild(template.content.cloneNode(true));
      this.container = this.shadowRoot.querySelector('.side-bar-left');

    }

    connectedCallback() {
        this.container.style.width = "300px";
    }



    disconnectedCallback() {

    }
  }
window.customElements.define('side-bar', Sidebar);
})();
