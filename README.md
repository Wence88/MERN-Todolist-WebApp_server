My To-do List App

# Timekeeper Vault Backend

Welcome to the backend of Timekeeper Vault. This README provides an overview of the backend structure, endpoints, and middleware used in the project.

## Table of Contents

- [Introduction](#introduction)
- [Project Structure](#project-structure)
- [Dependencies](#dependencies)
- [Endpoints](#endpoints)
- [Middleware](#middleware)

## Introduction

Timekeeper Vault Backend is built with Node.js and Express.js, providing RESTful APIs for user authentication, task management, and database operations. It utilizes MongoDB as the database and JWT for user authentication

Technologies used
React
NodeJS
CSS
Express.js
MongoDB

## Project Structure

The backend project is organized into several directories:

- **routes/**: Contains route handlers for different API endpoints.
- **models/**: Defines Mongoose schemas for user and todo data.
- **middleware/**: Contains custom middleware functions for JWT token validation.

## Dependencies

The backend project relies on the following dependencies:

- bcrypt: ^5.1.1
- cors: ^2.8.5
- dotenv: ^16.4.5
- express: ^4.18.3
- helmet: ^7.1.0
- jsonwebtoken: ^9.0.2
- mongoose: ^8.2.0
- morgan: ^1.10.0
- nodemon: ^3.1.0

## Endpoints

### User Routes

- **POST /register**: Register a new user.
- **POST /login**: Authenticate a user and generate JWT token.
- **GET /verify**: Verify JWT token for authentication.
- **GET /**: Get all users.
- **GET /email/:email**: Get user by email.
- **PUT /:id**: Update user details.
- **DELETE /:id**: Delete user by ID.

### Todo Routes

- **POST /create**: Create a new todo task.
- **GET /single-todo/:id**: Get a single todo task by ID.
- **GET /:id**: Get all todos by a user.
- **PUT /:id**: Update todo task by ID.
- **DELETE /:id**: Delete todo task by ID.

## Middleware

### isAuthenticated Middleware

- Verifies JWT token provided in the request headers.
- Protects routes from unauthorized access.
- Applied to routes that require authentication.

## Usage

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Set up your MongoDB database and configure the connection string in a `.env` file.
4. Run the development server with `npm run dev`.

For detailed usage instructions and further customization, refer to the source code files in the repository.
