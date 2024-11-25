
# TPC Portal

This is a Training and Placement Cell (TPC) portal for managing alumni, companies, and users. The portal allows for registration, login, updating, and deleting of records, as well as searching for alumni.

## Table of Contents

- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
  - [User Endpoints](#user-endpoints)
  - [Alumni Endpoints](#alumni-endpoints)
  - [Company Endpoints](#company-endpoints)
- [Error Handling](#error-handling)
- [License](#license)

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/Navneetkrh/TPC_Portal.git
    cd TPC_Portal
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Start the server:
    ```sh
    npm start
    ```

## Environment Variables

Create a `.env` file in the root directory and add the following environment variables:

```env
JWT_SECRET=your_jwt_secret
MONGO_URI=mongodb://localhost:27017/your_database_name
```

## API Endpoints

### User Endpoints

- **Register User**
    ```http
    POST /user/register
    ```
    ```json
    {
        "name": "John Doe",
        "rollNo": "2101AI01",
        "email": "john@example.com",
        "password": "your_password"
    }
    ```

- **Login User**
    ```http
    POST /user/login
    ```
    ```json
    {
        "email": "john@example.com",
        "password": "your_password"
    }
    ```

- **Update User**
    ```http
    PUT /user/update
    ```
    ```json
    {
        "rollNo": "2101AI01",
        "email": "john_updated@example.com",
        "password": "new_password"
    }
    ```

- **Delete User**
    ```http
    DELETE /user/delete/:id
    ```

### Alumni Endpoints

- **Register Alumni**
    ```http
    POST /alumni/register
    ```
    ```json
    {
        "name": "Jane Doe",
        "graduationYear": 2022,
        "department": "CSE",
        "email": "jane@example.com",
        "company": "ABC Corp",
        "designation": "Software Engineer"
    }
    ```

- **Search Alumni**
    ```http
    GET /alumni/search?name=Jane
    ```

- **Update Alumni**
    ```http
    PUT /alumni/update/:id
    ```
    ```json
    {
        "name": "Jane Doe Updated",
        "company": "XYZ Corp"
    }
    ```

- **Delete Alumni**
    ```http
    DELETE /alumni/delete/:id
    ```

### Company Endpoints

- **Register Company**
    ```http
    POST /company/register
    ```
    ```json
    {
        "name": "Tech Solutions",
        "location": "Mumbai",
        "industry": "IT",
        "contactEmail": "contact@techsolutions.com"
    }
    ```

- **Update Company**
    ```http
    PUT /company/update/:id
    ```
    ```json
    {
        "name": "Tech Solutions Updated",
        "location": "Bangalore"
    }
    ```

- **Delete Company**
    ```http
    DELETE /company/delete/:id
    ```

## Error Handling

The API returns errors in the following format:
```json
{
    "error": "Error message"
}
```

## License

This project is licensed under the MIT License.
