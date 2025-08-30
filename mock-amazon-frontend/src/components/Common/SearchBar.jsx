import { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch, placeholder = "Search products..." }) => {
    const [query, setQuery] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            onSearch(query.trim());
        }
    };

    return (
        <form className="search-bar" onSubmit={handleSubmit}>
            <input
                type="text"
                className="search-input"
                placeholder={placeholder}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit" className="search-button">
                <span className="search-icon">🔍</span>
            </button>
        </form>
    );
};

export default SearchBar;