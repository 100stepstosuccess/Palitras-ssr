import User from "../../data/user";
import MessageManager, { Message } from "../../data/messageManager";

class Model {
  constructor() {
    this.state = {};
    this.user = Object.create(User);
  }

  async submit(data, cb) {
    if (this.user.arePassAndEmailValid(data)) {
      const res = await this.user.postData(data, window.location.href);
      const resJson = await res.json();

      if (resJson.route) {
        window.location.replace(`${window.location.origin}/${resJson.route}`);
      } else {
        const thisMessage = MessageManager.addMessage(
          new Message("err", `${resJson.message}`, `${resJson.message}`, 3)
        );
        MessageManager.emit("message", thisMessage.getId(), "password");
      }
    }
    cb();
  }
}

export default Model;
