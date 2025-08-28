# Task Management API

A RESTful API for managing tasks with JWT authentication, built with Node.js, Express, and MongoDB.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)

## Features

- ✅ User registration and login with JWT authentication
- ✅ Create, read, update, and delete tasks
- ✅ User-specific task management (users can only access their own tasks)
- ✅ Secure password hashing with bcryptjs
- ✅ Pagination support for task listings
- ✅ MongoDB database integration
- ✅ Error handling middleware
- ✅ Ready for deployment

## Table of Contents

- [Quick Start](#quick-start)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [Environment Variables](#environment-variables)
- [Installation](#installation)
- [Deployment](#deployment)
- [Testing with Postman](#testing-with-postman)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Quick Start

1. Clone the repository:
```bash
git clone https://github.com/Saqib-diar/task-management-api.git
cd task-management-api


2. Install dependencies:
```bash
npm install


3. Set up environment variables:
```bash
cp .env.example .env

4. Start the server:
```bash
npm run dev


The API will be running on http://localhost:4000


## API Endpoints

### Authentication Endpoints

| Method | Endpoint | Description | Authentication |
|--------|----------|-------------|----------------|
| POST | `/api/auth/register` | Register a new user | None |
| POST | `/api/auth/login` | Login user | None |
| POST | `/api/auth/profile` | user Profil | None |

### Task Endpoints

| Method | Endpoint | Description | Authentication |
|--------|----------|-------------|----------------|
| GET | `/api/tasks` | Get all tasks for the authenticated user | Required |
| POST | `/api/tasks` | Create a new task | Required |
| GET | `/api/:id` | Get a task | Required |
| PUT | `/api/tasks/:id` | Update a task | Required |
| DELETE | `/api/tasks/:id` | Delete a task | Required |




