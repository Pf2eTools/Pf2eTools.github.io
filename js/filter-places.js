"use strict";

class PageFilterPlaces extends PageFilter {
	constructor () {
		super();
		this._categoryFilter = new Filter({header: "Category"});
	}
	mutateForFilters (it) {
		it._fSources = SourceFilter.getCompleteFilterSources(it);
	}

	addToFilters (it, isExcluded) {
		if (isExcluded) return;

		this._sourceFilter.addItem(it._fSources);
		this._categoryFilter.addItem(it.category);
	}

	async _pPopulateBoxOptions (opts) {
		opts.filters = [
			this._sourceFilter,
			this._categoryFilter,
		];
	}

	toDisplay (values, it) {
		return this._filterBox.toDisplay(
			values,
			it._fSources,
			it.category,
		)
	}
}
