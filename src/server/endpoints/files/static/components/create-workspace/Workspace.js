
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
        this.container = this.shadowRoot.querySelector('.workspace-container');

        this.shadowRoot.querySelector('.btn-create-ws').addEventListener('click', e => {this.createWorkspace()});
    }

      loadCss(path) {
          fetch(`http://localhost:5000/static/components/create-workspace/styles.css`)
          .then(response => response.text())
              .then(data => {
                  let node = document.createElement('style');
                  node.innerHTML = data;
                this.shadowRoot.appendChild(node);
                this.calculateWorkspaceWidth();
              });
      }
    connectedCallback() {
        // intialize start state
        this.classList.add('hidden');
    }



      calculateWorkspaceWidth() {
        var workSpace = this.shadowRoot.querySelector('.workplace-picture');
        workSpace.style.height = `${workSpace.getBoundingClientRect().width}px`;
      }

    disconnectedCallback() {

    }
    animateWorkspace() {
        this.classList.remove('hidden');
        this.classList.add('visible');

        this.container.classList.add('popTransition');

    }

    createWorkspace() {
        this.classList.remove('visible');
        this.classList.add('hidden');
        this.container.classList.remove('popTransition');
    }
  }

window.customElements.define('create-workspace', Workspace);
