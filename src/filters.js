function removeFilter(filter, resultsPage) {
    resultsPage.activeFilters = resultsPage.activeFilters.filter(f => f.id !== filter.id);
    resultsPage.update();
}

function addFilter(filter, resultsPage) {
    resultsPage.activeFilters.push(filter);
    resultsPage.update();
}

const groundFloorFilter = {
    id: 'groundFloor',
    func: (result) => {
        if(result.description === null) return false;
        return result.description.includes('ground floor');
    }
};

export default {
    addFilter: addFilter,
    removeFilter: removeFilter,
    groundFloor: groundFloorFilter
};
