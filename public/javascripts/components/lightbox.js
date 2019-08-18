const imgList = [...document.querySelectorAll(".image-list img")];
const lightBox = document.querySelector(".light-box");
const currentImg = document.querySelector(".light-box .current-img");
const close = document.querySelector(".light-box .close");
const modalControl = document.querySelectorAll(".light-box .modal-control");
import anime from "animejs/lib/anime.es.js";
console.log(modalControl);

const state = {
  currentImg: {
    index: 0,
    src: null,
    x: 0,
    y: 0
  }
};

imgList &&
  imgList.forEach((img, i, arr) => {
    img.addEventListener("click", e => {
      lightBox.classList.remove("hide");
      const index = arr.findIndex(image => e.target.src === image.src);
      const imgData = {
        x: e.clientX,
        y: e.clientY,
        src: e.target.src,
        index
      };

      state.currentImg = { ...imgData };
      renderImg();
    });
  });

function renderImg() {
  const { x, y, src } = state.currentImg;
  currentImg.src = src;

  anime({
    targets: ".light-box",
    duration: 250,
    easing: "easeInOutQuad",
    delay: 200,
    scale: [0, 1],
    top: [y, 0],
    left: [x, 0]
  });
}

close &&
  close.addEventListener("click", e => {
    let x = e.clientX;
    let y = e.clientY;
    anime({
      targets: ".light-box",
      duration: 250,
      easing: "easeInOutQuad",
      scale: 0,
      left: x,
      top: y,
      complete: () => {
        lightBox.classList.add("hide");
      }
    });
  });

function toForward() {
  if (state.currentImg.index <= imgList.length) {
    state.currentImg.index++;
    changeCurrent();
  }
}

function toBack() {
  if (state.currentImg.index !== 0) {
    state.currentImg.index--;
    changeCurrent();
  }
}

function changeCurrent() {
  const { index } = state.currentImg;
  const image = imgList.find((elem, i) => index === i);
  currentImg.src = image.src;
}

modalControl.forEach((elem, i) => {
  elem.addEventListener("mouseover", () => {
    elem.firstChild.style.color = "#69efdf";
  });
  elem.addEventListener("mouseout", () => {
    elem.firstChild.style.color = "black";
  });
  if (i == 0) {
    elem.addEventListener("click", toBack);
  } else {
    elem.addEventListener("click", toForward);
  }
});
