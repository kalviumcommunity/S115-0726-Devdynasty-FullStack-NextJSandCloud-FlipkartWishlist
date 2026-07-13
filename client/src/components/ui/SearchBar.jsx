function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar">
      <label className="visually-hidden" htmlFor="product-search">
        Search products
      </label>
      <input
        id="product-search"
        type="search"
        placeholder="Search products, brands, categories..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}

export default SearchBar;
