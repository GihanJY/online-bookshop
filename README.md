# Bookstore Application

A full-stack MERN (MongoDB, Express, React, Node.js) application for browsing and purchasing books.

## Project Structure
```
bookstore-app/
├── client/                 # React frontend
│   ├── public/             # Static assets
│   ├── src/                # React source code
│   ├── .env                # Frontend environment variables
│   └── package.json        # Frontend dependencies
│
├── server/                 # Node.js backend
│   ├── models/             # MongoDB models
│   ├── routes/             # API routes
│   ├── .env                # Backend environment variables
│   └── package.json        # Backend dependencies
│
└── documents/              # Project-related documents

```

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB Atlas account or local MongoDB installation

## Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/GihanJY/online-bookshop.git
cd online-bookshop
```

### 2. Backend Setup
```bash
cd server

# Install dependencies
npm install

# Create and configure .env file
cp .env.example .env
```

Edit the .env file with your configuration:
```
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/bookstore?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:3000
```

### 3. Frontend Setup
```bash
cd ../client

# Install dependencies
npm install

# Create and configure .env file
cp .env.example .env
```

Edit the .env file with your configuration:
```
REACT_APP_API_URL=http://localhost:5000
REACT_APP_GOOGLE_BOOKS_API_KEY=your_google_books_api_key
```

### 4. Running the Application

**Option A: Run separately (recommended for development)**

In one terminal:
```bash
cd server
npm run dev
```

In another terminal:
```bash
cd client
npm start
```

**Option B: Run with concurrently (from root)**
```bash
npm install -g concurrently
cd Ascendingly
cd ..
npm run dev
```

## Available Scripts

### Server scripts (in /server)
- `npm start`: Start production server
- `npm run dev`: Start development server with nodemon
- `npm test`: Run tests

### Client scripts (in /client)
- `npm start`: Start development server
- `npm build`: Build for production
- `npm test`: Run tests

## Environment Variables

### Server (.env)
| Variable | Description |
|----------|-------------|
| PORT | Backend server port |
| MONGODB_URI | MongoDB connection string |
| JWT_SECRET | Secret for JWT token generation |
| CLIENT_URL | Frontend URL for CORS |

### Client (.env)
| Variable | Description |
|----------|-------------|
| REACT_APP_API_URL | Base URL for API requests |
| REACT_APP_GOOGLE_BOOKS_API_KEY | API key for Google Books API |

## API Documentation
The backend API provides the following endpoints:
- `POST /api/users/register` - User registration
- `POST /api/users/login` - User login
- `GET /api/books` - Get book listings
- `POST /api/payment/create-checkout-session` - Create Stripe checkout session

See full API documentation in `API.md`

## Deployment

### Backend
1. Set up production environment variables
2. Run `npm install --production`
3. Start with `npm start` or using PM2

### Frontend
1. Run `npm run build`
2. Serve the build folder using Nginx or similar

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request

## License
MIT
