const spinner = document.querySelector(".spinner");

document.querySelector(".btn").addEventListener("click", e => {
  e.preventDefault();

  const data = {
    email: document.querySelector(".email").value,
    password: document.querySelector(".password").value
  };

  const request = new XMLHttpRequest();
  request.open("POST", "http://localhost:3000/login", true);
  request.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
  request.send(JSON.stringify(data));
  request.addEventListener("readystatechange", () => {
    if (request.readyState == 2) {
      spinner.style.display = "block";
    }
    if (request.readyState == 4 && request.status == 200) {
      spinner.style.display = "none";
      window.location.replace(`${window.location.origin}/home`);
    }
    if (request.readyState == 4 && request.status > 400) {
      spinner.style.display = "none";

      const p = document.createElement("p");
      const rightPart = document.querySelector(".right-part");
      const message = JSON.parse(request.response).message;
      console.log(message);
      p.className = "err-message";
      p.textContent = message;
      rightPart.insertBefore(p, rightPart.firstChild);
    }
  });
});
