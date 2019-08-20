import Controller from "./controller";
import Model from "./model";
import View from "./view";

document.querySelector(".light-box") && new Controller(new View(), new Model());
