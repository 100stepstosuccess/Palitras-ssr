const spinner = document.querySelector(".spinner");

document.querySelector("div.right input.btn").addEventListener("click", e => {
  e.preventDefault();

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
    const message = request.response != "" ? JSON.parse(request.response) : {};

    if (request.readyState == 3) {
      spinner.style.display = "block";
    }
    if (request.readyState == 4 && request.status == 200) {
      spinner.style.display = "none";
      window.location.replace(`${window.location.origin}/${message}`);
    }
    if (request.readyState == 4 && request.status > 400) {
      setTimeout(() => {
        spinner.style.display = "none";
      }, 1000);

      const p = document.createElement("p");

      console.log(message);
      p.className = "err-message";
      p.textContent = message;
      rightForm.appendChild(p);
    }
  });
});
