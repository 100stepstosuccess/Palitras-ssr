const settingsForm = document.forms.settings;

settingsForm &&
  settingsForm.addEventListener("submit", e => {
    e.preventDefault();
    const data = {};
    [...settingsForm.elements].forEach(elem => {
      const type = elem.getAttribute("type");
      if (type === "text") {
        const name = elem.getAttribute("name");
        data[name] = elem.value;
      }
    });
    console.log(data);

    fetch("/settings", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(r => r.json())
      .then(data1 => {
        console.log(data1);
      });
  });
