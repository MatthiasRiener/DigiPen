
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
        this.container = this.shadowRoot.querySelector('.left-side-bar');
        this.workSpaceBtn = this.shadowRoot.querySelector('.add-workspace-btn');
        this.dashboardBtn = this.shadowRoot.querySelector('.dashboard-item');
        this.taskBtn = this.shadowRoot.querySelector('.task-item');
        this.profileBtn = this.shadowRoot.querySelector('.profile-item');
        this.quizBtn = this.shadowRoot.querySelector('.quiz-item');


        this.initializeEvents();
    }
      initializeEvents() {

        this.path = "../../../src";
          this.workSpaceBtn.addEventListener('click', e => {this.addWorkSpace() });

          // event listeners
          this.dashboardBtn.addEventListener('click', e => {console.log(window.location = `${this.path}/dashboard/index.html`)})
          this.taskBtn.addEventListener('click', e => {console.log(window.location = `${this.path}/task-management/index.html`)})
          this.profileBtn.addEventListener('click', e => {console.log(window.location = `${this.path}/profilseite/index.html`)})
          this.quizBtn.addEventListener('click', e => {console.log(window.location = `${this.path}/quiz/index.html`)})
      }

      addWorkSpace() {
        this.dispatchEvent(new CustomEvent('animWorkSpace', {}));
      }

      loadCss(path) {
          fetch(path)
          .then(response => response.text())
              .then(data => {
                  let node = document.createElement('style');
                  node.innerHTML = data;
                this.shadowRoot.appendChild(node);
                this.calculateWorkspaceWidth();
              });
      }
    connectedCallback() {


    }


      calculateWorkspaceWidth() {
        var workSpace = this.shadowRoot.querySelector('.cur-workspace');
        workSpace.style.width = `${workSpace.getBoundingClientRect().height}px`;
      }

    disconnectedCallback() {

    }
  }

window.customElements.define('side-bar', Sidebar);
