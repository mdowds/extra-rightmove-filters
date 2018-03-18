import {span, div, checkbox, label} from './html-elements';

function setUpFilterControls(stateObject) {
    const controlsLabel = span({text: 'Additional filters'});
    const groundFloorCheckbox = checkbox({
        id: 'erm-filter-ground-floor',
        onClick: () => filterGroundFloor(stateObject)
    });
    const groundFloorLabel = label({subjectId: groundFloorCheckbox.id, text: 'Ground floor flats'});
    const groundFloorContainer = div({children: [groundFloorCheckbox, groundFloorLabel]});
    const filterControls = div({children: [controlsLabel, groundFloorContainer]});

    const resultsList = document.getElementById('l-searchResults');
    document.getElementById('propertySearch-results-container').insertBefore(filterControls, resultsList);
}

class SearchResult {
    constructor(element, description) {
        this.element = element;
        this.description = description;
        this.isFiltered = false;
    }

    shouldBeFiltered(filterFunctions) {
        return filterFunctions.reduce((currentValue, f) => f(this) || currentValue);
    }
}

function setUpInitialState() {
    const state = {
        results: [],
        numberFiltered: 0,
        activeFilters: []
    };

    const resultElements = document.getElementsByClassName('l-searchResult');
    [...resultElements].forEach((result) => {
        if(result.classList.contains('is-hidden')) return;
        const description = result.querySelector('.propertyCard-description a.propertyCard-link span');
        state.results.push(new SearchResult(result, description));
    });

    return state;
}

function updatePage(stateObject) {
    stateObject.results.forEach((result) => {
        if(result.isFiltered === false && result.shouldBeFiltered(stateObject.activeFilters) === true) {
            result.element.innerHTML = 'Filtered';
            stateObject.numberFiltered++;
        }
    });

    console.log(stateObject.numberFiltered);
    document.getElementById('erf-filter-results').innerHTML = '('+stateObject.numberFiltered+' filtered)';
}

function filterGroundFloor(stateObject) {
    const groundFloorFilter = (result) => result.description.innerHTML.includes('ground floor');
    stateObject.activeFilters.push(groundFloorFilter);
    updatePage(stateObject);
}

console.log('Extra filters loaded');

const searchHeader = document.getElementById('searchHeader');
const filterCountText = span({id: 'erf-filter-results', text: '(0 filtered)'});
searchHeader.appendChild(filterCountText);

const state = setUpInitialState();
setUpFilterControls(state);
