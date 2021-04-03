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
    this.corr = this.shadowRoot.querySelectorAll('.corr');
    this.title = this.shadowRoot.querySelector("#title");
    this.email = this.shadowRoot.querySelector("#email");
    this.category = this.shadowRoot.querySelector("#category");
    this.description = this.shadowRoot.querySelector("#description");

    this.initializeEvents();
  }

  initializeEvents() {
    let corr = this.corr;

    this.form.onsubmit = function (e) {
      e.preventDefault();

      let validImputs = true;
      corr.forEach(element => {
        element.style.display = "none";
      });

      let title = this.title.value;
      if (title.trim().length == 0) {
        validImputs = false;
        corr[0].style.display = "block";
      }

      let email = this.email.value;
      if (!validateEmail(email.trim())) {
        validImputs = false;
        corr[1].style.display = "block";
      }

      let category = this.category.value;
      if (category.length == 0) {
        validImputs = false;
        corr[2].style.display = "block";
      }

      let description = this.description.value;
      if (description.trim().length == 0) {
        validImputs = false;
        corr[3].style.display = "block";
      }

      if (!validImputs)
        e.preventDefault();
    }

    function validateEmail(email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }
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