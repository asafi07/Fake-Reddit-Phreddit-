import React from 'react';
import '../stylesheets/navBar.css'; // Import the CSS

const Navbar = ({ model, showCommunity, showview, activeView, currentCommunity }) => {
  return (
    <div id="nav" className="navbar">
      <div className="navbarlist">
      <p 
          onClick={() => showview('home')}
          className={`home ${activeView === 'home' ? 'active' : ''}`}
        >
          Home
        </p>
        <div id = "nav-divider"></div>
        <p className="Communities">Communities</p>
        <div id="create-community">
          <button
            onClick={() => showview('createCommunity')}
            className={`${activeView === 'createCommunity' ? 'active' : ''}`}
          >
            Create Community
          </button>
        </div>
        <ul className="Communities_List">
          {model.data.communities.map((community) => (
            <li
              key={community.communityID}
              onClick={() => showCommunity(community.communityID)}
              className={`community-link ${activeView === 'communitySection' && currentCommunity === community.communityID ? 'active-community' : ''}`}
            >
              <p>r/{community.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
