
(function () {
  const template = document.createElement('template');

  template.innerHTML = `
    <style>

.header-nav {
  height: 7vh;
  background: #FFFFFF;

  display: flex;
  align-items: center;

  box-shadow: 0px 1px 5px #00000050;
}

.header-nav p {
  padding: 0 !important;
  margin: 0 !important;

  color: var(--dark-grey);
}

.header-nav #logo {
  font-weight: bold;
  font-size: 26px;
  margin: 0px 50px 0px 50px !important;
}

.content-right-container {
  margin-left: auto;
  text-align: right;
}

.content-right-container p:nth-of-type(1) {
  font-weight: bold;
}

.nav-profile-image {
  width: 50px;
  height: 50px;
  background-position: center;
  background-size: cover;

  margin-right: 55px;
  margin-left: 20px;

  border-radius: 50%;
}
    </style>
    <div class="header-nav">
    <p id="logo">Slidea</p>
    <div class="content-right-container">
      <p id="username" ></p>
      <p id="role" ></p>
    </div>
    <div class="nav-profile-image"></div>
  </div>
  `;

  class Sidebar extends HTMLElement {
    constructor() {
      super();

      this.attachShadow({
        mode: 'open'
      });
      this.shadowRoot.appendChild(template.content.cloneNode(true));

      this.username = this.shadowRoot.querySelector('.content-right-container #username');
      this.userrole = this.shadowRoot.querySelector('.content-right-container #role');
      this.userImg = this.shadowRoot.querySelector('.nav-profile-image');
    }

    connectedCallback() {
      this.userImg.style.backgroundImage = `url('${this.getAttribute("img")}')`;
      this.username.innerHTML = this.getAttribute('username');
      this.userrole.innerHTML = this.getAttribute("role");
    }

    disconnectedCallback() {

    }
  }
window.customElements.define('side-bar', SideBar);
})();
