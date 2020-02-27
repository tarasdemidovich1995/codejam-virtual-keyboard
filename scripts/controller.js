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
        this._arrowBase = null;

        this.keyboardButtons.onmouseup = this.onMouseUp.bind(this);
        this.keyboardButtons.onmousedown = this.onMouseDown.bind(this);
        this.keyboardButtons.onmouseout = this.onMouseOut.bind(this);
        this.keyboardButtons.onkeydown = this.onKeyDown.bind(this);

        document.addEventListener('keydown', this.onKeyDown.bind(this));
        document.addEventListener('keyup', this.onKeyUp.bind(this));
    }

    space() {
        this.addSymbolToTextArea('\s');
    }

    enter() {
        this.addSymbolToTextArea('\n');
    }

    tab() {
        this.addSymbolToTextArea('\t');
    }

    win() {

    }

    del() {
        const start = this.textarea.selectionStart;
        const end = this.textarea.selectionEnd;
        if (end == start) {
            this.textarea.setRangeText('', start, end + 1);
        } else {
            this.textarea.setRangeText('', start, end);
        }
    }

    ArrowUp() {

    }

    ArrowDown() {

    }

    ArrowLeft() {
        const start = this.textarea.selectionStart;
        const end = this.textarea.selectionEnd;
        if (start != 0) {
            if (this._shift && !this._arrowBase) {
                this._arrowBase = start;
            }
            if (this._shift) {
                if (end > this._arrowBase) {
                    this.textarea.setSelectionRange(this._arrowBase, end - 1);
                } else {
                    this.textarea.setSelectionRange(start - 1, this._arrowBase);
                }
            } else {
                if (start != end) {
                    this.textarea.setSelectionRange(start, start);
                    this._arrowBase = null;
                } else {
                    this.textarea.setSelectionRange(start - 1, end - 1);
                }
            }
        }
    }

    ArrowRight() {
        const start = this.textarea.selectionStart;
        const end = this.textarea.selectionEnd;
        const length = this.textarea.value.length;
        if (end != length) {
            if (this._shift && !this._arrowBase) {
                this._arrowBase = start;
            }
            if (this._shift) {
                if (start < this._arrowBase) {
                    this.textarea.setSelectionRange(start + 1, this._arrowBase);
                } else {
                    this.textarea.setSelectionRange(this._arrowBase, end + 1);
                }
            } else {
                if (start != end) {
                    this.textarea.setSelectionRange(end, end);
                    this._arrowBase = null;
                } else {
                    this.textarea.setSelectionRange(start + 1, end + 1);
                }
            }
        }
    }

    backspace() {
        const start = this.textarea.selectionStart;
        const end = this.textarea.selectionEnd;
        if (end == start && start != 0) {
            this.textarea.setRangeText('', start - 1, end);
        } else {
            this.textarea.setRangeText('', start, end);
        }
    }

    capslock(type) {
        if (type == 'mousedown' || type == 'keydown') {
            this._capslook = !this._capslook;
        }
    }

    shift(type) {
        switch (true) {
            case type == 'mousedown' || type == 'keydown':
                this._shift = true;
                break;
            case type == 'mouseup' || type == 'mouseout' || type == 'keyup':
                this._shift = false;
                break;
        }
    }

    ctrl(type) {
        switch (true) {
            case type == 'mousedown' || type == 'keydown':
                this._ctrl = true;
                break;
            case type == 'mouseup' || type == 'mouseout' || type == 'keyup':
                this._ctrl = false;
                break;
        }
    }

    alt(type) {
        switch (true) {
            case type == 'mousedown' || type == 'keydown':
                this._alt = true;
                break;
            case type == 'mouseup' || type == 'mouseout' || type == 'keyup':
                this._alt = false;
                break;
        }
    }

    addSymbolToTextArea(symbol) {
        const start = this.textarea.selectionStart;
        const end = this.textarea.selectionEnd;
        this.textarea.setRangeText(symbol, start, end);
        this.textarea.setSelectionRange(start + 1, start + 1);
        this.textarea.focus();
    }

    changeLayout() {

    }

    onMouseDown(event) {
        if (event.target.tagName !== 'BUTTON') return;
        event.preventDefault();
        const isSpecial = event.target.classList.contains('button_special');
        const symbol = isSpecial ?
            event.target.classList.contains('button_special_arrow') ? event.target.getAttribute('id') : event.target.textContent :
            event.target.textContent;
        if (isSpecial) {
            this[symbol](event.type);
        } else {
            this.addSymbolToTextArea(symbol);
        }
        event.target.classList.add('button_active');
    }

    onMouseUp(event) {
        if (event.target.tagName !== 'BUTTON') return;
        event.preventDefault();
        const symbol = event.target.textContent;
        if (['shift', 'alt', 'ctrl'].includes(symbol)) {
            this[symbol](event.type);
        }
        event.target.classList.remove('button_active');
    }

    onMouseOut(event) {
        if (event.target.tagName !== 'BUTTON') return;
        event.preventDefault();
        const symbol = event.target.textContent;
        if (['shift', 'alt', 'ctrl'].includes(symbol)) {
            this[symbol](event.type);
        }
        event.target.classList.remove('button_active');
    }

    onKeyDown(event) {
        event.preventDefault();
        const button = this.keyboardButtons.querySelector(`#${event.code}`);
        const isSpecial = button.classList.contains('button_special');
        const symbol = isSpecial ?
            button.classList.contains('button_special_arrow') ? button.getAttribute('id') : button.textContent :
            button.textContent;
        if (isSpecial) {
            this[symbol](event.type);
        } else {
            this.addSymbolToTextArea(symbol);
        }
        button.classList.add('button_active');
    }

    onKeyUp(event) {
        event.preventDefault();
        const button = this.keyboardButtons.querySelector(`#${event.code}`);
        const symbol = button.textContent;
        if (['shift', 'alt', 'ctrl'].includes(symbol)) {
            this[symbol](event.type);
        }
        button.classList.remove('button_active');
    }
}