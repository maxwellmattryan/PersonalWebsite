# API

## Overview

NestJS is a versatile framework offering many capabilities in a easy-to-use fashion that makes it really nice to work with. Writing with Typescript is a huge plus, especially since it minimizes the context shift between working the front and backend with an Angular-NestJS stack. 

I am using various modules and services to accomplish the various needs of my application, namely authentication, database IO, payment processing, cloud storage access, and customer mailing.

## Architecture

The backend is organized into separate and distinct modules each for allowing certain API functionalities when they are requested for.

Each module follows a [layered architecture](https://en.wikipedia.org/wiki/Multitier_architecture) design pattern, which refers to when different endpoints propagate the request through multiple layers of functionality. The typical implementation of this follows a "controller" -> "service" -> "repository" pattern, which is explained below.

### Controllers

Controllers are responsible for handling incoming requests from the client and returning / performing whatever is needed such as some data from database query or a request to delete a user.

Inside every module (minus the HTTP and database modules) exists at least one controller that at least one endpoint for controlling or observing some part of the application. Oftentimes these controllers have been dependency-injected with a service for accessing data and performing some type of operation on it.

### Services

Services are used by the controllers to perform the real business logic behind that endpoint handled in the controller. We commonly use dependency injection to put them in the constructors of classes to let the compiler know that this (injectable) service needs to be used in this controller (or some other thing).

Services are not the closest layer to the database / data models, but they receive data and maybe after performing some type of operation, calculation, manpiulation, etc. to it and send it back upwards to respective controller. Although they sometimes go by different names, the objects used for accessing the database are often called "repositories".

### Repositories

Repositories are the objects that actual more or less represents and corresponds to a table in the database. A repository is where data is queried, updated, created, deleted, and so forth. There are multiple methodologies when implementing repositories, which are mainly that we can write very naive and simple repositories that only contain the data attributes and properties that we care about, or that we can write functions alongside those attributes that present the data in different way or even query some particular data from the table to create "more informed" repositories.

## Usage

- /api
    - `GET      /api/homepage`
        - Retrieves data needed to populate homepage components on the client side (profile, projects, blog posts, etc.)
        - 200

- /api/auth
    - `POST     /api/auth/login`
        - Authenticates the client if credentials are accepted and returns admin data (id and username)
        - 200
    - `POST     /api/auth/logout`
        - Nullifies the HttpOnly JWT cookie to disable authentication for that admin
        - 200
    - `POST     /api/auth/register`
        - Creates and saves a new admin to the database so long as username does not already exist and the password was accepted (CAUTION: this functionality is not intended to available in the production deployment! Removing code from the controller is sufficient enough).
        - 201

- /api/blog
    - `GET      /api/blog/authors`
        - Retrieves list of all authors in the database
        - 200
    - `GET      /api/blog/posts`
        - Retrieves list of all published posts in the database
        - 200
    - `POST     /api/blog/posts`
        - Creates and saves a new post to the database
        - 201
    - `GET      /api/blog/posts/:id`
        - Retrieves a single post corresponding to the `id` path parameter
        - 200
    - `PUT      /api/blog/posts/:id`
        - Upserts post data from the client for the post with the corresponding `id`
        - 200
    - `DELETE   /api/blog/posts/:id`
        - Removes the post with the corresponding `id` from the database
        - 204
    - `GET      /api/blog/posts/statuses`
        - Retrieves list of all post statuses in the database
        - 200
    - `GET      /api/blog/topics`
        - Retrieves list of all topics in the database
        - 200
    - `POST     /api/blog/topics`
        - Creates and saves a new topic to the database
        - 201
    - `GET      /api/blog/topics/:id`
        - Retrieves a single topic corresponding to the `id` path parameter
        - 200
    - `PUT      /api/blog/topics/:id`
        - Updates topic data from the client for the topic with the corresponding `id`
        - 200
    - `DELETE   /api/blog/topics/:id`
        - Removes the topic with the corresponding `id` from the database
        - 204

- /api/files
    - `GET      /api/files`
        - Retrieves file given a specified URI (via query param)
        - 200
    - `POST     /api/files/upload`
        - Uploads a given file at a specified folder path (via query param) to the server
        - 201
    - `DELETE   /api/files/delete`
        - Deletes file given a specified URI (via query param)
        - 204

- /api/portfolio
    - `GET      /api/portfolio/profiles`
        - Retrieves list of all profiles in the database
        - 200
    - `POST     /api/portfolio/profiles`
        - Creates and saves a new profile to the database
        - 201
    - `PUT      /api/portfolio/profiles/:id`
        - Updates profile data from the client for the profile with the corresponding `id`
        - 200
    - `DELETE   /api/portfolio/profiles/:id`
        - Removes the profile with the corresponding `id` from the database
        - 204
    - `PUT      /api/portfolio/profiles/:id/activate`
        - Sets the profile with the corresponding `id` as the application's active profile while setting all other profiles as inactive
        - 200
    - `GET      /api/portfolio/profiles/:id/technologies`
        - Retrieves list of all technologies belonging to the profile with the corresponding `id`
        - 200
    - `GET      /api/portfolio/profiles/statuses`
        - Retrieves list of all profile statuses in the database
        - 200
    - `GET      /api/portfolio/projects`
        - Retrieves list of all projects in the database
        - 200
    - `POST     /api/portfolio/projects`
        - Creates and saves a new project to the database
        - 201
    - `GET      /api/portfolio/projects/:id`
        - Retrieves a single project corresponding to the `id` path parameter
        - 200
    - `PUT      /api/portfolio/projects/:id`
        - Updates project data from the client for the project with the corresponding `id`
        - 200
    - `DELETE   /api/portfolio/projects/:id`
        - Removes the project with the corresponding `id` from the database
        - 204

- /api/shop
    - `GET      /api/shop/categories`
        - Retrieves list of all categories in the database
        - 200
    - `POST     /api/shop/categories`
        - Creates and saves a new category to the database
        - 201
    - `GET      /api/shop/categories/:id`
        - Retrieves a single category corresponding to the `id` path parameter
        - 200
    - `PUT      /api/shop/categories/:id`
        - Updates category data from the client for the product with the corresponding `id`
        - 200
    - `DELETE   /api/shop/categories/:id`
        - Removes the category with the corresponding `id` from database
        - 204
    - `POST     /api/shop/checkout/init`
        - Returns Stripe session ID to client
        - 201
    - `POST     /api/shop/checkout/complete`
        - Returns order made by customer (or already-existing order if customer purchased the same item(s))
        - 200 
    - `POST     /api/shop/customers`
        - Creates and saves a new customer to the database
        - 201
    - `POST     /api/shop/customers/help`
        - Sends email to customer with URLs to download purchased products
        - 200
    - `GET      /api/shop/products`
        - Retrieves list of all products in the database
        - 200
    - `POST     /api/shop/products`
        - Creates and saves a new product to the database
        - 201
    - `GET      /api/shop/products/:id`
        - Retrieves a single product corresponding to the `id` path parameter
        - 200
    - `PUT      /api/shop/products/:id`
        - Updates product data from the client for the product with the corresponding `id`
        - 200
    - `DELETE   /api/shop/products/:id`
        - Removes the product with the corresponding `id` from database (will "soft delete" if unable to fully remove)
        - 204
    - `GET      /api/shop/product-statuses`
        - Retrieves list of all product statuses in the database
        - 200
    - `POST     /api/shop/orders`
        - Creates and saves a new order to the database
        - 201
        