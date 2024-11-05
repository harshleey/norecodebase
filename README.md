# Norebase Challenge

Norebase Challenge is a Node.js application that allows users to create articles and interact with them through a like feature. Built with Express, MongoDB, and Prisma, this application serves as a demonstration of backend capabilities.

## Table of Contents

- [Norebase Challenge](#norebase-challenge)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Requirements](#requirements)
  - [Installation](#installation)
  - [Usage](#usage)
      - [API Endpoints](#api-endpoints)
      - [Example Request](#example-request)
  - [Running Tests](#running-tests)
  - [Environment Variables](#environment-variables)

## Features

- Create articles
- Retrieve articles by ID
- Like articles
- Prevent duplicate likes

## Requirements

- Node.js (v14 or higher)
- npm (Node Package Manager)

## Installation

Follow these steps to set up the project on your local machine:

1. **Fork the repository** on GitHub by clicking the "Fork" button at the top right corner of the repository page.

2. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/norebase-challenge.git
   ```

3. **Navigate into the project directory**:

   ```bash
   cd norebase-challenge
   ```

4. **Install dependencies**:

   ```bash
   npm install
   ```

5. **Set up your database**:

- Ensure you have a MongoDB instance running (either locally or on a cloud provider).
- Update the database connection string in your .env file.

6. **Create a .env file in the root of the project with the following content**:

   ```plaintext
   DATABASE_URL="your_database_connection_string"
   ```

## Usage

To start the server, run:

```bash
npm run start
```

This will start the server using nodemon, which automatically restarts the server when file changes are detected.

#### API Endpoints

- POST /api/articles: Create a new article
- GET /api/articles/:articleId: Get an article by ID
- GET /api/articles/:articleId/likes: Get the like count for an article
- POST /api/articles/:articleId/like: Like an article

#### Example Request

To create a new article, send a POST request to /api/articles with the following JSON body:

```json
{
  "title": "Sample Article",
  "content": "This is a sample article content."
}
```

## Running Tests

To run the tests, use the following command:

```bash
npm run test
```

This will run the tests using Jest in watch mode.

## Environment Variables

Make sure to configure the following environment variable in your .env file:

- DATABASE_URL: Connection string to your MongoDB database.
