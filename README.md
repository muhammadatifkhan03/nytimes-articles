# NY Times Most Viewed Articles

A React application that displays the most viewed articles from The New York Times API. The app features a master/detail view pattern, allowing users to browse articles and view detailed information about each one.

## Features

- View most popular articles from the NY Times
- Filter articles by time period (1, 7, or 30 days)
- Responsive design with modern UI
- Article detail view with full information
- Loading and error states
- Unit tests with Jest and React Testing Library
- End-to-end tests with Cypress

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- NY Times API Key (get one at https://developer.nytimes.com/get-started)

## Installation

1. Clone the repository:

   ```bash
   git clone git@github.com:muhammadatifkhan03/nytimes-articles.git
   cd nytimes-api
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your NY Times API key:
   ```
   VITE_NY_TIMES_API_KEY=your-api-key-here
   ```

## Running the Application

To start the development server:

```bash
npm run dev
```

The application will be available at http://localhost:5173

## Running Tests

### Unit Tests

To run unit tests with Jest:

```bash
npm test
```

To run tests in watch mode:

```bash
npm test -- --watch
```

To generate coverage report:

```bash
npm test -- --coverage
```

### End-to-End Tests

To run Cypress tests in headless mode:

```bash
npm run cypress:run
```

To open Cypress Test Runner:

```bash
npm run cypress:open
```