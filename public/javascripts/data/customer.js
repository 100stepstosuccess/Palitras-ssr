const Customer = {
  _plan: "trial",
  plans: ["trial", "premium"],

  set plan(plan) {
    const plans = this.plans;

    if (plans.includes(plan)) {
      this._plan = plan;
    } else user.emit("error", ["can not set this plan"]);
  },
  get plan() {
    return this._plan;
  },

  addPlan(plan) {
    this.plans.push(plan);
  }
};

module.exports = Customer;
