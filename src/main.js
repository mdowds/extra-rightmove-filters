import {span, div, checkbox, label} from './html-elements';
import ResultsPage from "./ResultsPage";
import Filters from "./filters";

function setUpFilterControls(resultsPage) {
    const controlsLabel = span({text: 'Additional filters'});
    const groundFloorCheckbox = checkbox({
        id: 'erm-filter-ground-floor',
        onClick: (checkbox) => {
            checkbox.checked ?
                Filters.addFilter(Filters.groundFloor, resultsPage) :
                Filters.removeFilter(Filters.groundFloor, resultsPage);
        }
    });
    const groundFloorLabel = label({subjectId: groundFloorCheckbox.id, text: 'Ground floor flats'});
    const groundFloorContainer = div({children: [groundFloorCheckbox, groundFloorLabel]});
    const filterControls = div({children: [controlsLabel, groundFloorContainer]});

    const resultsList = document.getElementById('l-searchResults');
    document.getElementById('propertySearch-results-container').insertBefore(filterControls, resultsList);
}

function setUpSearchHeader() {
    const searchHeader = document.getElementById('searchHeader');
    const filterCountText = span({id: 'erf-filter-results', text: '(0 filtered)'});
    searchHeader.appendChild(filterCountText);
}

console.log('Extra filters loaded');

const resultsPage = new ResultsPage(document);
setUpSearchHeader();
setUpFilterControls(resultsPage);
