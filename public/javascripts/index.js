const spinner = document.querySelector(".spinner");

const submitBtn = document.querySelector("div.right input.btn");

submitBtn.addEventListener("click", e => {
  e.preventDefault();
  const val = e.target.value;

  const errMessage = document.querySelector("div.right .err-message");
  const rightForm = document.querySelector(".right form");
  rightForm.removeChild(errMessage);

  const data = {
    email: document.querySelector(".email").value,
    password: document.querySelector(".password").value
  };

  const request = new XMLHttpRequest();
  request.open("POST", `${window.location.href}`, true);
  request.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
  request.send(JSON.stringify(data));
  request.addEventListener("readystatechange", () => {
    const data = request.response != "" ? JSON.parse(request.response) : {};

    if (request.readyState == 3) {
      e.target.value = null;
      spinner.style.display = "block";
    }
    if (request.readyState == 4 && request.status == 200) {
      window.location.replace(`${window.location.origin}/${data.route}`);
    }
    if (request.readyState == 4 && request.status > 400) {
      setTimeout(() => {
        e.target.value = val;
        spinner.style.display = "none";
      }, 1000);

      const p = document.createElement("p");

      console.log(data);
      p.className = "err-message";
      p.textContent = data.message;
      rightForm.appendChild(p);
    }
  });
});
