# mattmaxwell.tech

Welcome to the codebase for my personal website! The stack consists of Angular (Typescript), NestJS (Typescript) and PostgreSQL. This is still a WIP so the [older version](https://github.com/maxwellmattryan/mattmaxwell/tree/18b58014534d12baa9d7ebb8a747f8253b89cbf7) (ReactJS only) is currently deployed at [mattmaxwell.tech](https://mattmaxwell.tech).

## Overview

- [Angular](#Angular)
    - [Core](#Core)
    - [Modules](#Modules)
    - [Shared](#Shared)
- [NestJS](#NestJS)
    - [API](#API)
    - [Architecture](#Architecture)
    - [Authentication](#Authentication)
    - [Database](#Database)
    - [Error Handling](#Error-Handling)
- [PostgreSQL](#PostgreSQL)
    - [Schema](#Schema)
- [Google Cloud Platform](#Google-Cloud-Platform)
    - [Cloud Run](#Cloud-Run)
- [Acknowledgements](#Acknowledgements)

## Angular 

Angular is quite a robust framework and really provides a maintainable solution to creating dynamic web applications. The project is setup with three main folders, which are 'core', 'modules', and 'shared, each of which is explained below.

### Core

These services are used across the entire applications, so it is most organizationally useful to put things like the HTTP client, authentication mechanisms, and any other application-wide services into a singular place.

- Authentication
    - Logs admin in / out
    - Check if admin is logged in
    - Load / store token and admin username to local storage
    - Returns HttpHeaders with authorization key-value for JWT
    - Contains interceptor for handling 401 / 403 errors
- HTTP
    - Admin
        - Authenticates from login
        - Registers new admin
    - Homepage
        - Get data for homepage request (aka profile and posts)
    - Posts
        - Create, read, update, and delete posts
        - Get data for all posts
    - Profile
        - Get the currently selected profile for homepage data
        - Get all profiles (used to select profile in dashboard)
    - Topics
        - Get and delete topic
        - Get data for all topics
- Services
    - Blog
        - Get and set active topic to display
    - Comparison
        - Contains functions to sort arrays of the various models, etc.
    - Editor
        - Get, has, and set operations for the various editor components
    - Notification
        - Creates Angular Material SnackBar popup
    - Profile
        - Get and set the active profile to display
    - Validation
        - Using ValidatorFn, verifies that at least one topic is selected from the editor's topic FormArray
        - Verifies admin credentials when logging in (and registering*)

_\*This functionality will not be available on app's deployment._

### Modules

Each module roughly corresponds to a page view of the web app and contains the necessary components for handling the logic of that particular route. With them being located in a 'modules' folder, they are able to be re-used effectively and efficiently.

- Admin
    - DashboardComponent
    - LoginComponent
    - RegisterComponent
- Blog
    - BlogViewComponent
    - PostViewComponent
    - TopicViewComponent
- Editor
    - PostEditorComponent
    - ProjectEditorComponent
    - TopicEditorComponent
- Home
    - HomeViewComponent
- Material
    - Modules from Angular Material
- Project
    - ProjectViewComponent

### Shared

The 'shared' folder contains all of the things that are going to be commonly used throughout the entire application and will appear on a majority of the pages. Having access to all of these needed Angular structures through a single 'shared' access point has made the whole development (and debug) process a lot easier.

- Components
    - AboutComponent
    - FooterComponent
    - HeaderComponent
    - LandingComponent
    - PostCollectionComponent
    - ProjectCollectionComponent
    - TopicCollectionComponent
- Interfaces
    - Admin
    - Blog
    - Homepage
- Models
    - Deserializable
    - Post
    - Profile 
    - Project
    - Topic

## NestJS

Writing with Typescript is a joy and being able to use it in the backend is incredibly nice. There is minimal context shifting between working with the client-side and server-side code and having compile-tile error checking really helps to increase productivity. NestJS is a backend framework that integrates Typescript into a Express-based environment in a Angular-like style. 

Similar to Angular, it's module packaging is great and feels incredibly consistent to use because it is maintained by the NestJS team within the internal ecosystem.

### API

- /api
    - `GET /api`
        - Retrieves data needed to populate components on the client side (profile, projects, blog posts, etc.)
        - 200

- /api/auth
    - `POST /api/auth/login`
        - Authenticates the client if credentials are accepted and returns admin data (id and username)
        - 200
    - `POST /api/auth/logout`
        - Nullifies the HttpOnly JWT cookie to disable authentication for that admin
        - 200
    - `POST /api/auth/register`
        - Creates and saves a new admin to the database so long as username does not already exist and the password was accepted (CAUTION: this functionality is not intended to available in the production deployment! Removing code from the controller is sufficient enough).
        - 201

- /api/blog
    - `GET /api/blog/posts`
        - Retrieves list of all posts in the database
        - 200
    - `GET /api/blog/posts/:id`
        - Retrieves a single post corresponding to the `id` path parameter
        - 200
    - `PUT /api/blog/posts/:id`
        - Upserts post data from the client for the post with the corresponding `id`
        - 200, 201
    - `DELETE /api/blog/posts/:id`
        - Removes the post with the corresponding `id` from the database
        - 204
    - `GET /api/blog/topics`
        - Retrieves list of all topics in the database
        - 200
    - `PUT /api/blog/topics/:id`
        - Upserts topic data from the client for the topic with the corresponding `id` 
        - 200, 201
    - `DELETE /api/blog/topics/:id`
        - Removes the topic with the corresponding `id` from the database
        - 204

- /api/profiles
    - `GET /api/profiles`
        - Retrieves list of all profiles in the database
        - 200
    - `GET /api/profiles/:id`
        - Retrieves a single profile corresponding to the `id` path parameter
        - 200
    - `PUT /api/profiles/:id`
        - Upserts profile data from the client for the profile with the corresponding `id`
        - 200, 201
    - `DELETE /api/profiles/:id`
        - Removes the profile with the corresponding `id` from the database
        - 204
    - `PUT /api/profiles/:id/activate`
        - Sets the profile with the corresponding `id` as the application's active profile while setting all other profiles as inactive
        - 200
        
- /api/projects
    - `POST /api/projects`
        - Creates and saves a new project to the database
        - 201
    - `GET /api/projects/:id`
        - Retrieves a single project corresponding to the `id` path parameter
        - 200
    - `PUT /api/projects/:id`
        - Updates project data from the client for the project with the corresponding `id`
        - 200
    - `DELETE /api/projects/:id`
        - Removes the project with the corresponding `id` from the database
        - 204

### Architecture

I structured this application in a "layered architecture" style, which corresponds to different layers performing essentially different types of tasks in HTTP's request-response paradigm.

#### Controllers

Controllers are responsible for handling incoming requests from the client and returning / performing whatever is needed such as some data from database query or a request to delete a user. 

#### Services

Services are used by the controllers to perform the real business logic behind that endpoint handled in the controller.

#### Repositories

Repositories are the objects that actual more or less represents and corresponds to a table in the database. A repository is where data is queried, updated, created, deleted, and so forth.

### Authentication

Passport is a library that is included within the NestJS packages that offers a proven way to secure the application. Using a JSON web token (JWT) sent back and forth within a HTTP-only cookie is a simple enough way to provide security to an application like this.  

### Database 

TypeORM is a powerful library included in the NestJS ecosystem, so initial impressions were strong with how easily it fit together within the backend. It is relatively easy to model relational data with 1:1, 1:n, and m:n relationship types making use of decorators in a NestJS-style.

### Error Handling

It is difficult to find a good method that handles errors, and it's important to always try provide helpful messages for when an error occurs. This means that incorporating errors in a more domain-consistent way, which is an incredibly satisfying environment to write in.

## PostgreSQL

Although there are no 1:1 relationships in this database design, there is fortunately enough complexity in the app to warrant a need for 1:n and m:n relation types. For this reason, I chose PostgreSQL to efficiently and optimally handle my data needs opposed to a non-relational database technology like MongoDB (which would still work fine, but is not specifically intended for relational data).

NOTE: What I have listed below is simply the more relevant fields for each table and does not fully represent the actual implementation or design. The more specific details include lookup tables, object-relation mappers, and some extra columns in a few tables.

### Schema

- Admin
    - Username
    - Password
- Author
    - Firstname
    - Lastname
- Post
    - Title
    - Content
    - Preview
    - Image URL
    - Status (DRAFT, PUBLISHED)
- Topic
    - Name
    - Description
- Profile
    - Name
    - Tagline
    - Landing
    - About
    - Status (ACTIVE, INACTIVE)
- Project
    - Name
    - Tagline
    - Description
    - Image URL
    - External URL
- Technology
    - Name
    - Icon URL
    - Display Order

## Google Cloud Platform

Google Cloud Platform (GCP) offers an extensive toolkit to deploy applications.

### Cloud Run

Cloud-Run is a tool within the GCP environment that deploys apps or something.

## Acknowledgements

This is the third version of [mattmaxwell.tech](https://mattmaxwell.tech) and it felt just as much of a learning experience this time around as the previous two iterations. However, the whole point of this third re-work was to establish an application architecture that will be as maintainable and extendable as possible so that minimal work is required by me to make changes whenever needed. 

I really appreciate you taking the time to checkout the repository and website - thank you very much. Cheers!
