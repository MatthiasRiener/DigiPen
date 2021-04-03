import {
  template
} from './template.js';

class FeedbackForm extends HTMLElement {
  constructor() {
    super();

    this.temp = document.createElement('template');
    this.temp.innerHTML = template;

    this.attachShadow({
      mode: 'open',
    });

    this.shadowRoot.appendChild(this.temp.content.cloneNode(true));
    this.loadCss(this.getAttribute("path"));

    this.form = this.shadowRoot.querySelector('#feedbackForm');

    this.initializeEvents();
  }

  initializeEvents() {
    this.form.addEventListener('submit', e => { this.checkForm() });
  }

  checkForm() {
    this.dispatchEvent(new CustomEvent('checkForm', {}));
  }

  loadCss(path) {
    fetch('http://localhost:5000/static/components/feedback-form/styles.css')
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
}

window.customElements.define('feedback-form', FeedbackForm);