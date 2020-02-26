class Constructor {

    layoutEngLowerCase = [
        ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'backspace'],
        ['tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'],
        ['capslock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'enter'],
        ['shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'shift'],
        ['ctrl', 'win', 'alt', 'space', 'alt', 'win', 'ctrl']
    ];
    layoutEngUpperCase = [
        ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 'backspace'],
        ['tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '{', '}', '|'],
        ['capslock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', '"', 'enter'],
        ['shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?', 'shift'],
        ['ctrl', 'win', 'alt', 'space', 'alt', 'win', 'ctrl']
    ];

    layoutRuLowerCase = [
        ['ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'backspace'],
        ['tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\',],
        ['capslock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'enter'],
        ['shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', 'shift'],
        ['ctrl', 'win', 'alt', 'space', 'alt', 'win', 'ctrl']
    ];
    layoutRuUpperCase = [
        ['Ё', '!', '"', '№', ';', '%', ':', '?', '*', '(', ')', '_', '+', 'backspace'],
        ['tab', 'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ', '|'],
        ['capslock', 'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э', 'enter'],
        ['shift', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', ',', 'shift'],
        ['ctrl', 'win', 'alt', 'space', 'alt', 'win', 'ctrl']
    ];

    layoutKeyCode = [
        ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace'],
        ['Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash'],
        ['CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter'],
        ['ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ShiftRight'],
        ['ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'MetaRight', 'ControlRight']
    ];

    deleteNArrowsLayout = [
        ['del'],
        ['&uarr;'],
        ['&larr;', '&darr;', '&rarr;']
    ];

    deleteNArrowsLayoutKeyCode = [
        ['Delete'],
        ['ArrowUp'],
        ['ArrowLeft', 'ArrowDown', 'ArrowRight']
    ]

    specialButtons = [
        'tab',
        'capslock',
        'shift',
        'ctrl',
        'win',
        'space',
        'backspace',
        'del',
        'alt',
        'enter',
        '&uarr;',
        '&larr;',
        '&darr;',
        '&rarr;'
    ];

    colorsEng = {
        'green': "012qazp;[]-='/",
        'blue': '3wsx9ol.',
        'purple': '4edc8ik,',
        'yellow': '7ujmyhn',
        'orange': '6tgb5rfv',
    }
    colorsRu = {
        'green': '12йфя0-=зхъжэ.',
        'blue': '3цыч9щдю',
        'purple': '8шлб4увс',
        'yellow': '7гнроьт',
        'orange': '65кеапми',
    };


    constructor(language = 'ru-RU', element) {
        if (language == 'ru-RU') {
            this.language = 'ru-RU';
            this.layout = this.layoutRuLowerCase;
        } else {
            this.language = 'en-US';
            this.layout = this.layoutEngLowerCase;
        }
        this.keyboard = this.createKeyboard();
        element.appendChild(this.keyboard);
    }

    createKeyboard() {
        const container = this.createElement('div', ['container']);
        const keyboard = this.createElement('section', ['keyboard'], { id: 'keyboard' });
        const keyboardField = this.createElement('div', ['keyboard__field']);
        const textarea = this.createElement('textarea', ['keyboard__textarea'], { id: 'textarea' });
        const keyboardButtons = this.createElement('div', ['keyboard__buttons']);
        const keyboardButtonsLeft = this.createLayout('div', ['keyboard__buttons-left'], this.layout, this.layoutKeyCode);
        const keyboardButtonsRight = this.createLayout('div', ['keyboard__buttons-right'], this.deleteNArrowsLayout, this.deleteNArrowsLayoutKeyCode);

        keyboardField.appendChild(textarea);

        keyboardButtons.appendChild(keyboardButtonsLeft);
        keyboardButtons.appendChild(keyboardButtonsRight);

        keyboard.appendChild(keyboardField);
        keyboard.appendChild(keyboardButtons);

        container.appendChild(keyboard);

        return container;
    }

    isSpecial(button) {
        return this.specialButtons.includes(button);
    }

    getColor(button) {
        const colors = this.language === 'ru-RU' | 'ru' ? this.colorsRu : this.colorsEng;
        for (let key in colors) {
            if (colors[key].includes(button)) return key;
        }
        return 'default';
    }

    createElement(tagName, classList, attributes, content) {
        const elem = document.createElement(tagName);
        for (let i = 0; i < classList.length; i++) {
            elem.classList.add(classList[i]);
        }
        if (attributes) {
            for (let key in attributes) {
                elem.setAttribute(key, attributes[key]);
            }
        }
        if (content) {
            elem.innerHTML = content;
        }
        return elem;
    }

    createLayout(tagName, classList, layout, keyCode) {
        const elem = this.createElement(tagName, classList);
        for (let i = 0; i < layout.length; i++) {
            const keyboardRow = this.createElement('div', ['keyboard__buttons-row']);
            for (let j = 0; j < layout[i].length; j++) {
                const buttonElem = this.createButton(layout[i][j], keyCode[i][j])
                keyboardRow.appendChild(buttonElem);
            }
            elem.appendChild(keyboardRow);
        }
        return elem;
    }

    createButton(content, keyCode) {
        const buttonClasses = ['button'];
        const color = this.getColor(content);
        if (this.isSpecial(content)) {
            buttonClasses.push('button_special');
            if (content.includes('arr')) {
                buttonClasses.push('button_special_arrow');
            } else {
                buttonClasses.push(`button_special_${content}`);
            }
        } else {
            buttonClasses.push('button_default');
            buttonClasses.push(`button_${color}`);
        }
        return this.createElement('button', buttonClasses, { id: `${keyCode}` }, content);
    }
}