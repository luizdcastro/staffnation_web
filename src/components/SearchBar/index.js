import React from 'react';
import * as FiIcons from 'react-icons/fi'

import './styles.css';

const SearchBar = ({ onChange }) => {
    return (
        <div className="search-container">
            <FiIcons.FiSearch className="search-icon" style={{ fontSize: 28 }} />
            <input
                className="search-input"
                placeholder="Barcar pela função ou nome"
                type="text"
                onChange={onChange}
            />
            <FiIcons.FiMoreVertical className="filter-icon" style={{ fontSize: 28 }} />
        </div>
    );
};

export default SearchBar;