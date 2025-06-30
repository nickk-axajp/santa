# Santa App Challenge

This is a Node.js/React application for children to submit wish requests to Santa, built as part of a coding challenge for AXA Japan. The app validates user eligibility and sends a summary of pending wishes every 15 seconds.

## How to Use

1. **Install dependencies:**  
   `npm install`

2. **Set up environment variables:**  
   Create a `.env` file with your Ethereal Email credentials:

   ```
   MAILER_USERNAME=your_ethereal_username
   MAILER_PASSWORD=your_ethereal_password
   ```

3. **Run the application:**  
   `npm start` to build app and start server

   `npm run start:watch` watch for frontend changes (will need to reload pages for changes to reflect)

4. **Access the application:**  
   Open [http://localhost:3000](http://localhost:3000) in a browser

## Frontend

### Features & Enhancements

The following additions were made the React app:

- Separation of application state and presentational components with [WishFormContainer.tsx](./src/components/WishFormContainer/WishFormContainer.tsx)
- Error handling with user-friendly messages
- Confirmation page after successful submission
- Checking of user profile on every submission attempt
- Disabled submit button when form is incomplete to prevent unnecessary requests for the API
- Semantic HTML usage
- Basic form validation
- Prettier for code formatting consistency

### Future Improvements

If I had more time or different constraints, I would do the following:

**High Priority:**

- Upgrade packages/Node (see Development Notes)
- Add unit and snapshot tests with Jest
- Share type definition files between frontend and backend for API
- Performance monitoring and logging to a logging service
- ESLint for code linting

**Medium Priority:**

- Move the frontend into its own folder with a package.json file
- Use CSS modules/preprocessor for better style management
- Hot reloading support or Storybook integration

## Server

### Features & Enhancements

The following additions/changes were made the Express server:

- `/api/can-ask/:username` - Validates if user can submit requests
- `/api/ask-santa` - Processes wish submissions
- Input validation and sanitization
- Proper HTTP status codes and error responses
- Fetching the user data with [node-fetch](https://github.com/node-fetch/node-fetch) and caching it with a 5 minute TTL (see [profileUtils.js](./server/utils/profileUtils.js))
- Serving the React app instead of a static page
- Prettier for code formatting consistency

Email service [emailService.js](./server/services/emailService.js):

- Uses [nodemailer](https://nodemailer.com/)
- Has an in-memory queue to store the messages and publish every 15 seconds for simpler development setup
- Use environment variables to access the emailer username and password

### Future Improvements

If I had more time or different constraints, I would do the following:

**High Priority:**

- Upgrade packages/Node (see Development Notes)
- Add unit and integration tests
- Persistent storage instead of in-memory queuing (DB or message queue)
- Migrate server to TypeScript
- Upgrade to better maintained fetch library (Undici)

**Medium Priority:**

- Move backend into separate folder with package.json
- User authentication and authorization
- Rate limiting and comprehensive input validation
- Database for user info storage (avoid in-memory joins)
- Monitoring, logging improvements, and Swagger documentation

## Development Notes

The specified version of Node (16) in the projects on Glitch  has compatibility issues with some packages I tried to use (latest ESLint and [Undici](https://undici.nodejs.org/)). 
It is also End of Life, and so I would upgrade to a newer version of Node.

The existing packages are contain major security issues - there are currently are 1 critical and 6 high vulnerabilities in the project. These will need to be updated.

Disclaimer: I used AI to generate the CSS styles and to format parts of this readme. All other code was done by me with no AI generated code was used.

## Files overview

```
├── server.js                    # Express server with API endpoints
├── server/
│   ├── services/
│   │   └── emailService.js      # Email queuing and batch sending
│   └── utils/
│       └── profileUtils.js      # User validation and data fetching
├── src/
│   ├── components/
│   │   ├── App/                 # Main app component
│   │   ├── WishForm/            # Form component
│   │   ├── WishFormContainer/   # Handles app state
│   │   ├── Confirmation/        # Success page
│   │   └── ErrorPage/           # Error page
│   └── services/
│       └── santaApi.ts          # Frontend API service
└── dist/                        # Location for built frontend components to be served from
```
