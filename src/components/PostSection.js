import React, { useState } from 'react';
import NewReplyPage from './NewReplyPage'; // Import the new reply form

const PostSection = ({ postID, model }) => {
  const [isReplying, setIsReplying] = useState(false);
  const [parentCommentID, setParentCommentID] = useState(null); // Track which comment we are replying to

  const post = model.data.posts.find(p => p.postID === postID);

  const handleReplyClick = (commentID = null) => {
    setParentCommentID(commentID);
    setIsReplying(true); // Show the reply form page
  };

  const showPostSection = () => {
    setIsReplying(false); // Go back to the post section view
  };

  if (isReplying) {
    // If in reply mode, show the NewReplyPage instead of the post
    return (
      <NewReplyPage
        model={model}
        postID={postID}
        parentCommentID={parentCommentID}
        showPostSection={showPostSection}
      />
    );
  }

  return (
    <div id="post-section">
      <div className="post-container">
        <div className="post-header">
          <h1 className="post-title">{post.title}</h1>
          <p className="post-meta">
            Posted by {post.postedBy} - {formatTimestamp(post.postedDate)}
          </p>
        </div>
        <div className="post-body">
          <p className="post-content">{post.content}</p>
        </div>

        {/* Reply to Post Button */}
        <button onClick={() => handleReplyClick(null)}>Reply to Post</button>

        {/* Comments Section */}
        <ul className="comments-list">
          {post.commentIDs.map(commentID => {
            const comment = model.data.comments.find(c => c.commentID === commentID);
            return comment ? (
              <li key={comment.commentID}>
                <div>
                  <strong>{comment.commentedBy}</strong> ({formatTimestamp(comment.commentedDate)}):<br />
                  {comment.content}
                </div>
                {/* Reply Button for each comment */}
                <button onClick={() => handleReplyClick(comment.commentID)}>Reply</button>

                {/* Recursive display for replies */}
                {comment.commentIDs.length > 0 && (
                  <ul className="replies-list">
                    {comment.commentIDs.map(replyID => {
                      const replyComment = model.data.comments.find(c => c.commentID === replyID);
                      return replyComment ? (
                        <li key={replyComment.commentID}>
                          <div>
                            <strong>{replyComment.commentedBy}</strong> ({formatTimestamp(replyComment.commentedDate)}):<br />
                            {replyComment.content}
                          </div>
                          <button onClick={() => handleReplyClick(replyComment.commentID)}>Reply</button>
                        </li>
                      ) : null;
                    })}
                  </ul>
                )}
              </li>
            ) : null;
          })}
        </ul>
      </div>
    </div>
  );
};

const formatTimestamp = (postedDate) => {
  const now = new Date();
  const diffInSeconds = Math.floor((now - new Date(postedDate)) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds} seconds ago`;
  } else if (diffInSeconds < 3600) {
    return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  } else if (diffInSeconds < 86400) {
    return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  } else if (diffInSeconds < 2592000) {
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  } else if (diffInSeconds < 31536000) {
    return `${Math.floor(diffInSeconds / 2592000)} months ago`;
  } else {
    return `${Math.floor(diffInSeconds / 31536000)} years ago`;
  }
};

export default PostSection;
