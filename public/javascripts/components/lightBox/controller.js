import { Base } from "../../helpers/helpers";

class Controller extends Base {
  constructor(view, model) {
    super();
    this.view = view;
    this.model = model;

    view.on("open", this.open.bind(this));
    view.on("close", this.close.bind(this));
    view.on("back", this.back.bind(this));
    view.on("forward", this.forward.bind(this));

    this.controlKeys();
  }

  controlModals() {
    this.view.controlModals(this.model.state);
  }

  controlKeys() {
    this.view.controlKeys(this.model.state);
  }

  open(data) {
    this.model.sendData(data);
    this.controlModals(data);
    this.view.animate("open", data);
  }

  close(data) {
    this.model.sendData(data);
    this.view.animate("close", this.model.state);
  }

  back(data) {
    this.model.back(data);
    this.view.renderImg(this.model.state);
  }

  forward(data) {
    this.model.forward(data);
    this.view.renderImg(this.model.state);
  }
}

export default Controller;
