const picture = document.querySelector(".picture");
const pictureForm = document.querySelector(".picture-form");
const submit = document.querySelector(".picture-form .btn");
const inputs = document.querySelectorAll(".picture-form .form-control");
const inputGroups = document.querySelectorAll(".picture-form .input-group");

picture && picture.addEventListener("change", previewImage);
submit && submit.addEventListener("click", onSubmit);

let uploadedImg;
function previewImage(event) {
  const reader = new FileReader();
  reader.onload = () => {
    const output = document.querySelector(".outputImage");
    output.src = reader.result;
  };
  reader.readAsDataURL(event.target.files[0]);
  uploadedImg = event.target.files[0];
}

function onSubmit(e) {
  e.preventDefault();
  const errNode = document.querySelectorAll(".picture-form .err");

  [...errNode].forEach(elem => {
    pictureForm.removeChild(elem);
  });

  checkFields() && toRequest();
}

function checkFields() {
  const filledArray = [...inputs].map((elem, i) => {
    return {
      input: elem,
      isValid: false
    };
  });

  filledArray.forEach((elem, i) => {
    if (elem.input.value || elem.input.file) {
      elem.isValid = true;
    } else {
      const p = document.createElement("p");
      p.innerText = "field is required!";
      p.className = "err";
      inputGroups[i].insertAdjacentElement("afterend", p);
    }
  });

  return filledArray.every(elem => elem.isValid);
}

function toRequest() {
  const formData = new FormData();
  formData.append(
    "picture",
    new Blob([uploadedImg], { type: uploadedImg.type }),
    uploadedImg.name
  );
  formData.append("name", inputs[0].value);

  fetch("/add-picture", {
    method: "POST",
    body: formData
  })
    .then(r => r.json())
    .then(data => {
      const p = document.createElement("p");
      p.innerText = data.message;
      p.className = "success";
      submit.insertAdjacentElement("afterend", p);
    });
}
