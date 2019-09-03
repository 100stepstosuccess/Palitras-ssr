import MessageManager, {
  Message,
  passLengthMessage,
  passwordMessage,
  emailMessage
} from "./messageManager";
const Person = require("./person");
const Customer = require("./customer");
const { selectProps, checkEmail, checkPassword } = require("./utils");

const User = Object.create(Person, {
  role: {
    set: function(role) {
      this._role = role;
    },
    get: function() {
      if (!this._role) {
        this._role = "user";
      }
      return this._role;
    }
  },
  password: {
    set: function(pass) {
      if (checkPassword(pass)) {
        this._password = pass;
      } else {
        emitPasswordLength(pass, "password");
        emitEmptyField(pass, "password");
        MessageManager.emit("message", passwordMessage.getId(), "password");
      }
    },
    get: function() {
      return this._password;
    }
  },
  email: {
    set: function(email) {
      if (checkEmail(email)) {
        this._email = email.toLowerCase();
      } else {
        emitEmptyField(email, "email");
        MessageManager.emit("message", emailMessage.getId(), "email");
      }
    },
    get: function() {
      return this._email;
    }
  }
});

User.arePassAndEmailValid = function(data) {
  this.email = data.email;
  this.password = data.password;

  if (this.email && this.password) {
    return true;
  } else {
    return false;
  }
};

User.changeData = function(data) {
  for (let elem in data) {
    this[elem] = data[elem];
    console.log(this[elem]);
  }
};

User.postData = function(data, url) {
  return fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
};

User.customer = Customer;
User.select = selectProps;

function emitPasswordLength(pass, target) {
  if (pass.length < 3 || pass.length > 16)
    MessageManager.emit("message", passLengthMessage.getId(), target);
}

function emitEmptyField(value, target) {
  if (!value) {
    const message = new Message("err", "field", `${target} is required!`, 2);
    MessageManager.addMessage(message);
    MessageManager.emit("message", message.getId(), target);
  }
}

export default User;
