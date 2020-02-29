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
        const rowLength = 69;
        const start = this.textarea.selectionStart;
        const end = this.textarea.selectionEnd;
        const length = this.textarea.value.length;
        const enters = Array.from(this.textarea.value.matchAll(/\n/g)).map(elem => elem = elem.index);
        let base;
        if (direction == 'top') {
            const topEnters = enters.filter(elem => elem < start);
            if (topEnters.length == 1) {
                const firstEnter = topEnters[topEnters.length - 1];
                const curRowLength = (start - firstEnter - 1) % rowLength;
                const prevRowLength = firstEnter % rowLength;
                if (curRowLength >= prevRowLength) {
                    base = firstEnter;
                } else {
                    base = firstEnter - prevRowLength + curRowLength;
                }
            } else if (topEnters.length > 1) {
                const firstEnter = topEnters[topEnters.length - 1];
                const secondEnter = topEnters[topEnters.length - 2];
                const curRowLength = (start - firstEnter - 1) % rowLength;
                const prevRowLength = (firstEnter - secondEnter - 1) % rowLength;
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
            const bottomEnters = enters.filter(elem => elem >= end);
            const topEnters = enters.filter(elem => elem < end);
            if (bottomEnters.length == 1) {
                const firstEnter = bottomEnters[0];
                const curRowLength = topEnters.length != 0 ? (end - topEnters[topEnters.length - 1] - 1) % rowLength : end % rowLength;
                const nextRowLength = (length - firstEnter) % rowLength;
                if (curRowLength >= nextRowLength) {
                    base = (firstEnter + 1) + nextRowLength;
                } else {
                    base = (firstEnter + 1) + curRowLength;
                }
            } else if (bottomEnters.length > 1) {
                const firstEnter = bottomEnters[0];
                const secondEnter = bottomEnters[1];
                const curRowLength = topEnters.length != 0 ? (end - topEnters[topEnters.length - 1] - 1) % rowLength : end % rowLength;
                const nextRowLength = (secondEnter - firstEnter - 1) % rowLength;
                if (curRowLength >= nextRowLength) {
                    base = firstEnter + nextRowLength + 1;
                } else {
                    base = firstEnter + curRowLength + 1;
                }
            } else {
                if ((end + rowLength) < length) {
                    base = end + rowLength;
                }
            }
        }
        return base;
    }

    ArrowUp() {
        const base = this.calculateSelectionPosition('top');
        if (base !== undefined) this.textarea.setSelectionRange(base, base);
    }

    ArrowDown() {
        const base = this.calculateSelectionPosition('bottom');
        if (base !== undefined) this.textarea.setSelectionRange(base, base);
    }

    ArrowLeft() {
        const start = this.textarea.selectionStart;
        const end = this.textarea.selectionEnd;
        if (start != 0) {
            this.textarea.setSelectionRange(start - 1, end - 1);
        }
    }

    ArrowRight() {
        const start = this.textarea.selectionStart;
        const end = this.textarea.selectionEnd;
        const length = this.textarea.value.length;
        if (end != length) {
            this.textarea.setSelectionRange(start + 1, end + 1);
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