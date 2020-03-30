import Keyboard from './scripts/keyboard.js';
import Controller from './scripts/controller.js';

const language = localStorage.getItem('keyboardTaskLang') ? localStorage.getItem('keyboardTaskLang') : navigator.language;
const keyboard = new Keyboard(language);
const controller = new Controller(keyboard);

window.keyboard = keyboard;
keyboard.addKeyboardInElement(document.getElementsByTagName('body')[0]);

window.controller = controller;
