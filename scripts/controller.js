export default class Controller {
    constructor(keyboard) {
        this.keyboard = keyboard;
        this.textarea = keyboard.getTextarea();
        this.keyboardButtons = keyboard.getKeyboardButtons();
        this.layoutLanguage = this.keyboard.language;

        this._shift = false;
        this._alt = false;
        this._capslook = false;
        this._ctrl = false;

        this.keyboardButtons.onmouseup = this.onMouseUp.bind(this);
        this.keyboardButtons.onmousedown = this.onMouseDown.bind(this);
        this.keyboardButtons.onmouseout = this.onMouseOut.bind(this);
        this.keyboardButtons.onkeydown = this.onKeyDown.bind(this);

        document.addEventListener('keydown', this.onKeyDown.bind(this));
        document.addEventListener('keyup', this.onKeyUp.bind(this));


    }

    space() {

    }

    tab() {

    }

    del() {

    }

    arrowTop() {

    }

    arrowDown() {

    }

    arrowLeft() {

    }

    arrowRight() {

    }

    capslook() {
        if (this._capslook) {
            this._capslook = false;
        } else {
            this._capslook = true;
        }
    }

    shift() {
        if (this._shift) {
            this._shift = false;
        } else {
            this._shift = true;
        }
    }

    ctrl() {
        if (this._ctrl) {
            this._ctrl = false;
        } else {
            this._ctrl = true;
        }
    }

    alt() {
        if (this._alt) {
            this._alt = false;
        } else {
            this._alt = true;
        }
    }

    addSymbolToTextArea(symbol) {
        this.textarea.value += symbol;
        this.textarea.focus();
    }

    changeLayout() {

    }

    onMouseDown(event) {
        if (event.target.tagName !== 'BUTTON') {
            return;
        }
        event.preventDefault();
        const isSpecial = event.target.classList.contains('button_special');
        const symbol = event.target.innerHTML;
        event.target.classList.add('button_active');
        if (isSpecial) {

        } else {
            this.addSymbolToTextArea(symbol);
        }
    }

    onMouseUp(event) {
        if (event.target.tagName !== 'BUTTON') {
            return;
        }
        event.target.classList.remove('button_active');
    }

    onMouseOut(event) {
        if (event.target.tagName !== 'BUTTON') {
            return;
        }
        event.target.classList.remove('button_active');
    }

    onKeyDown(event) {
        if (event.target.tagName == 'TEXTAREA') {
            event.preventDefault();
        }
        const button = this.keyboardButtons.querySelector(`#${event.code}`);
        const symbol = button.innerHTML;
        const isSpecial = button.classList.contains('button_special');
        button.classList.add('button_active');
        if (isSpecial) {

        } else {
            this.addSymbolToTextArea(symbol);
        }
    }

    onKeyUp(event) {
        if (event.target.tagName == 'TEXTAREA') {
            event.preventDefault();
        }
        const button = this.keyboardButtons.querySelector(`#${event.code}`);
        button.classList.remove('button_active');
    }
}