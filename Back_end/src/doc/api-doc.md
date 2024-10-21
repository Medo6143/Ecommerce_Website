
# E-commerce API Documentation

### **Base URL**: 
`http://localhost:3000/api/`

---

## **Authentication Endpoints**

### **POST `/auth/register`** - Register a new user
- **Description**: Registers a new user in the system.
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "email": "johndoe@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  ```json
  {
    "message": "User registered successfully",
    "user": {
      "_id": "user_id",
      "name": "John Doe",
      "email": "johndoe@example.com"
    }
  }
  ```

### **POST `/auth/login`** - Login an existing user
- **Description**: Logs in a user and returns a JWT token.
- **Request Body**:
  ```json
  {
    "email": "mohamed@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  ```json
  {
    "token": "jwt_token",
    "user": {
      "_id": "user_id",
      "name": " mohamed",
      "email": "mohamed@example.com"
    }
  }
  ```

---

## **Product Endpoints**

### **GET `/products`** - Get all products
- **Description**: Retrieves a list of all available products.
- **Response**:
  ```json
  [
    {
      "_id": "product_id",
      "name": "iPhone 13",
      "description": "Latest Apple smartphone.",
      "price": 999.99,
      "image": "https://example.com/image.jpg"
    },
    {
      "_id": "product_id",
      "name": "MacBook Pro",
      "description": "Apple laptop.",
      "price": 1999.99,
      "image": "https://example.com/image.jpg"
    }
  ]
  ```

### **GET `/products/:productId`** - Get product by ID
- **Description**: Retrieves a product's details by its ID.
- **URL Params**:
  - `productId`: The ID of the product to retrieve.
- **Response**:
  ```json
  {
    "_id": "product_id",
    "name": "iPhone 13",
    "description": "Latest Apple smartphone.",
    "price": 999.99,
    "image": "https://example.com/image.jpg"
  }
  ```

---

## **Cart Endpoints**

### **GET `/cart/:userId`** - Get cart by user ID
- **Description**: Retrieves the cart details for a specific user.
- **URL Params**:
  - `userId`: The ID of the user whose cart to retrieve.
- **Response**:
  ```json
  {
    "userId": "user_id",
    "items": [
      {
        "productId": {
          "_id": "product_id",
          "name": "iPhone 13",
          "image": "https://example.com/image.jpg",
          "price": 999.99
        },
        "quantity": 1
      },
      {
        "productId": {
          "_id": "product_id",
          "name": "MacBook Pro",
          "image": "https://example.com/image.jpg",
          "price": 1999.99
        },
        "quantity": 2
      }
    ]
  }
  ```

### **POST `/cart/add`** - Add product to cart
- **Description**: Adds a product to a user's cart.
- **Request Body**:
  ```json
  {
    "userId": "user_id",
    "productId": "product_id",
    "quantity": 1
  }
  ```
- **Response**:
  ```json
  {
    "userId": "user_id",
    "items": [
      {
        "productId": {
          "_id": "product_id",
          "name": "iPhone 13",
          "image": "https://example.com/image.jpg",
          "price": 999.99
        },
        "quantity": 1
      }
    ]
  }
  ```

### **DELETE `/cart/remove/:userId/:productId`** - Remove product from cart
- **Description**: Removes a specific product from a user's cart.
- **URL Params**:
  - `userId`: The ID of the user.
  - `productId`: The ID of the product to remove.
- **Response**:
  ```json
  {
    "message": "Product removed from cart",
    "cart": {
      "userId": "user_id",
      "items": []
    }
  }
  ```

---

## **Order Endpoints**

### **POST `/orders/checkout`** - Place an order
- **Description**: Converts the user's cart into an order.
- **Request Body**:
  ```json
  {
    "userId": "user_id"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Order placed successfully",
    "order": {
      "userId": "user_id",
      "items": [
        {
          "productId": "product_id",
          "name": "iPhone 13",
          "image": "https://example.com/image.jpg",
          "quantity": 1
        }
      ],
      "totalAmount": 999.99,
      "status": "Pending",
      "createdAt": "2024-10-19T12:00:00Z"
    }
  }
  ```

### **GET `/orders/user/:userId`** - Get all orders for a user
- **Description**: Retrieves all orders for a specific user.
- **URL Params**:
  - `userId`: The ID of the user.
- **Response**:
  ```json
  [
    {
      "_id": "order_id",
      "userId": "user_id",
      "items": [
        {
          "productId": "product_id",
          "name": "iPhone 13",
          "image": "https://example.com/image.jpg",
          "quantity": 1
        }
      ],
      "totalAmount": 999.99,
      "status": "Pending",
      "createdAt": "2024-10-19T12:00:00Z"
    }
  ]
  ```

### **PUT `/orders/update-status/:orderId`** - Update order status
- **Description**: Updates the status of an order (e.g., to "Shipped", "Delivered").
- **URL Params**:
  - `orderId`: The ID of the order to update.
- **Request Body**:
  ```json
  {
    "status": "Shipped"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Order status updated",
    "order": {
      "_id": "order_id",
      "status": "Shipped"
    }
  }
  ```

---
