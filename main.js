import Keyboard from './scripts/keyboard.js';
import Controller from './scripts/controller.js'

const keyboard = new Keyboard(navigator.language);
const controller = new Controller(keyboard);

window.keyboard = keyboard;
keyboard.addKeyboardInElement(document.getElementsByTagName('body')[0]);

window.controller = controller;