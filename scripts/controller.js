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

        document.addEventListener('mousedown', this.onMouseDown.bind(this));
        document.addEventListener('mouseup', this.onMouseUp.bind(this));
        document.addEventListener('mouseout', this.onMouseOut.bind(this));

        document.addEventListener('keydown', this.onKeyDown.bind(this));
        document.addEventListener('keyup', this.onKeyUp.bind(this));
    }

    space() {
        this.addSymbolToTextArea(' ');
    }

    enter() {
        this.addSymbolToTextArea('\n');
    }

    tab() {
        // this.addSymbolToTextArea('\t');
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

    calculateSelectionPosition(direction) {
        const rowLength = 57;
        const start = this.textarea.selectionStart;
        const end = this.textarea.selectionEnd;
        const length = this.textarea.value.length;
        const enters = Array.from(this.textarea.value.matchAll(/\n/g)).map(elem => elem = elem.index);
        let base;
        if (direction == 'top') {
            const topEnters = enters.filter(elem => elem < start);
            if (topEnters.length == 1) {
                const firstEnter = topEnters[topEnters.length - 1];
                const curRowLength = (start - firstEnter) % rowLength;
                const prevRowLength = firstEnter % rowLength;
                if (curRowLength >= prevRowLength) {
                    base = firstEnter;
                } else {
                    base = (firstEnter - 1) - prevRowLength + curRowLength;
                }
            } else if (topEnters.length > 1) {
                const firstEnter = topEnters[topEnters.length - 1];
                const secondEnter = topEnters[topEnters.length - 2];
                const curRowLength = (start - firstEnter) % rowLength;
                const prevRowLength = (firstEnter - secondEnter) % rowLength;
                if (curRowLength >= prevRowLength) {
                    base = firstEnter;
                } else {
                    base = firstEnter - prevRowLength + curRowLength;
                }
            } else {
                if (start > rowLength) {
                    base = start - rowLength;
                }
            }
        }

        if (direction == 'bottom') {
            const bottomEnters = enters.filter(elem => elem > start);
            const topEnter = enters.filter(elem => elem < start)[topEnters.length - 1];
            if (bottomEnters.length == 1) {
                const firstEnter = bottomEnters[0];
                const curRowLength = (start - firstEnter) % rowLength;
                const prevRowLength = firstEnter % rowLength;
                if (curRowLength >= prevRowLength) {
                    base = firstEnter;
                } else {
                    base = (firstEnter - 1) - prevRowLength + curRowLength;
                }
            } else if (bottomEnters.length > 1) {
                const firstEnter = bottomEnters[bottomEnters.length - 1];
                const secondEnter = bottomEnters[bottomEnters.length - 2];
                const curRowLength = (start - firstEnter) % rowLength;
                const prevRowLength = (firstEnter - secondEnter) % rowLength;
                if (curRowLength >= prevRowLength) {
                    base = firstEnter;
                } else {
                    base = firstEnter - prevRowLength + curRowLength;
                }
            } else {
                if (start > rowLength) {
                    base = start - rowLength;
                }
            }
        }
        return base;
    }

    ArrowUp() {
        const rowLength = 57;
        const start = this.textarea.selectionStart;
        const end = this.textarea.selectionEnd;
        const base = this.calculateSelectionPosition('top');
        this.textarea.setSelectionRange(base, base);
    }

    ArrowDown() {
        const rowLength = 57;
        const length = this.textarea.value.length;
        const start = this.textarea.selectionStart;
        const end = this.textarea.selectionEnd;

        if (true) {

        } else {
            this.textarea.setSelectionRange(enterPos, enterPos);
        }
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
            // доделать при start == 0
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
            // доделать при end == length
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