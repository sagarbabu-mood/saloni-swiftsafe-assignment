# E-Commerce API

## Overview

This repository contains the backend code for a simple e-commerce website It provides RESTful APIs for user registration, authentication, product management, and more.

## Installation

1. **Clone the repository:**
    ```bash
    git clone <repository-url>
    ```

2. **Navigate to the project directory:**
    ```bash
    cd SwiftSafeAssignment
    ```

3. **Install dependencies:**
    ```bash
    npm install
    ```

4. **Start the server:**
    ```bash
    npm start
    ```

## Features

### User Management

- **User Registration**: Users can register with a unique username and a password.
  - **Endpoint**: `POST /register`
  - **Request Body**:
    ```json
    {
      "username": "example_user",
      "password": "password123"
    }
    ```
  - **Response** (Success):
    ```json
    {
      "message": "User created successfully"
    }
    ```
  - **Response** (Failure):
    ```json
    {
      "error": "Username already exists"
    }
    ```

- **User Login**: Registered users can log in with their credentials.
  - **Endpoint**: `POST /login`
  - **Request Body**:
    ```json
    {
      "username": "example_user",
      "password": "password123"
    }
    ```
  - **Response** (Success):
    ```json
    {
      "token": "<JWT_TOKEN>"
    }
    ```
  - **Response** (Failure):
    ```json
    {
      "error": "Invalid username or password"
    }
    ```

### Product Management

- **Product Listing**: Endpoint to fetch products with optional filtering by category, type, and search query.
  - **Endpoint**: `GET /products`
  - **Query Parameters**:
    - `category` (optional): Filter products by category
    - `type` (optional): Filter products by type
    - `search` (optional): Search products by name
  - **Response**:
    ```json
    [
      {
        "id": 1,
        "name": "Samsung Galaxy M14",
        "description": "High-performance smartphone with advanced features",
        "category": "Electronics",
        "type": "Smartphone",
        "rating": 4.5,
        "price": 19000.99,
        "imageUrl": "https://images.unsplash.com/photo-1581508473167-1c80505e5e8b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDR8fHxlbnwwfHx8fHw%3D"
      },
      ...
    ]
    ```

- **Product Details**: Endpoint to retrieve details of a specific product by its ID.
  - **Endpoint**: `GET /products/:id`
  - **Response**:
    ```json
    {
      "id": 1,
        "name": "Samsung Galaxy M14",
        "description": "High-performance smartphone with advanced features",
        "rating": 4.5,
        "price": 19000.99,
        "imageUrl": "https://images.unsplash.com/photo-1581508473167-1c80505e5e8b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDR8fHxlbnwwfHx8fHw%3D"
    }
    ```

## Technologies Used

- **Node.js**: Backend JavaScript runtime environment.
- **Express.js**: Web application framework for Node.js.
- **SQLite**: Embedded SQL database engine.
- **bcrypt**: Library for password hashing.
- **jsonwebtoken**: Library for generating and verifying JSON Web Tokens.
- **cors**: Middleware for enabling Cross-Origin Resource Sharing.
- **body-parser**: Middleware for parsing incoming request bodies.

## API Endpoints

- **POST /register**: Endpoint for user registration.
- **POST /login**: Endpoint for user login.
- **GET /products**: Endpoint to fetch products with optional filtering.
- **GET /products/:id**: Endpoint to retrieve details of a specific product by its ID.

## Configuration

- **Port**: The server is configured to run on port 3001 by default. You can change the port in the `app.listen` function call in `index.js`.