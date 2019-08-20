class Base {
  setState(newState) {
    for (let stateName in this.state) {
      if (newState.hasOwnProperty(stateName)) {
        this.state[stateName] = newState[stateName];
      }
    }
  }

  hide(elem) {
    this.addClass(elem, "hide");
  }

  expose(elem) {
    this.removeClass(elem, "hide");
  }

  addClass(elem, className) {
    if (elem.length) {
      [...elem].forEach(item => {
        item.classList.add(className);
      });
    } else {
      elem.classList.add(className);
    }
  }

  removeClass(elem, className) {
    if (elem.length) {
      [...elem].forEach(item => {
        item.classList.remove(className);
      });
    } else {
      elem.classList.remove(className);
    }
  }
}

class EventEmiter extends Base {
  constructor() {
    super();
    this.events = {};
  }

  on(type, cb) {
    this.events[type] = this.events[type] || [];
    this.events[type].push(cb);
  }

  emit(type, args) {
    if (this.events[type]) {
      this.events[type].forEach(cb => cb(args));
    }
  }
}

export { EventEmiter, Base };
