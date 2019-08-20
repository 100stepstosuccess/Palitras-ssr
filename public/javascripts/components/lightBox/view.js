import { EventEmiter } from "../../helpers/helpers";
import anime from "animejs/lib/anime.es.js";

class View extends EventEmiter {
  constructor() {
    super();
    this.imgList = [...document.querySelectorAll(".image-list img")];
    this.lightBox = document.querySelector(".light-box");
    this.currentImg = document.querySelector(".light-box .current-img");
    this.close = document.querySelector(".light-box .close");
    this.modalControl = document.querySelectorAll(".light-box .modal-control");

    this.close.addEventListener("click", this.closeLightBox.bind(this));
    this.modalControl[0].addEventListener("click", this.back.bind(this));
    this.modalControl[1].addEventListener("click", this.forward.bind(this));
    this.showCurrentImg();
  }

  showCurrentImg() {
    this.imgList.forEach((img, i, arr) => {
      img.addEventListener("click", e => {
        this.expose(this.lightBox);
        const index = arr.findIndex(image => e.target.src === image.src);

        const imgData = {
          isOpen: true,
          x: e.clientX,
          y: e.clientY,
          src: e.target.src,
          index
        };

        this.emit("open", imgData);
        this.currentImg.src = e.target.src;
      });
    });
  }

  controlModals(data) {
    if (data.index === 0) {
      this.hide(this.modalControl[0]);
    } else {
      this.expose(this.modalControl[0]);
    }

    if (data.index === this.imgList.length - 1) {
      this.hide(this.modalControl[1]);
    } else {
      this.expose(this.modalControl[1]);
    }
  }

  closeLightBox() {
    this.emit("close", {
      isOpen: false,
      index: null,
      src: null
    });
  }

  back() {
    this.emit("back", {
      imgList: this.imgList
    });
  }

  forward() {
    this.emit("forward", {
      imgList: this.imgList
    });
  }

  animate(type, args) {
    switch (type) {
      case "open":
        anime({
          targets: ".light-box",
          duration: 250,
          easing: "easeInOutQuad",
          delay: 100,
          scale: [0, 1],
          top: [args.y, 0],
          left: [args.x, 0]
        });
        break;
      case "close":
        anime({
          targets: ".light-box",
          duration: 250,
          easing: "easeInOutQuad",
          scale: 0,
          left: args.x,
          top: args.y,
          complete: () => {
            this.hide(this.lightBox);
          }
        });
    }
  }

  controlKeys(data) {
    document.body.addEventListener("keydown", e => {
      if (data.isOpen) {
        switch (e.key) {
          case "ArrowLeft":
            this.back();
            break;
          case "ArrowRight":
            this.forward();
            break;
          case "Escape":
            this.closeLightBox();
        }
      }
    });
  }

  renderImg(data) {
    this.controlModals(data);
    this.currentImg.src = data.src;
  }
}

export default View;
