export default class SearchResult {
    constructor(element, description) {
        this.element = element;
        this.description = description;
        this.isFiltered = false;
    }

    shouldBeFiltered(filterFunctions) {
        return filterFunctions.reduce((currentValue, f) => f(this) || currentValue, false);
    }
}
