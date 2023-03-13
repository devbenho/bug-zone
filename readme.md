# Bugzone

A platform for technical discussions through submitting problems and solutions by developers

# Table of Contents

[Description](#description)

[Features](#features)

[Technology Stack](#technology-stack)

- [Client-Side](#client-side)

- [Backend-Side](#backend-side)

- [Database](#database)

[Functionalities](#functionalities)

[Installation](#installation)

[Usage](#usage)

[Contribution](#contribution)

[License](#license)

# Description

Bugzone is a platform for technical discussions, where developers can share their knowledge and experience by submitting problems they face and solutions to existing problems. The platform also includes a search feature to easily find problems and solutions related to specific tags, and an evaluation system using likes and dislikes. Additionally, Bugzone includes a developer's profile rating system based on some of factors (See [functionalities](#functionalities) below for these factors)

# Features

- Submit problems and solutions
- Search for problems and solutions related to specific tags
- Sharing problems or solutions on your profile
- Developer's profile rating system (out of ⭐️⭐️⭐️⭐️⭐️)

# Technology Stack

Bugzone is built using the following technology stack:

## Client-Side

- React.js
- Axios for API calls
- React Router for client-side routing

## Backend-Side

- Node.js
- Express.js
- JSON Web Tokens (JWT) for authentication
- bcrypt.js for data hiding
- Passport.js for authenticating the user

## Database

- MongoDB (Mongoose Library)

# Functionalities

- Submit a problem that you face
- Submit a solution to an existing problem
- Search for (problem/solution) that related to a - specific tags
- Evaluate a (problem/solution) using (like/dislike)
- User authentication
- Developer's profile rating system based on the likes and dislikes he gains In addition to the number of problems he published, the number of solutions that were submitted to these problems, in addition to the number of problems he participated in solving

# Installation

1. Clone the repository using the command `git clone https://github.com/devbenho/Bugzone.git`
2. Navigate to the project directory using the command `cd Bugzone`
3. Install the dependencies using the command `npm install`
4. Start the application using the command `npm start`

5. The application will be running on `http://localhost:3000`

### Note: Make sure you have `Node.js` and `MongoDB` installed on your system before installing Bugzone.

# Usage

1. Register an account or login if you already have one
2. Submit a problem or solution
3. Search for problems and solutions related to specific tags
4. Evaluate problems and solutions using the like/dislike system
5. View your developer profile and see your rating.

# Contribution

Bugzone is open for contribution, feel free to submit a pull request.

# License

Bugzone is licensed under the MIT License.