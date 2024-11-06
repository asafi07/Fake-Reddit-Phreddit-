
# Phreddit: A Reddit-Inspired Web Application Built with React

Welcome to Phreddit! This project is a simplified, Reddit-inspired social media platform I developed as part of my journey at Stony Brook University. Phreddit mimics core Reddit functionalities like community creation, post interactions, and threaded comments, all designed within a user-friendly interface. This project allowed me to deepen my skills in React, JavaScript, HTML, and CSS, while also learning the principles of reactive applications and modular development.

## Project Overview

### Goals and Learning Outcomes

Through this assignment, I gained experience with **reactive application development** and worked on building **dynamic web pages** using React. This project gave me hands-on practice in structuring modular code, managing components, using JSX, and rendering data dynamically within a React framework.

### Key Features

1. **Interactive UI Elements**
   - **Banner**: Includes the application title, a search bar, and a "Create Post" button for easy navigation.
   - **Navigation Bar**: A sidebar with quick links to the home page and a list of created communities for streamlined browsing.
   - **Content Views**: Dedicated views for each page, including home, community, post, search results, new community, new post, and new comment.

2. **Data Model**
   - **Community, Post, Comment, and LinkFlair Objects**: These objects define the structure of data in the app, allowing me to create attributes for IDs, timestamps, creators, and relationships among entities.
   - **Client-Side Data Persistence**: For this version, all data is stored on the client side without backend persistence, which simplified development while maintaining core functionality.

3. **Functionalities**
   - **Home Page**: Displays all posts, with options to sort by newest, oldest, and most active posts based on comments.
   - **Community Page**: Shows all posts within a specific community, alongside a description and member count.
   - **Post View**: Displays individual posts, including threaded comments for better readability and engagement.
   - **Search Results Page**: Filters posts and comments by keywords entered in the search bar.
   - **Post and Community Creation**: Users can create new communities and posts, apply link flairs, and manage membership counts.
   - **Comment Threading**: Allows threaded replies to comments, enhancing the social interaction model.

4. **Modular Codebase**
   - **Components and Styling**: I organized each main component into separate files within `src/components`, creating a modular and maintainable codebase.
   - **CSS Styling**: Leveraged existing styles from previous projects, adapting them slightly for React, to ensure a consistent and clean UI.

### Running the Project

1. **Install Dependencies**:
   - Run `npm install` to set up all necessary packages from `package.json`.
2. **Run the Application**:
   - Start the development server with `npm start` and open `http://localhost:3000` in a browser to view Phreddit live.

Thank you for checking out Phreddit! I hope you enjoy exploring this project as much as I enjoyed building it. This project was a valuable experience that challenged me to apply both my creativity and technical skills.
