"use strict";

class PageFilterTraits extends PageFilter {
	constructor () {
		super();
		this._categoryFilter = new Filter({header: "Categories"});
	}

	mutateForFilters (it) {
		it._fSources = SourceFilter.getCompleteFilterSources(it);
	}

	addToFilters (it, isExcluded) {
		if (isExcluded) return;

		this._sourceFilter.addItem(it._fSources);
		if (it.categories) this._categoryFilter.addItem(it.categories.filter(c => !c.startsWith("_")));
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
			it.categories || [],
		)
	}
}
