# Swift-Cart

Swift-Cart is a fullstack web e-commerce application built using React.js, Express.js, Tailwind CSS, MongoDB, and ShadCN for UI components. The application allows users to browse products, add items to their cart, and make purchases.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Product Browsing**: Users can browse through a variety of products.
- **Shopping Cart**: Add products to the cart and manage cart items.
- **User Authentication**: Register and log in to access personalized features.
- **Order Management**: Place orders and view order history.
- **Responsive Design**: Optimized for both desktop and mobile devices.

## Technologies

- **Frontend**: React.js, Tailwind CSS, ShadCN
- **Backend**: Express.js
- **Database**: MongoDB

## Installation

To get started with the Swift-Cart application, follow these steps:

1. **Clone the repository**:
    ```bash
    git clone https://github.com/Benjamin-chidera/swift-cart.git
    cd swift-cart
    ```

2. **Install dependencies**:
    ```bash
    # Install server dependencies
    cd server
    npm install

    # Install client dependencies
    cd ../client
    npm install
    ```

3. **Set up environment variables**:
    - Create a `.env` file in the `server` directory and add the following variables:
      ```plaintext
      MONGO_URI=your_mongo_database_uri
      JWT_SECRET=your_jwt_secret
      ```

4. **Start the development servers**:
    ```bash
    # Start the backend server
    cd server
    npm start

    # Start the frontend server
    cd ../client
    npm start
    ```

## Usage

1. **Running the app**:
    - Open your browser and navigate to `http://localhost:5173` to access the frontend.
    - The backend server will be running on `http://localhost:3000`.

2. **Browsing Products**:
    - Explore various product categories and view product details.

3. **Managing Cart**:
    - Add products to the cart, update quantities, and remove items.

4. **User Authentication**:
    - Register a new account or log in with existing credentials.

5. **Placing Orders**:
    - Proceed to checkout to place orders and view order history.

## Folder Structure

The project follows a standard fullstack structure with separate folders for client and server.

```plaintext
swift-cart
├── client               # Frontend React application
│   ├── public           # Public assets
│   ├── src              # Source files
│   │   ├── components   # Reusable UI components
│   │   ├── pages        # Page components
│   │   ├── services     # API services
│   │   ├── styles       # CSS styles (Tailwind CSS)
│   │   ├── utils        # Utility functions
│   │   ├── App.js       # Main application component
│   │   ├── index.js     # Entry point
│   └── package.json     # Frontend dependencies and scripts


// This is for Swift-Cart Server
├── server               # Backend Express application
│   ├── controllers      # Route controllers
│   ├── models           # Mongoose models
│   ├── routes           # Express routes
│   ├── middleware       # Middleware functions
│   ├── utils            # Utility functions
│   ├── app.js           # Main application file
│   ├── server.js        # Server entry point
│   └── package.json     # Backend dependencies and scripts
└── README.md            # Project documentation
