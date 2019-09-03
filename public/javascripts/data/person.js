const Person = {
  firstName: "",
  lastName: "",
  city: "",
  country: "",
  about: "",
  gender: "",
  birthDay: "",
  getFullName: function() {
    return `${this.firstName} ${this.lastName}`;
  }
};

export default Person;
