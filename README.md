
---

### README.md

```markdown
# Product Management API

This is a backend API built with Node.js, Express, and MongoDB for managing products, user authentication, and wishlists. It supports CRUD operations for products, image uploads, filtering, sorting, pagination, and wishlist management. The API uses JWT tokens stored in cookies for authentication.

## Features
- **Authentication**: User and admin registration/login with JWT stored in HTTP-only cookies.
- **Product Management**: 
  - Create, update, delete products (authenticated users/admins only).
  - Upload product images (jpg, jpeg, png; max 1MB).
  - Filter products by category and price range.
  - Sort products by price (ascending/descending), date added (ascending/descending), or name (ascending/descending).
  - Pagination (5 products per page).
- **Wishlist**: Add/remove products from a user's wishlist (max 15 items, users only).
- **Roles**: Admins can manage all products; users can only manage their own.

## Prerequisites
- **Node.js**: Version 16 or higher.
- **MongoDB**: Running locally on `mongodb+srv://athulsagar547:productmanagement@cluster0.di5ahxx.mongodb.net/ProductManagement?retryWrites=true&w=majority&appName=Cluster0`.
- **Postman**: For testing the API endpoints.

## Project Structure
```
product-management-api/
├── Connection/           # Database configuration
├── Controllers/      # Business logic for routes
├── Middlewares/       # Authentication and file upload middleware
├── Models/           # Mongoose schemas
├── Routes/           # API route definitions
├── uploads/          # Directory for uploaded images
├── .env              # Environment variables
├── index.js         # Main server file
├── package.json      # Dependencies and scripts
├── ProductManagementAPI.postman_collection.json  # Postman collection for testing
└── README.md         # Project documentation
```

## Setup Instructions

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Athul-Sagar/Backend-Machine-Test.git
   cd BACKEND MACHINE TEST
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Environment Variables**:
   The `.env` file is included in the repository with the following contents:
   ```
   PORT=5000
   MONGO_URL=mongodb+srv://athulsagar547:productmanagement@cluster0.di5ahxx.mongodb.net/ProductManagement?retryWrites=true&w=majority&appName=Cluster0
   JWT_SECRET=secretkeystrong
   ```
   - If you prefer not to use the provided `.env`, create a new `.env` file in the root directory and copy the above contents into it.
  

4. **Run the Application**:
   ```bash
   npm start
   ```
   The server will start on `http://localhost:5000`. You should see "Server running on port 5000" and "MongoDB connected" in the console.

## Testing the API
- **Postman Collection**: The repository includes a Postman collection file named `ProductManagementAPI.postman_collection.json`.
  - Import it into Postman by clicking "Import" and selecting the file.
  - The collection contains separate requests for all test cases:
    - Authentication (register, login, admin setup).
    - Product CRUD operations (add, update, delete, get).
    - Filtering and sorting products.
    - Wishlist management (add, remove, get).
- **Testing Workflow**:
  1. Run "Admin" (`GET /api/auth/admin`) to seed the admin user (if endpoint exists; otherwise, use "Login Admin" after manual setup).
  2. Register and login as a user (`POST /api/auth/register` and `POST /api/auth/login`).
  3. Add products using the "Add Product" requests (e.g., Smartphone, Laptop, T-Shirt).
  4. Test filtering/sorting with requests like "Filter by Category" or "Sort by Price Ascending".
  5. Manage wishlist with "Add to Wishlist" and "Get Wishlist".

## Example Usage
- **Add a Product**:
  - Endpoint: `POST /api/products`
  - Body: Form-data with `name`, `description`, `price`, `category`, and `image` (file).
  - Requires login (cookie with JWT).

- **Get Products with Filters**:
  - Endpoint: `GET /api/products?page=1&category=electronics&minPrice=100&maxPrice=500&sortBy=price_desc`
  - Response: JSON with paginated products.








