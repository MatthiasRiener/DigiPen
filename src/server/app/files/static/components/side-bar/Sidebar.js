
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
    this.scrollerContainer = this.shadowRoot.querySelector("#sidebar-scroller-container");
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

    this.generalTab = this.shadowRoot.querySelector("#general-tab");
    this.otherTab = this.shadowRoot.querySelector("#other-tab");

    this.sidebarTab = this.shadowRoot.querySelector(".side-bar-sections-tab-item");

    this.userImg = this.shadowRoot.querySelector("#profile-image");

    this.getUserInfo();
    this.initializeEvents();
    this.checkIfAdmin();
    this.getWorkspaces();
    this.getNotificationsCount();


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

    
    this.generalTab.addEventListener('click', e => { 
      this.generalTab.classList.add("active-tab");
      this.otherTab.classList.remove("active-tab");
      this.shadowRoot.querySelector("#general-section").style.display = "block";
      this.shadowRoot.querySelector("#other-section").style.display = "none";

    })
    this.otherTab.addEventListener('click', e => {
      this.generalTab.classList.remove("active-tab");
      this.otherTab.classList.add("active-tab");

      this.shadowRoot.querySelector("#general-section").style.display = "none";
      this.shadowRoot.querySelector("#other-section").style.display = "block";


    })

  }


  getUserInfo() {
    sendRequestToServer({ type: "GET", url: "/profile/user" }).then(data => {
      this.userImg.style.backgroundImage = `url('${data.img}')`;
      this.shadowRoot.querySelector("#profile-container-username").innerHTML = data.name;
      this.shadowRoot.querySelector("#profile-container-email").innerHTML = data.mail;
    });
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
    console.log("FETCHING WORKSPACES")
    sendRequestToServer({
      type: "GET",
      url: "/workspace/getWorkspaces"
    }).then(data => {
      console.log(data)
      this.shadowRoot.querySelector("#organizations-title").innerHTML += ` (${data.res.length})`
      data.res.forEach(workspace => {
        this.shadowRoot.querySelector("#workspace-container-filler").insertAdjacentHTML('beforeend', `
        <div class="team-item">
          <div class="team-banner" style="background: ${workspace.w_color}"></div>
          <div class="team-name"><p>${workspace.w_name}</p></div>
        </div>`);
      });
    })
  }


  getNotificationsCount() {
    sendRequestToServer({
      type: "GET",
      url: "/dashboard/getInvites"
    }).then(data => {
      this.shadowRoot.querySelector("#notifications-count").innerHTML = data.count;
    });
  }

  checkIfAdmin() {
    sendRequestToServer({
      type: "GET",
      url: "/authentication/isAdmin"
    }).then(data => {
      if (!data.res) {
        this.adminBtn.style.display = "none";
      }
    })
  }


  navigateToAdminPanel() {
    sendRequestToServer({
      type: "GET",
      url: "/authentication/isAdmin"
    }).then(data => {
      if (data.res) {
        window.location = baseURL + `/admin`
      }
    })
  }
}

window.customElements.define('side-bar', Sidebar);
