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

    this.container = this.shadowRoot.querySelector('.outerBox');
    this.form = this.shadowRoot.querySelector('#feedbackForm');
    this.corr = this.shadowRoot.querySelectorAll('.corr');
    this.title = this.shadowRoot.querySelector("#title");
    this.email = this.shadowRoot.querySelector("#email");
    this.category = this.shadowRoot.querySelector("#category");
    this.description = this.shadowRoot.querySelector("#description");
    this.closePopup = this.shadowRoot.querySelector(".blockclicks")

    this.initializeEvents();
  }


  submitIssueToServer(info) {
    sendRequestToServer({
      type: "POST",
      url: "/issues/submitIssue",
      data: info
    }).then(data => {
        stage.classList.remove('visible');
        stage.classList.add('hidden');
    })
  }

  initializeEvents() {
    let corr = this.corr;
    let stage = this;

    this.closePopup.onclick = function (e) {
      if (!e.target.classList.contains("blockclicks")) return;
      stage.classList.remove('visible');
      stage.classList.add('hidden');
    }

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

      if (!validImputs) {
        e.preventDefault();
      } else {
        console.log("FORM WAS SUBMITTED");
        var obj = {};
        obj["title"] = title;
        obj["cat"] = category;
        obj["desc"] = description;

        sendRequestToServer({
          type: "POST",
          url: "/issues/submitIssue",
          data: obj
        }).then(data => {
            stage.classList.remove('visible');
            stage.classList.add('hidden');
        })
      }

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
    // intialize start state
    this.classList.add('hidden');
  }

  disconnectedCallback() {
  }

  animateReportWindow() {
    this.classList.remove('hidden');
    this.classList.add('visible');

    this.container.classList.add('popTransition');
  }
}

window.customElements.define('feedback-form', FeedbackForm);