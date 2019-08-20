import { Base } from "../../helpers/helpers";

class Model extends Base {
  constructor() {
    super();
    this.state = {
      isOpen: false,
      imgList: [],
      src: null,
      index: null,
      x: null,
      y: null
    };
  }

  sendData(newState) {
    this.setState(newState);
  }

  changeCurrent(imgList) {
    const { index } = this.state;
    const image = imgList.find((elem, i) => index === i);

    this.setState({ src: image.src });
  }

  back({ imgList }) {
    if (this.state.index !== 0) {
      this.setState({ index: --this.state.index });
      this.changeCurrent(imgList);
    }
  }

  forward({ imgList }) {
    if (this.state.index < imgList.length - 1) {
      this.setState({ index: ++this.state.index });
      this.changeCurrent(imgList);
    }
  }
}

export default Model;
