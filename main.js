import Constructor from './scripts/constructor.js';
// import Controller from './scripts/controller.js'

const constructor = new Constructor(navigator.language);
// const controller = new Controller();

window.constructor = constructor;
constructor.addKeyboardInElement(document.getElementsByTagName('body')[0]);
// window.controller = controller;