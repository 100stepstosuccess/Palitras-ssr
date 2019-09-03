import { EventEmiter } from "../../helpers/helpers";
import anime from "animejs/lib/anime.es.js";

function htmlMessage(text, className) {
  const errHtml = document.createElement("p");
  errHtml.className = className;
  errHtml.textContent = text;
  return errHtml;
}

class View extends EventEmiter {
  constructor() {
    super();
    this.spinner = document.querySelector(".spinner");
    this.submitBtn = document.querySelector("div.right input.btn");
    this.rightForm = document.querySelector("div.right form");
    this.email = document.querySelector(".email");
    this.password = document.querySelector(".password");
    this.submit();
  }

  submit() {
    this.submitBtn.addEventListener("click", e => {
      e.preventDefault();
      this.clearMessages();
      this.clearStyles();
      const btnValue = e.target.value;

      this.emit(
        "submit",
        {
          email: this.email.value,
          password: this.password.value
        },
        btnValue
      );
    });
  }

  showErrors(errs) {
    errs.forEach(err => {
      const errHtml = htmlMessage(err.text, "err");
      this.insertMessage(errHtml, err.target);
    });
  }

  clearMessages() {
    document.querySelectorAll(".right .err").forEach(elem => {
      elem.parentElement.removeChild(elem);
    });
  }

  insertMessage(message, target) {
    this[target].style.borderBottom = "1px solid #fc5c65";
    insertAfter(message, this[target]);
  }

  clearStyles() {
    this.email.style.borderBottom = "1px solid #9a9da1";
    this.password.style.borderBottom = "1px solid #9a9da1";
  }
}

function insertAfter(newNode, referenceNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

export default View;
