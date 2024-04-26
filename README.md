## Setup Instructions

1. Clone the repository:

   ```bash
   git clone https://github.com/Utkarsh1504/bookie
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Add the following environment variables:
     ```
     PORT=3000
     MONGO_URL=<your_mongodb_connection_string>
     JWT_SECRET=<your_jwt_secret>
     ```

4. Start the server:

   ```bash
   npm run dev
   ```

## API Endpoints

### User Authentication

- **POST /api/auth/register**
  - Register a new user.
  - Request body:
    ```json
    {
      "name": "John Doe",
      "email": "john@example.com",
      "password": "password"
    }
    ```
  - Response:
    ```json
    {
      "message": "User registered successfully",
      "user": {
        "_id": "5fec4d4b10cc8c33a84d4b25",
        "name": "John Doe",
        "email": "john@example.com"
      }
    }
    ```

- **POST /api/auth/login**
  - Login with existing credentials.
  - Request body:
    ```json
    {
      "email": "john@example.com",
      "password": "password"
    }
    ```
  - Response:
    ```json
    {
      "message": "Login successful",
      "name": "John Doe",
      "email": "john@example.com",
      "token": "<jwt_token>"
    }
    ```

### Book Management

- **POST /api/books**
  - Create a new book entry.
  - Request body:
    ```json
    {
      "title": "Book Title",
      "author": "Author Name",
      "price": 999,
      "year": 2022
    }
    ```
  - Response:
    ```json
    {
      "message": "Book created",
      "book": {
        "_id": "5fec4d4b10cc8c33a84d4b26",
        "title": "Book Title",
        "author": "Author Name",
        "price": 999,
        "year": 2022
      }
    }
    ```

- **GET /api/books**
  - Get all books.
  - Response:
    ```json
    {
      "message": "Books fetched",
      "books": [
        {
          "_id": "5fec4d4b10cc8c33a84d4b26",
          "title": "Book Title",
          "author": "Author Name",
          "price": 999,
          "year": 2022
        },
        {
          "_id": "5fec4d4b10cc8c33a84d4b27",
          "title": "Another Book",
          "author": "Another Author",
          "price": 999,
          "year": 2020
        }
      ]
    }
    ```

- **GET /api/books/:id**
  - Get a book by ID.
  - Response:
    ```json
    {
      "message": "Book fetched",
      "book": {
        "_id": "5fec4d4b10cc8c33a84d4b26",
        "title": "Book Title",
        "author": "Author Name",
        "price": 999,
        "year": 2022
      }
    }
    ```

- **PUT /api/books/:id**
  - Update a book by ID.
  - Request body (fields to update):
    ```json
    {
      "title": "Updated Title"
    }
    ```
  - Response:
    ```json
    {
      "message": "Book updated",
      "book": {
        "_id": "5fec4d4b10cc8c33a84d4b26",
        "title": "Updated Title",
        "author": "Author Name",
        "price": 999,
        "year": 2022
      }
    }
    ```

- **DELETE /api/books/:id**
  - Delete a book by ID.
  - Response:
    ```json
    {
      "message": "Book deleted"
    }
    ```

- **GET /api/books/filter/author/:author**
  - Filter books by author.
  - Response:
    ```json
    {
      "message": "Books fetched",
      "books": [
        {
          "_id": "5fec4d4b10cc8c33a84d4b26",
          "title": "Book Title",
          "author": "Author Name",
          "price": 999,
          "year": 2022
        }
      ]
    }
    ```

- **GET /api/books/filter/year/:year**
  - Filter books by publication year.
  - Response:
    ```json
    {
      "message": "Books fetched",
      "books": [
        {
          "_id": "5fec4d4b10cc8c33a84d4b26",
          "title": "Book Title",
          "author": "Author Name",
          "price": 999,
          "year": 2022
        }
      ]
    }
    ```

## Implementation Details

- **User Authentication**: User registration and login are handled securely using JWT tokens and bcrypt for password hashing.
- **Input Validation**: Input data for user registration, login, and book operations is validated using Zod schemas to ensure data integrity.
- **Database**: MongoDB is used as the database to store user and book data.
- **Security Measures**: Basic security measures such as input validation and JWT token authentication are implemented to protect against common security vulnerabilities.


