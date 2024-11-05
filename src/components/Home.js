import React, { useState } from 'react';
import '../stylesheets/home.css';

function Home({ model, showView , handlePostClick }) {
  const [sortedPosts, setSortedPosts] = useState([...model.data.posts]);

  // Format the timestamp for relative time display
  const formatTimestamp = (postedDate) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now - new Date(postedDate)) / 1000);
    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minute(s) ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hour(s) ago`;
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} day(s) ago`;
    return `${Math.floor(diffInSeconds / 2592000)} month(s) ago`;
  };

  // Sort posts by newest first
const sortPostsByNewest = () => {
  const sorted = [...model.data.posts].sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));
  setSortedPosts(sorted);
};

// Sort posts by oldest first
const sortPostsByOldest = () => {
  const sorted = [...model.data.posts].sort((a, b) => new Date(a.postedDate) - new Date(b.postedDate));
  setSortedPosts(sorted);
};

// Sort posts by most active (most recent comment date)
const sortPostsByMostActive = () => {
  const sorted = [...model.data.posts].sort((a, b) => {
    const mostRecentCommentDateA = getMostRecentCommentDate(a);
    const mostRecentCommentDateB = getMostRecentCommentDate(b);
    return new Date(mostRecentCommentDateB) - new Date(mostRecentCommentDateA);
  });
  setSortedPosts(sorted);
};


  // Helper function to get the most recent comment date for a post
  const getMostRecentCommentDate = (post) => {
    if (post.commentIDs.length === 0) return new Date(0); // Return epoch if no comments

    const comments = post.commentIDs.map(commentID =>
      model.data.comments.find(comment => comment.commentID === commentID)
    );
    const mostRecentComment = comments.sort((a, b) => new Date(b.commentedDate) - new Date(a.commentedDate))[0];
    return mostRecentComment ? mostRecentComment.commentedDate : new Date(0);
  };

  return (
    <div id="front-page">
      <div id="header-section">
        <div id="title-container">
          <h1 id="header-title">All Posts</h1>
          <p id="post-count">{sortedPosts.length} Posts</p>
        </div>

        <div id="button-container">
          <button className="sort-button" onClick={sortPostsByNewest}>Newest</button>
          <button className="sort-button" onClick={sortPostsByOldest}>Oldest</button>
          <button className="sort-button" onClick={sortPostsByMostActive}>Active</button>
        </div>
      </div>

      <div className="divider" />

      {/* Post list - posts displayed in a grid */}
      <div className="post-list">
        {sortedPosts.map(post => {
          const community = model.data.communities.find(c => c.postIDs.includes(post.postID)) || { name: 'Unknown' };
          const truncatedContent = post.content.substring(0, 80) + '...'; // First 20 characters of post content
          const flair = post.linkFlairID 
            ? model.data.linkFlairs.find(l => l.linkFlairID === post.linkFlairID)?.content || '' 
            : '';

          // Get total comments including replies
          const totalComments = countCommentsAndReplies(post.commentIDs, model);

          return (
            <div key={post.postID} id="post-item" onClick={() => handlePostClick(post.postID)}>
              {/* Community name, user, and timestamp */}
              <div className="post-meta">
                <span className="community-name">r/{community.name}</span>
                <span className="separator"> | </span>
                <span className="post-creator">Posted by {post.postedBy}</span>
                <span className="separator"> | </span>
                <span className="post-timestamp">{formatTimestamp(post.postedDate)}</span>
              </div>

              {/* Post Title */}
              <h2 className="post-title">{post.title}</h2>

              {/* Link Flair */}
              {flair && <p className="post-flair">Flair: {flair}</p>}

              {/* First 20 characters of post content */}
              <p className="post-content">{truncatedContent}</p>

              {/* View and Comment counts */}
              <div className="post-stats">
                <span className="post-views">Views: {post.views || 0}</span>
                <span className="separator"> | </span>
                <span className="post-comments">Comments: {totalComments}</span>
              </div>
            </div>
            
           
          );
        })}
      </div>
      <div id="empty-container"></div>
    </div>
  );
}

// Helper function to count comments and replies recursively
const countCommentsAndReplies = (commentIDs, model) => {
  let totalComments = 0;

  commentIDs.forEach(commentID => {
    const comment = model.data.comments.find(c => c.commentID === commentID);
    if (comment) {
      totalComments++; // Count the comment itself

      // Recursively count replies
      if (comment.commentIDs && comment.commentIDs.length > 0) {
        totalComments += countCommentsAndReplies(comment.commentIDs, model);
      }
    }
  });

  return totalComments;
};


export default Home;
