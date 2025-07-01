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
   `npm start` to build the app and start the server

   `npm run start:watch` to watch for frontend changes (reload pages to see updates)

4. **Access the application:**
   Open [http://localhost:3000](http://localhost:3000) in your browser

## Frontend

### Features & Enhancements

The following was added to the React app:

- Separation of application state and presentational components with [WishFormContainer.tsx](./src/components/WishFormContainer/WishFormContainer.tsx)
- Error handling with user-friendly messages
- Confirmation page after successful submission
- User profile is checked on every submission attempt
- Submit button is disabled when the form is incomplete to prevent unnecessary API requests
- Semantic HTML usage
- Basic form validation
- Prettier for consistent code formatting

### Future Improvements

Given more time or different constraints, I would:

**High Priority:**

- Upgrade packages/Node (see Development Notes)
- Add unit and snapshot tests with Jest
- Share type definition files between frontend and backend
- Add performance monitoring and logging to a logging service
- Add ESLint for code linting

**Medium Priority:**

- Extract strings out of components to enable localization
- Move the frontend into its own folder with a separate package.json
- Use CSS modules or a preprocessor for better style management
- Add hot reloading support or integrate Storybook

## Server

### Features & Enhancements

The following improvements were made to the Express server:

- `GET /api/can-ask/:username` - Validates if a user can submit requests
- `POST /api/ask-santa` - Processes wish submissions
- Input validation and sanitization
- Proper HTTP status codes and error responses
- Fetches user data with [node-fetch](https://github.com/node-fetch/node-fetch) and caches it with a 5-minute TTL (see [profileUtils.js](./server/utils/profileUtils.js))
- Serves the React app instead of a static page
- Prettier for consistent code formatting

Email service ([emailService.js](./server/services/emailService.js)):

- Uses [nodemailer](https://nodemailer.com/) to send emails
- In-memory queue to store messages and send them every 15 seconds for a simpler development setup
- Environment variables for emailer username and password

### Future Improvements

Given more time or different constraints, I would:

**High Priority:**

- Upgrade packages/Node (see Development Notes)
- Make POST endpoint handle user age verification to avoid two network requests (see Development Notes)
- Add unit and integration tests
- Use persistent storage instead of in-memory queuing for emails (DB or durable message queue)
- Migrate the server to TypeScript
- Upgrade to a better maintained fetch library ([Undici](https://undici.nodejs.org/) - see Development Notes)

**Medium Priority:**

- Move the backend into a separate folder with its own package.json
- Add user authentication and authorization
- Add rate limiting and comprehensive input validation
- Use a database for user info storage (avoid in-memory joins)
- Improve monitoring, logging, and add Swagger documentation

## Development Notes

- The specified Node version (16) in Glitch projects has compatibility issues with some packages I tried to use (latest ESLint and Undici).
  It is also End of Life, so I would upgrade to a newer version of Node.

- The existing packages have major security issues - there is currently 1 critical and 6 high vulnerabilities in the project. These need to be addressed before taking the system to production.

- After I submitted the challenge, I realized that the `POST /api/ask-santa` endpoint could perform user eligibility checks without an unnecessary additional API call from the client to `GET /api/can-ask` before submitting a wish.
  In hindsight, combining the eligibility check directly into the POST handler would have reduced unnecessary network calls and simplified client logic.
  This was a significant oversight in my design and something I would prioritize fixing in a production setting.

- Disclaimer: I used AI to generate the CSS styles and to format parts of this README. All other code was written by me without AI assistance.

## Files Overview

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
