const imgList = [...document.querySelectorAll(".image-list img")];
const lightBox = document.querySelector(".light-box");
const currentImg = document.querySelector(".light-box .current-img");
const close = document.querySelector(".light-box .close");
const back = document.querySelector(".back");
const forward = document.querySelector(".forward");

const state = {
  current: 0
};

imgList &&
  imgList.forEach((img, i, arr) => {
    img.addEventListener("click", e => {
      lightBox.classList.remove("hide");
      currentImg.src = e.target.src;
      const index = arr.findIndex(image => e.target.src === image.src);
      state.current = index;
      console.log(index + " clicked.");
    });
  });

close &&
  close.addEventListener("click", () => {
    lightBox.classList.add("hide");
  });

forward &&
  forward.addEventListener("click", () => {
    if (state.current <= imgList.length) {
      state.current++;
      changeCurrent();
    }
  });

back &&
  back.addEventListener("click", () => {
    if (state.current !== 0) {
      state.current--;
      changeCurrent();
    }
  });

function changeCurrent() {
  const { current } = state;
  const image = imgList.find((elem, i) => current === i);
  currentImg.src = image.src;
  console.log(current);
}
