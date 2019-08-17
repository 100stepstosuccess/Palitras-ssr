const spinner = document.querySelector(".spinner");
const submitBtn = document.querySelector("div.right input.btn");
const rightForm = document.querySelector(".right form");

export default submitBtn &&
  submitBtn.addEventListener("click", e => {
    e.preventDefault();
    const val = e.target.value;
    const errMessage = document.querySelector("div.right .err-message");
    rightForm.removeChild(errMessage);

    const data = {
      email: document.querySelector(".email").value,
      password: document.querySelector(".password").value
    };

    fetch(`${window.location.href}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => {
        e.target.value = null;
        spinner.style.display = "block";
        return res.json();
      })
      .then(res => {
        setTimeout(() => {
          e.target.value = val;
          spinner.style.display = "none";
        }, 1000);

        if (res.route) {
          window.location.replace(`${window.location.origin}/${res.route}`);
        } else {
          const err = `<p class="err-message">${res.message}</p>`;
          rightForm.insertAdjacentHTML("beforeend", err);
        }
      });
  });
