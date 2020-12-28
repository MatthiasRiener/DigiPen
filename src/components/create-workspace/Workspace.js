
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
        this.container = this.shadowRoot.querySelector('.left-side-bar');

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
        var workSpace = this.shadowRoot.querySelector('.workplace-picture');
        workSpace.style.height = `${workSpace.getBoundingClientRect().width}px`;
      }

    disconnectedCallback() {

    }
  }

window.customElements.define('create-workspace', Workspace);
