function htmlElement(name, callback) {
    const el = document.createElement(name);
    callback(el);
    return el;
}

export function span({id, text}) {
    return htmlElement('span', (el) => {
        el.appendChild(document.createTextNode(text));
        if(id !== undefined) el.setAttribute('id', id);
    });
}

export function div(options) {
    return htmlElement('div', (el) => {
        options.children.forEach((child) => el.appendChild(child));
    });
}

export function checkbox({id, onClick}) {
    return htmlElement('input', (el) => {
        el.setAttribute('type', 'checkbox');
        el.setAttribute('id', id);
        if(onClick !== undefined) el.addEventListener('click', onClick);
    });
}

export function label(options) {
    return htmlElement('label', (el) => {
        el.setAttribute('for', options.subjectId);
        el.appendChild(document.createTextNode(options.text))
    })
}
