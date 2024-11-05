import React, { useState } from 'react';

function CreateCommunity({ model, showCommunity }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [username, setUsername] = useState('');
  const [errors, setErrors] = useState({});

  // Function to validate inputs
  const validateInputs = () => {
    const errors = {};
    if (!name || name.length > 100) errors.name = "Name is required and should be less than 100 characters.";
    if (!description || description.length > 500) errors.description = "Description is required and should be less than 500 characters.";
    if (!username) errors.username = "Username is required.";
    return errors;
  };

  const handleCreateCommunity = (e) => {
    e.preventDefault();
    const validationErrors = validateInputs();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const communityID = `community${model.data.communities.length + 1}`;
    const newCommunity = {
      communityID,
      name,
      description,
      postIDs: [],
      members: [username],
      memberCount: 1,
    };

    model.data.communities.push(newCommunity);
    showCommunity(communityID); // Navigate to the new community view
  };

  return (
    <div id="create-community-page" className="front-page">
      <h2>Create a New Community</h2>
      <form onSubmit={handleCreateCommunity}>
        <label>Community Name <span className="required">*</span></label>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          maxLength="100" 
          required 
        />
        {errors.name && <p className="error">{errors.name}</p>}

        <label>Community Description <span className="required">*</span></label>
        <textarea 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          maxLength="500" 
          required 
        />
        {errors.description && <p className="error">{errors.description}</p>}

        <label>Username <span className="required">*</span></label>
        <input 
          type="text" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          required 
        />
        {errors.username && <p className="error">{errors.username}</p>}

        <button type="submit">Engender Community</button>
      </form>
    </div>
  );
}

export default CreateCommunity;



