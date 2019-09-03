const EventEmiter = {
  events: {},

  on: function(type, cb) {
    this.events[type] = this.events[type] || [];
    this.events[type].push(cb);
  },

  emit: function(type, args) {
    if (this.events[type]) {
      this.events[type].forEach(cb => cb(...args));
    }
  }
};

module.exports = EventEmiter;
