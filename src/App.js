import React, { useState } from 'react';
import Header from "./components/Header";
import Home from './components/Home';
import CreatePost from './components/CreatePost';
import CreateCommunity from './components/CreateCommunity';
import CommunitySection from './components/CommunitySection';
import PostSection from './components/PostSection';
import SearchView from './components/SearchView'; // Import the new SearchView

import Model from './models/model';
import Navbar from './components/Navbar';
import './stylesheets/main.css';
import './stylesheets/home.css';
import './stylesheets/header.css';
import './stylesheets/navBar.css';

function App() {
  const [view, setView] = useState('home'); // Control which page is shown
  const [model, setModel] = useState(new Model()); // Initialize the model
  const [currentCommunity, setCurrentCommunity] = useState(null); // Track current community
  const [currentPost, setCurrentPost] = useState(null); // Track the selected post
  const [searchedPosts, setSearchedPosts] = useState(null); // Holds search results
  const [selectedPostID, setSelectedPostID] = useState(null);

  const showView = (viewName) => {
    setView(viewName);
    if (viewName === 'home') {
      setSearchedPosts(null); // Clear search results when returning to home
    }
    setSelectedPostID(null); // Reset post selection
    setView(viewName); // Set view state based on the clicked view
  };

  const showCommunity = (communityID) => {
    setCurrentCommunity(communityID);
    setView('communitySection');
  };

  const showPost = (postID) => {
    setSelectedPostID(postID);
    setView('postSection');
  };


  const handlePostClick = (postID) => {
    // Find the post in the model and increment its views
    const updatedPosts = model.data.posts.map(post => {
      if (post.postID === postID) {
        return { ...post, views: (post.views || 0) + 1 }; // Increment views
      }
      return post;
    });

    // Update the model with the incremented view count
    setModel(prevModel => ({
      ...prevModel,
      data: {
        ...prevModel.data,
        posts: updatedPosts,
      },
    }));

    setSelectedPostID(postID); // Set the post ID to show full post view
    setView('postSection'); // Switch to post section view
  };


  const searchPosts = (query) => {
    console.log("we are searching");
    const searchTerms = query.split(' ');
    let matchingPosts = [];

    model.data.posts.forEach(post => {
      const postMatches = searchTerms.some(term => post.title.includes(term) || post.content.includes(term));
      const commentMatches = searchTerms.some(term =>
        post.commentIDs.some(commentID => {
          const comment = model.data.comments.find(comment => comment.commentID === commentID);
          return comment && comment.content.includes(term);
        })
      );

      if (postMatches || commentMatches) {
        matchingPosts.push(post);
        console.log('matched');
        console.log(post);
      }
    });
    setSearchedPosts(matchingPosts); // Update state with search results
    setView('search'); // Show SearchView for search results
  };

  return (
    <div id = "main" className="main-class">
      <Header showView={showView} currentView={view} searchPosts = {searchPosts} /> {/* Pass current view */}

      
      <Navbar model={model} showCommunity={showCommunity} showview={showView} activeView={view}  currentCommunity={currentCommunity} />
      
      {/* FrontPage will render different views based on the state */}
      <div id="front-page">
        {view === 'home' && <Home model={model} handlePostClick={handlePostClick} />} {/* Pass handlePostClick */}
        {view === 'search' && <SearchView matchingPosts={searchedPosts} showPost={showPost} />}
        {view === 'createPost' && <CreatePost model={model} showHomePage={() => showView('home')} />}
        {view === 'createCommunity' && ( <CreateCommunity model={model} showCommunity={showCommunity} /> )}
        {view === 'communitySection' && (
          <CommunitySection model={model} communityID={currentCommunity} showPost={showPost} handlePostClick={handlePostClick}/>
        )}
        {view === 'postSection' && (
           <PostSection postID={selectedPostID} model={model} showHomePage={() => showView('home')} />
        )}
      </div>
    </div>
  );
}

export default App;
