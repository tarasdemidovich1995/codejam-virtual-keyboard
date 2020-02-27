import keyboard from './scripts/keyboard.js/index.js';
// import Controller from './scripts/controller.js'

const keyboard = new Keyboard(navigator.language);
// const controller = new Controller();

window.keyboard = keyboard;
keyboard.addKeyboardInElement(document.getElementsByTagName('body')[0]);
// window.controller = controller;