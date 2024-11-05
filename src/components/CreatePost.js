import React, { useState } from 'react';

function CreatePost({ model, showHomePage }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [community, setCommunity] = useState('');
  const [username, setUsername] = useState('');
  const [flair, setFlair] = useState('');
  const [newFlair, setNewFlair] = useState('');

  const handleCreatePost = (e) => {
    e.preventDefault();

    const flairID = newFlair
      ? createLinkFlair(newFlair)
      : flair;

    const postID = `p${model.data.posts.length + 1}`;
    const newPost = {
      postID,
      title,
      content,
      communityID: community,
      linkFlairID: flairID,
      postedBy: username,
      postedDate: new Date(),
      views: 0,
      commentIDs: []
    };
    
    model.data.posts.push(newPost);
    
    // Add the postID to the selected community's post list
    const selectedCommunity = model.data.communities.find(c => c.communityID === community);
    if (selectedCommunity) {
      selectedCommunity.postIDs.push(postID);
    }

    showHomePage();
  };

  const createLinkFlair = (content) => {
    const flairID = `lf${model.data.linkFlairs.length + 1}`;
    const newFlair = { linkFlairID: flairID, content };
    model.data.linkFlairs.push(newFlair);
    return flairID;
  };

  return (
    <div id="create-post-page" className="front-page">
      <h2>Create a New Post</h2>
      <form onSubmit={handleCreatePost}>
        <label htmlFor="communitySelect">Select Community: *</label>
        <select id="communitySelect" value={community} onChange={(e) => setCommunity(e.target.value)} required>
          <option value="">Select a community</option>
          {model.data.communities.map((community) => (
            <option key={community.communityID} value={community.communityID}>
              {community.name}
            </option>
          ))}
        </select>

        <label htmlFor="postUsername">Username: *</label>
        <input type="text" id="postUsername" value={username} onChange={(e) => setUsername(e.target.value)} required />

        <label htmlFor="postTitle">Post Title: *</label>
        <input type="text" id="postTitle" value={title} onChange={(e) => setTitle(e.target.value)} maxLength="100" required />

        <label htmlFor="postContent">Post Content: *</label>
        <textarea id="postContent" value={content} onChange={(e) => setContent(e.target.value)} required />

        <label htmlFor="linkFlair">Select Link Flair (Optional):</label>
        <select id="linkFlair" value={flair} onChange={(e) => setFlair(e.target.value)}>
          <option value="">None</option>
          {model.data.linkFlairs.map((flair) => (
            <option key={flair.linkFlairID} value={flair.linkFlairID}>
              {flair.content}
            </option>
          ))}
        </select>

        <label htmlFor="newFlair">Or Create a New Flair:</label>
        <input
          type="text"
          id="newFlair"
          value={newFlair}
          onChange={(e) => setNewFlair(e.target.value)}
          maxLength="30"
          placeholder="Enter new flair"
        />

        <button type="submit">Submit Post</button>
      </form>
    </div>
  );
}

export default CreatePost;
