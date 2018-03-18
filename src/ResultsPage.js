import SearchResult from "./SearchResult";
import {span} from "./html-elements";

export default class ResultsPage {
    constructor(document) {
        this.results = [];
        this.numberFiltered = 0;
        this.activeFilters = [];
        this.resultsCountSpan = document.getElementById('erf-filter-results');

        const resultElements = document.getElementsByClassName('l-searchResult');
        [...resultElements].forEach((resultElement) => {
            if(resultElement.classList.contains('is-hidden')) return;
            const descriptionSpan = resultElement.querySelector('.propertyCard-description a.propertyCard-link span');
            const description  = descriptionSpan === null ? null : descriptionSpan.innerHTML;
            this.results.push(new SearchResult(resultElement, description));
        });
    }

    update() {
        this.results.forEach((result) => {
            const filterFunctions = this.activeFilters.map(f => f.func);
            const propertyCard = result.element.querySelector('.propertyCard');

            if(result.isFiltered === false && result.shouldBeFiltered(filterFunctions) === true) {
                propertyCard.classList.add('erm-filtered');
                result.element.appendChild(span({text: 'Filtered', className: 'erm-filter-message'}));
                result.isFiltered = true;
                this.numberFiltered++;
            }

            if(result.isFiltered === true && result.shouldBeFiltered(filterFunctions) === false) {
                propertyCard.classList.remove('erm-filtered');
                const filterMessage = result.element.querySelector('.erm-filter-message');
                result.element.removeChild(filterMessage);
                result.isFiltered = false;
                this.numberFiltered--;
            }
        });

        this.resultsCountSpan.innerHTML = '('+this.numberFiltered+' filtered)';
    }
}
