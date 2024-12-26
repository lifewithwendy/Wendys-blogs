# Wendy's Blog

Wendy's Blog is a fully responsive blogging platform built using the **MERN stack** (MongoDB, Express.js, React, and Node.js). The application allows users to create, edit, and share blog posts, providing a seamless user experience with modern design principles.

---

## Features
- **User Authentication:** Secure login and registration using JSON Web Tokens (JWT).
- **Blog Management:** Create, edit, delete, and view blog posts.
- **Responsive Design:** Optimized for mobile and desktop using **Bootstrap**.
- **Comment System:** Allow users to leave comments on blog posts.
- **Rich Text Editor:** Write and style content with ease.
- **Image Uploads:** Support for uploading images to enhance blog content.

---

## Technologies Used
- **Frontend:** React, React Router, Axios, Bootstrap
- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JSON Web Token (JWT)
- **Deployment:** Render.com

---

## Live Demo
The project is live at:
[Wendy's Blog - Deployed on Render](https://rad-t4if.onrender.com)

> **Note:** Some links (hrefs) might not be updated yet and can be updated at any time.

---

## Installation

1. Clone the repository:
```bash
git clone https://github.com/username/wendys-blog.git
```
2. Navigate into the project folder:
```bash
cd wendys-blog
```
3. Install dependencies for the server:
```bash
cd server
npm install
```
4. Install dependencies for the client:
```bash
cd ../client
npm install
```
5. Start the development server:
- Backend:
```bash
cd ../server
npm run dev
```
- Frontend:
```bash
cd ../client
npm start
```

---

## Environment Variables
Create a `.env` file in the server directory and add the following:
```plaintext
MONGO_URI=<Your MongoDB Connection String>
JWT_SECRET=<Your JWT Secret>
PORT=5000
```

---

## Usage
1. Sign up for an account or log in.
2. Create and publish blog posts.
3. Edit or delete existing posts.
4. Comment on posts to interact with the community.
5. Create and publish Adversiments.
6. Edit or delete existing Adversiments.

