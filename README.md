# Simple Store API with Data Filtering

## This is a simple Node.js application that demonstrates the usage of a store API with a data filtering feature. The application uses the Express framework to create a RESTful API for managing a basic store with products. Users can retrieve products based on specific filters.

# Requirements
 - Node.Js
 - npm
# Installation
  1. git clone https://github.com/mohamedelnadry/store_api_fillters.git
  
  2. cd store_api_fillters
  
  3. npm install

  4. npm start
  
# Usage
  1. Start the application.
  
  2. The application will be running on `http://localhost:3000`.
  
# API Endpoints
### GET /products

Retrieve all products.

#### Query Parameters

- `sort`: Filter products by name or price.
- `fields`: Only view the field for example name, price and company 
- `numericFillter`: Filter products with a price and rating less than or equal to the specified value.

#### Example

GET http://localhost:3000/api/v1/products?name=&sort=name,-price&fields=name,company&numericFillter=price>30,rating>4