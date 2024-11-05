// Header.js
import React from 'react';
import '../stylesheets/header.css';

const Header = ({ showView, currentView, searchPosts  }) => {
  const handleSearch = (event) => {
    if (event.key === 'Enter') {
      console.log("we pressed enter");
      const query = event.target.value.trim();
      if (query) {
        searchPosts(query);
      }
      event.target.value = ''; // Clear the search box after searching
    }
  };

  return (
    <div id="header" className="banner">
      <ul className="banner-list">
        <li className="banner-item-title">
          <a href="#" onClick={() => showView('home')} className="title">Phreddit</a>
        </li>
        <li className="banner-item-search">
          <input type="text" className="search-box" placeholder="Search Phreddit" onKeyDown={handleSearch} />
        </li>
        <li className="banner-item-post">
          <button
            className={`create-post-button ${currentView === 'createPost' ? 'active' : ''}`}
            onClick={() => showView('createPost')}
          >
            Create Post
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Header;
