
import { template } from './template.js';

class Sidebar extends HTMLElement {
  constructor() {
    super();

    this.temp = document.createElement('template');
    this.temp.innerHTML = template;


    this.attachShadow({
      mode: 'open'
    });

    this.shadowRoot.appendChild(this.temp.content.cloneNode(true));
    this.loadCss(this.getAttribute("path"));
    this.container = this.shadowRoot.querySelector('.left-side-content');
    this.workSpaceBtn = this.shadowRoot.querySelector('.add-workspace-btn');
    this.dashboardBtn = this.shadowRoot.querySelector('.dashboard-item');
    this.taskBtn = this.shadowRoot.querySelector('.task-item');
    this.profileBtn = this.shadowRoot.querySelector('.profile-item');
    this.quizBtn = this.shadowRoot.querySelector('.quiz-item');
    this.logoutBtn = this.shadowRoot.querySelector('.logout-item');
    this.notificationBtn = this.shadowRoot.querySelector('.notification-item');
    this.reportBugBtn = this.shadowRoot.querySelector('.report-bug-item');

    this.adminBtn = this.shadowRoot.querySelector('.admin-item');

    this.workspaceText = this.shadowRoot.querySelector('#workspace-text');
    this.workspaceIMG = this.shadowRoot.querySelector('.cur-workspace');

    this.initializeEvents();
    this.checkIfAdmin();
    this.getWorkspaces();
  }
  initializeEvents() {

    this.workSpaceBtn.addEventListener('click', e => { this.addWorkSpace() });
    this.notificationBtn.addEventListener('click', e => { this.checkNotifications() })
    this.reportBugBtn.addEventListener('click', e => { this.openReportWindow() })

    // event listeners
    this.dashboardBtn.addEventListener('click', e => { window.location.href = baseURL + `/dashboard` })
    this.taskBtn.addEventListener('click', e => { window.location = baseURL + `/task` })
    this.profileBtn.addEventListener('click', e => { window.location = baseURL + `/profile` })
    this.quizBtn.addEventListener('click', e => { window.location = `${this.path}/quiz/index.html` })
    this.logoutBtn.addEventListener('click', e => { logOut() })


    this.adminBtn.addEventListener('click', e => { this.navigateToAdminPanel() })
  }

  addWorkSpace() {
    this.dispatchEvent(new CustomEvent('animWorkSpace', {}));
  }

  checkNotifications() {
    this.dispatchEvent(new CustomEvent('animNotifications', {}));
  }

  openReportWindow() {
    this.dispatchEvent(new CustomEvent('animReportWindow', {}));
  }

  loadCss(path) {
    fetch(baseURL + `/static/components/side-bar/styles.css`)
      .then(response => response.text())
      .then(data => {
        let node = document.createElement('style');
        node.innerHTML = data;
        this.shadowRoot.appendChild(node);
      });
  }
  connectedCallback() {

  }

  

  disconnectedCallback() {

  }

  getWorkspaces() {
    sendRequestToServer({
      type: "GET",
      url: "/workspace/getWorkspaces"
    }).then(data => {
      data.res.forEach(workspace => {
        this.container.insertAdjacentHTML('beforeend', `
        <div class="team-item">
          <div class="team-banner" style="background: ${workspace.w_color}"></div>
          <div class="team-name"><p>${workspace.w_name}</p></div>
        </div>`);
      });
    })
  }

  checkIfAdmin() {
    sendRequestToServer({
      type: "GET",
      url: "/auth/isAdmin"
    }).then(data => {
      if (!data.res) {
        this.adminBtn.style.display = "none";
      }
    })
  }


  navigateToAdminPanel() {
    sendRequestToServer({
      type: "GET",
      url: "/auth/isAdmin"
    }).then(data => {
      if (data.res) {
        window.location = baseURL + `/admin`
      }
    })
  }
}

window.customElements.define('side-bar', Sidebar);
