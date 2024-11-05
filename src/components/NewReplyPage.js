import React, { useState } from 'react';

function NewReplyPage({ model, postID, parentCommentID, showPostSection }) {
  const [username, setUsername] = useState('');
  const [content, setContent] = useState('');

  const handleReplySubmit = (e) => {
    e.preventDefault();
    const commentsLength = model.data.comments.length + 1;
    const newCommentID = 'comment' + commentsLength;
    const newComment = {
      commentID: newCommentID,
      content: content,
      commentedBy: username,
      commentedDate: new Date(),
      commentIDs: []
    };

    model.data.comments.push(newComment);

    if (parentCommentID) {
      const parentComment = model.data.comments.find(c => c.commentID === parentCommentID);
      if (parentComment) {
        parentComment.commentIDs.unshift(newCommentID); // Add to the top of replies
      }
    } else {
      const post = model.data.posts.find(p => p.postID === postID);
      if (post) {
        post.commentIDs.unshift(newCommentID); // Add to the top of post comments
      }
    }

    showPostSection(); // Go back to the post section view
  };

  return (
    <div className="reply-page">
      <h2>{parentCommentID ? 'Reply to Comment' : 'Reply to Post'}</h2>
      <form onSubmit={handleReplySubmit}>
        <input
          type="text"
          placeholder="Your name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <textarea
          placeholder="Your reply"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        ></textarea>
        <button type="submit">Submit Reply</button>
        <button type="button" onClick={showPostSection}>Cancel</button> {/* Go back to post */}
      </form>
    </div>
  );
}

export default NewReplyPage;
