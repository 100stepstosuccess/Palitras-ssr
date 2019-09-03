import MessageManager from "./messageManager";

export function checkEmail(email) {
  const regex = /\S+@\S+\.\S+/;
  return regex.test(email) ? true : false;
}

export function checkPassword(pass) {
  const regex = /^[a-zA-Z0-9]{3,16}$/;
  return regex.test(pass) ? true : false;
}

export function selectProps(props) {
  const propsObj = {};
  props.forEach((prop, i) => {
    if (props.includes(prop)) {
      propsObj[prop] = this[prop];
    }
  });
  return propsObj;
}

export function generateId() {
  return `_${Math.random()
    .toString(36)
    .substr(2, 9)}`;
}
