# Anonymous Course Reviews

## Overview
This project, an Anonymous Course Reviews app, demonstrates storing and retrieving data in a MongoDB database and in an in-memory session store. It allows users to post anonymous reviews for courses.

### Features
- Post anonymous reviews for courses.
- Filter and sort reviews.
- Session-based tracking of page visits and reviews added by a user.

## Directory Structure
```
/
├── app.mjs              # Main server file
├── db.mjs               # Database configuration
├── config.mjs           # Application configuration
├── package.json         # Node.js dependencies and scripts
├── .gitignore           # Specifies intentionally untracked files to ignore
├── .env                 # Environment variables
├── .eslintrc.cjs        # ESLint configuration
├── public               # Public assets like stylesheets and images
│   ├── stylesheets
│   │   └── styles.css
│   └── img
└── views                # Handlebars templates
    ├── layout.hbs
    ├── home.hbs
    └── add.hbs
```

## Running the Application
- Start the server:
  ```bash
  node app.mjs
  ```

- Access the application through `http://localhost:3000/`.

## Development Notes
- The application uses MongoDB for storing course reviews.
- Mongoose is used for database interactions.
- `dotenv` is used for managing environment variables.
- Express-session middleware is used for session management.

## Routes
- `GET /`: Displays all course reviews.
- `GET /reviews/add`: Shows the form to add a new review.
- `POST /reviews/add`: Processes and adds a new review.
- `GET /reviews/mine`: Displays reviews added in the current session.

## Contribution
Contributions to this project are welcome. Please ensure that all tests pass and that you adhere to the existing coding styles.

## License
This project is MIT licensed.
