console.log('Extra filters loaded');
const searchHeader = document.getElementById('searchHeader');
searchHeader.innerHTML += '<span id="erf-filter-results">(0 filtered)</span>';

function htmlElement(name, callback) {
    const el = document.createElement(name);
    callback(el);
    return el;
}

function span(options) {
    return htmlElement('span', (el) => {
        el.appendChild(document.createTextNode(options.text));
    });
}

function div(options) {
    return htmlElement('div', (el) => {
        options.children.forEach((child) => el.appendChild(child));
    });
}

function checkbox(options) {
    return htmlElement('input', (el) => {
        el.setAttribute('type', 'checkbox');
        el.setAttribute('id', options.id);
        options.onClick && el.addEventListener('click', options.onClick);
    });
}

function label(options) {
    return htmlElement('label', (el) => {
        el.setAttribute('for', options.subjectId);
        el.appendChild(document.createTextNode(options.text))
    })
}

function setUpFilterControls() {
    const controlsLabel = span({text: 'Additional filters'});
    const groundFloorCheckbox = checkbox({
        id: 'erm-filter-ground-floor',
        onClick: filterGroundFloor
    });
    const groundFloorLabel = label({subjectId: groundFloorCheckbox.id, text: 'Ground floor flats'});
    const groundFloorContainer = div({children: [groundFloorCheckbox, groundFloorLabel]});
    const filterControls = div({children: [controlsLabel, groundFloorContainer]});

    const resultsList = document.getElementById('l-searchResults')
    document.getElementById('propertySearch-results-container').insertBefore(filterControls, resultsList);
}

setUpFilterControls();

const results = document.getElementsByClassName('l-searchResult');

function filterGroundFloor() {
    var numberFiltered = 0;
    [...results].forEach(
        (result, index) => {
            if(result.classList.contains('is-hidden')) return;
            const description = result.querySelector('.propertyCard-description a.propertyCard-link span');
            if(description == null) {
                console.log("null description at index " + index);
                return;
            }
            if(description.innerHTML.includes('ground floor')) {
                result.innerHTML = 'Filtered (ground floor)';
                numberFiltered++;
            }
        }
    );
    console.log(numberFiltered);
    document.getElementById('erf-filter-results').innerHTML = '('+numberFiltered+' filtered)';
}


