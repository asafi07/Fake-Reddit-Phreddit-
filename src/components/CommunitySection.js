import React from 'react';
import '../stylesheets/communitySection.css';

class CommunitySection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sortOption: 'newest' // Default sort option
    };
  }

  // Method to handle sorting changes
  handleSort = (option) => {
    this.setState({ sortOption: option });
  };

  // Helper method to get sorted posts based on selected option
  getSortedPosts() {
    const { model, communityID } = this.props;
    const community = model.data.communities.find(c => c.communityID === communityID);
    const communityPosts = community ? model.data.posts.filter(post => community.postIDs.includes(post.postID)) : [];

    switch (this.state.sortOption) {
      case 'newest':
        return [...communityPosts].sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));
      case 'oldest':
        return [...communityPosts].sort((a, b) => new Date(a.postedDate) - new Date(b.postedDate));
      case 'active':
        return [...communityPosts].sort((a, b) => {
          const mostRecentCommentDateA = this.getMostRecentCommentDate(a);
          const mostRecentCommentDateB = this.getMostRecentCommentDate(b);
          return new Date(mostRecentCommentDateB) - new Date(mostRecentCommentDateA);
        });
      default:
        return communityPosts;
    }
  }

  // Helper function to get the most recent comment date for a post
  getMostRecentCommentDate(post) {
    const { model } = this.props;
    if (post.commentIDs.length === 0) return new Date(0); // Return epoch if no comments

    const comments = post.commentIDs.map(commentID =>
      model.data.comments.find(comment => comment.commentID === commentID)
    );
    const mostRecentComment = comments.sort((a, b) => new Date(b.commentedDate) - new Date(a.commentedDate))[0];
    return mostRecentComment ? mostRecentComment.commentedDate : new Date(0);
  }

  render() {
    const { communityID, model, handlePostClick } = this.props;
    const community = model.data.communities.find(c => c.communityID === communityID);
    if (!community) return <div>Community not found</div>;

    const createdTimestamp = formatTimestamp(community.startDate);
    const sortedPosts = this.getSortedPosts();

    return (
      <div id="community-page">
        {/* Community Header */}
        <div id="community-header-section">
          <div id="community-header">
            <h1 id="community-name">r/{community.name}</h1>
            {/* Sort Buttons */}
            <div id="button-container">
              <button className="sort-button" onClick={() => this.handleSort('newest')}>Newest</button>
              <button className="sort-button" onClick={() => this.handleSort('oldest')}>Oldest</button>
              <button className="sort-button" onClick={() => this.handleSort('active')}>Active</button>
            </div>
          </div>
          <p id="community-description">{community.description}</p>
          <p id="community-age">Created {createdTimestamp}</p>
          <p id="community-info">
            <span>{sortedPosts.length} Posts</span> | <span>{community.memberCount || 0} Members</span>
          </p>
        </div>
        
        <div className="divider" />

        {/* List of Posts in Community */}
        <div className="post-list">
          {sortedPosts.map(post => {
            const truncatedContent = post.content.substring(0, 80) + '...'; // First 80 characters of post content
            const flair = post.linkFlairID 
              ? model.data.linkFlairs.find(l => l.linkFlairID === post.linkFlairID)?.content || '' 
              : '';

            return (
              <div key={post.postID} className="post-item" onClick={() => handlePostClick(post.postID)}>
                {/* Post creator and timestamp (exclude community name) */}
                <div className="post-meta">
                  <span className="post-creator">Posted by {post.postedBy}</span>
                  <span className="separator"> | </span>
                  <span className="post-timestamp">{formatTimestamp(post.postedDate)}</span>
                </div>

                {/* Post Title */}
                <h2 className="post-title">{post.title}</h2>

                {/* Link Flair */}
                {flair && <p className="post-flair">Flair: {flair}</p>}

                {/* First 80 characters of post content */}
                <p className="post-content">{truncatedContent}</p>

                {/* View and Comment counts */}
                <div className="post-stats">
                  <span className="post-views">Views: {post.views || 0}</span>
                  <span className="separator"> | </span>
                  <span className="post-comments">Comments: {getTotalComments(post.commentIDs, model)}</span>
                </div>
              </div>
            );
          })}
        </div>
        <div id="empty-container"></div>
      </div>
    );
  }
}

// Recursive helper function to count total comments, including replies
function getTotalComments(commentIDs, model) {
  let count = commentIDs.length;
  commentIDs.forEach(commentID => {
    const comment = model.data.comments.find(c => c.commentID === commentID);
    if (comment) count += getTotalComments(comment.commentIDs, model); // Count nested replies
  });
  return count;
}

// Helper function to format timestamps
const formatTimestamp = (timestamp) => {
  const now = new Date();
  const diffInSeconds = Math.floor((now - new Date(timestamp)) / 1000);

  if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
  else if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  else if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  else if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`;
  else if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)} months ago`;
  return `${Math.floor(diffInSeconds / 31536000)} years ago`;
};

export default CommunitySection;
