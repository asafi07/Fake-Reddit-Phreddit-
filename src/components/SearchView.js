// SearchView.js
import React from 'react';
// import '../stylesheets/searchView.css';

function SearchView({ matchingPosts, showPost }) {
  return (
    <div id="search-view">
      <h2>Search Results</h2>
      {matchingPosts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        <div className="post-list">
          {matchingPosts.map(post => (
            <div
              key={post.postID}
              className="post-item"
              onClick={() => showPost(post.postID)} // Allows clicking on a post to view it
            >
              <h2>{post.title}</h2>
              <p>{post.content.substring(0, 100)}...</p>
              <p>Posted by {post.postedBy}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchView;
