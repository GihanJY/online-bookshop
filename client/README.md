# Online Bookshop

A modern online bookshop application built with React and Node.js. This application provides a platform for users to browse, search, and purchase books, while administrators can manage inventory, users, and orders.

## Features

### User Features
- Browse and search books
- View book details
- Add books to cart
- User authentication
- Order management
- Profile management

### Admin Features
- Secure admin dashboard
- Book management (add, edit, delete)
- User management
- Order management
- Sales analytics

## Tech Stack

- **Frontend**: React.js, React Router, Axios
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT
- **Styling**: CSS

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/online-bookshop.git
cd online-bookshop
```

2. Install dependencies for both client and server:
```bash
# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

3. Set up environment variables:
Create a `.env` file in the client directory:
```
REACT_APP_BASE_URL=http://localhost:5000
```

Create a `.env` file in the server directory:
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

4. Start the development servers:
```bash
# Start the client (from client directory)
npm start

# Start the server (from server directory)
npm run dev
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## Project Structure

```
online-bookshop/
├── client/                # React frontend
│   ├── public/            # Static files
│   ├── src/               # Source files
│   │   ├── components/    # React components
│   │   │   ├── admin
│   │   │   └── user
│   │   ├── screens/       # Page components
│   │   │   ├── admin
│   │   │   └── user
│   │   ├── styles/        # CSS files
│   │   └── utils/         # Utility functions
│   └── package.json       # Frontend dependencies
│
└── server/                # Node.js backend
    ├── controllers/       # Route controllers
    ├── models/            # Database models
    ├── routes/            # API routes
    └── package.json       # Backend dependencies
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Create React App](https://github.com/facebook/create-react-app)
- [React Documentation](https://reactjs.org/)
- [Node.js Documentation](https://nodejs.org/en/docs/)
- [MongoDB Documentation](https://docs.mongodb.com/)
