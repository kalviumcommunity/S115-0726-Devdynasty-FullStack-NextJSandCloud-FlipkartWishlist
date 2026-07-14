"use client";

function CategoryFilter({ categories = [], selectedCategory = "", onCategorySelect, onClear }) {
  return (
    <div className="category-filter">
      <div className="category-filter-header">
        <div>
          <p className="section-label">Filter by category</p>
          <p className="section-note">Narrow products using category or choose all.</p>
        </div>
        <button
          type="button"
          className="clear-filter"
          onClick={() => onClear?.()}
          disabled={!selectedCategory}
        >
          {selectedCategory ? "Clear filter" : "Show all"}
        </button>
      </div>

      <div className="category-filter-buttons">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            className={`category-chip ${selectedCategory === category ? "active" : ""}`}
            onClick={() => onCategorySelect?.(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="category-filter-select">
        <label className="visually-hidden" htmlFor="category-select">
          Select category
        </label>
        <select
          id="category-select"
          value={selectedCategory}
          onChange={(event) => onCategorySelect?.(event.target.value)}
        >
          <option value="">All categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default CategoryFilter;
