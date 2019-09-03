import { EventEmiter } from "../../helpers/helpers";
import Model from "./model";
import View from "./view";
import MessageManager from "../../data/messageManager";

class Controller extends EventEmiter {
  constructor(view, model) {
    super();
    this.view = view;
    this.model = model;
    this.inbox = [];
    this._targets = new Set();

    view.on("submit", this.submit.bind(this));
    this.on("message", this.saveMessage.bind(this));
  }

  submit(data) {
    console.log("submit");
    this.model.submit(data, () => {
      this.splitObj();
      this.filterMessages();

      if (this.inbox.length) {
        this.view.showErrors(this.inbox);
        this.clearMessages();
      }
    });

    // console.log(this.inbox);
  }

  saveMessage(message) {
    this._targets.add(message.target);
    this.inbox.push(message);
  }

  filterMessages() {
    const newInbox = [];

    this.inbox.forEach(messages => {
      const max = messages.reduce((prev, current) => {
        return prev.priority > current.priority ? prev : current;
      });
      newInbox.push(max);
    });

    this.inbox = newInbox;
  }

  splitObj() {
    const newInbox = new Map();
    for (const target of this._targets) {
      this.inbox.forEach(message => {
        if (message.target === target) {
          if (!newInbox.has(target)) {
            newInbox.set(target, []);
          }
          newInbox.get(target).push(message);
        }
      });
    }
    this.inbox = newInbox;
  }

  clearMessages() {
    if (this.inbox.length) {
      this.inbox.length = 0;
    }
  }
}

let controller;
if (document.querySelector("div.right form")) {
  controller = new Controller(new View(), new Model());
}

MessageManager.addListener(
  ["email", "password", "pass length", "field", "wrong email or password"],
  message => {
    controller.emit("message", message);
  }
);

export default controller;
