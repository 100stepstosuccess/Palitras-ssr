import { generateId } from "./utils";

const EventEmiter = require("./eventEmiter");

export class Message {
  constructor(type, name, text, priority) {
    this._ObjectId = generateId();
    this.type = type;
    this.name = name;
    this.text = text;
    this.priority = priority;
  }

  getId() {
    return this._ObjectId;
  }
}

const MessageManager = {
  messages: [],
  listeners: new Map(),

  addListener: function(messages, listener) {
    messages.forEach(message => {
      this.listeners.set(message, listener);
    });
  },

  find: function(objId) {
    return this.messages.find(elem => elem._ObjectId === objId);
  },

  send: function(message, target) {
    this.listeners.forEach((emit, key) => {
      if (key === message.name) {
        message.target = target;
        emit(message);
      }
    });
  },

  addMessage: function(message) {
    this.messages.push(message);
    return message;
  }
};

export const passwordMessage = MessageManager.addMessage(
  new Message(
    "err",
    "password",
    "password should contain only letters and numbers",
    0
  )
);

export const passLengthMessage = MessageManager.addMessage(
  new Message(
    "err",
    "pass length",
    "password should be in the range from 3 to 16 characters!",
    1
  )
);

export const emailMessage = MessageManager.addMessage(
  new Message("err", "email", "email does not match schema", 0)
);

Object.assign(MessageManager, EventEmiter);

MessageManager.emit = function(type, id, target) {
  if (this.events[type]) {
    this.events[type].forEach(cb => cb(this.find(id), target));
  }
};

MessageManager.on("message", messageController.bind(MessageManager));

function messageController(message, target) {
  this.send(message, target);
}

export default MessageManager;
