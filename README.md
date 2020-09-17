# mattmaxwell.tech

Welcome to the codebase for my personal website! The stack consists of Angular (Typescript), NestJS (Typescript) and PostgreSQL. Please visit the url, [mattmaxwell.dev](https://mattmaxwell.dev), to see it in action!

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
    - [Cloud Build](#Cloud-Build)
    - [Cloud SQL](#Cloud-SQL)
- [Search Engine Optimization](#Search-Engine-Optimization)
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
    - Handles all outgoing requests to the API
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
        - Stores and updates the active profile for the website
    - SEO
        - Formats the URI of anything as long as it's given an ID number and some string identifier (name, title, etc.)
        - Retrieves IDs from URLs containing the same structure returning by the method above
        - Given a Date object, returns a string with formatted superscripts for the date along with month names
    - Validation
        - Using ValidatorFn, verifies that at least one item is selected from an editor's FormArray
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
- Editor
    - PostEditorComponent
    - ProfileEditorComponent
    - ProjectEditorComponent
    - TopicEditorComponent
- Home
    - HomeViewComponent
- Icon
    - SVG-embedded components
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
    - LoadingSpinnerComponent
    - PostCollectionComponent
    - ProjectCollectionComponent
- Interfaces
    - Admin
    - Homepage
- Models
    - Blog Author
    - Blog Post
    - Blog Post Status
    - Blog Topic
    - Deserializable
    - Profile 
    - Profile Status
    - Profile Technology
    - Project

## NestJS

Writing with Typescript is a joy and being able to use it in the backend is incredibly nice. There is minimal context shifting between working with the client-side and server-side code and having compile-tile error checking really helps to increase productivity. NestJS is a backend framework that integrates Typescript into a Express-based environment in a Angular-like style. 

Similar to Angular, it's module packaging is great and feels incredibly consistent to use because it is maintained by the NestJS team within the internal ecosystem.

### API

- /api
    - `GET /api/homepage`
        - Retrieves data needed to populate homepage components on the client side (profile, projects, blog posts, etc.)
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
    - `GET /api/blog/authors`
        - Retrieves list of all authors in the database
        - 200
    - `GET /api/blog/posts`
        - Retrieves list of all published posts in the database
        - 200
    - `POST /api/blog/posts`
        - Creates and saves a new post to the database
        - 201
    - `GET /api/blog/posts/:id`
        - Retrieves a single post corresponding to the `id` path parameter
        - 200
    - `PUT /api/blog/posts/:id`
        - Upserts post data from the client for the post with the corresponding `id`
        - 200
    - `DELETE /api/blog/posts/:id`
        - Removes the post with the corresponding `id` from the database
        - 204
    - `GET /api/blog/posts/statuses`
        - Retrieves list of all post statuses in the database
        - 200
    - `GET /api/blog/topics`
        - Retrieves list of all topics in the database
        - 200
    - `POST /api/blog/topics`
        - Creates and saves a new topic to the database
        - 201
    - `GET /api/blog/topics/:id`
        - Retrieves a single topic corresponding to the `id` path parameter
        - 200
    - `PUT /api/blog/topics/:id`
        - Updates topic data from the client for the topic with the corresponding `id`
        - 200
    - `DELETE /api/blog/topics/:id`
        - Removes the topic with the corresponding `id` from the database
        - 204

- /api/profiles
    - `GET /api/profiles`
        - Retrieves list of all profiles in the database
        - 200
    - `POST /api/profiles`
        - Creates and saves a new profile to the database
        - 201
    - `PUT /api/profiles/:id`
        - Updates profile data from the client for the profile with the corresponding `id`
        - 200
    - `DELETE /api/profiles/:id`
        - Removes the profile with the corresponding `id` from the database
        - 204
    - `PUT /api/profiles/:id/activate`
        - Sets the profile with the corresponding `id` as the application's active profile while setting all other profiles as inactive
        - 200
    - `GET /api/profiles/:id/technologies`
        - Retrieves list of all technologies belonging to the profile with the corresponding `id`
        - 200
    - `GET /api/profiles/statuses`
        - Retrieves list of all profile statuses in the database
        - 200
        
- /api/projects
    - `GET /api/projects`
        - Retrieves list of all projects in the database
        - 200
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

I structured this application in a "layered architecture" style, which corresponds to different layers performing essentially different types of tasks in HTTP's request-response paradigm. The project's directory is setup according to the following modules.

- core/
    - auth/
        - ...
        - `auth.module.ts`
    - database/
        - ...
        - `database.module.ts`
    - http/
        - ...
        - `http.module.ts`
- features/
    - admin/
        - ...
        - `admin.module.ts`
    - api/
        - ...
        - `api.module.ts`
    - blog/
        - ...
        - `blog.module.ts`
    - profile/
        - ...
        - `profile.module.ts`
    - project/
        - ...
        - `project.module.ts`

#### Controllers

Controllers are responsible for handling incoming requests from the client and returning / performing whatever is needed such as some data from database query or a request to delete a user.

Inside every module (minus the HTTP and database modules) exists at least one controller that at least one endpoint for controlling or observing some part of the application. Oftentimes these controllers have been dependency-injected with a service for accessing data and performing some type of operation on it.

#### Services

Services are used by the controllers to perform the real business logic behind that endpoint handled in the controller. We commonly use dependency injection to put them in the constructors of classes to let the compiler know that this (injectable) service needs to be used in this controller (or some other thing).

Services are not the closest layer to the database / data models, but they receive data and maybe after performing some type of operation, calculation, manpiulation, etc. to it and send it back upwards to respective controller. Although they sometimes go by different names, the objects used for accessing the database are often called "repositories".

#### Repositories

Repositories are the objects that actual more or less represents and corresponds to a table in the database. A repository is where data is queried, updated, created, deleted, and so forth. There are multiple methodologies when implementing repositories, which are mainly that we can write very naive and simple repositories that only contain the data attributes and properties that we care about, or that we can write functions alongside those attributes that present the data in different way or even query some particular data from the table to create "more informed" repositories.

### Authentication

Passport is a library that is included within the NestJS packages that offers a proven way to secure the application. Using a JSON web token (JWT) sent back and forth within a HTTP-only cookie is a simple enough way to provide security to an application like this. 

It is worth noting that functionality to register to users has been taken out (aka commented out) in both the frontend and backend so that there is no potential for security fault at least in that endpoint.

### Database 

TypeORM is a powerful library included in the NestJS ecosystem, so initial impressions were strong with how easily it fit together within the backend. It is relatively easy to model relational data with 1:1, 1:n, and m:n relationship types making use of decorators in a NestJS-style. 

Although it was technically a mistake on my part resulting in having to redo some entity code, I was able to implement many to many relationships in a different way using an intermediary table manually setup by me, including the TypeORM entity for it. It worked simply enough, however I would NOT recommend doing it this way. The ORM was not designed to work that way, so it is more worthwhile and important to work idiomatically with the technology used. 

### Error Handling

It is difficult to find a good method that handles errors, and it's important to always try provide helpful messages for when an error occurs. This means that incorporating errors in a more domain-consistent way, which is an incredibly satisfying environment to write in. It is almost like receiving errors feels good.

A lot of these errors are consumed and outputted to the client-side via Material's "snack bar" component. I found this a very easily consistent and lightweight way of handling errors.

## PostgreSQL

Although there are no 1:1 relationships in this database design, there is fortunately enough complexity in the app to warrant a need for 1:n and m:n relation types. For this reason, I chose PostgreSQL to efficiently and optimally handle my data needs opposed to a non-relational database technology like MongoDB (which would still work fine, but is not specifically intended for relational data).

NOTE: What I have listed below is simply the more relevant fields for each table and does not fully represent the actual implementation or design. The more specific details include lookup tables, object-relation mappers, and some extra columns in a few tables.

### Schema

- Admin
    - Username
    - Password
- Blog Author
    - Firstname
    - Lastname
- Blog Post
    - Title
    - Subtitle
    - Content
    - Preview
    - Image URL
    - Status (DRAFT, PUBLISHED, ARCHIVED)
- Blog Topic
    - Name
    - Description
- Profile
    - Name
    - Tagline
    - Landing
    - About
    - Status (ACTIVE, INACTIVE)
- Profile Technology
    - Name
    - Display Order
- Project
    - Name
    - Tagline
    - Description
    - Image URL
    - Link Name
    - Link URL

## Google Cloud Platform

### Cloud Run

Cloud-Run is a tool within the GCP environment that deploys services, which can conveniently host both sides of fullstack applications. It is easy enough to create one, seeing that you're even able to setup the Continuous Deployment (CD) pipeline that can watch repositories on GitHub for pushes to certain branches.

It is also easy to setup multiple services to use for different environments like production, staging, and development. The Cloud Run feature also contains a custom domain mapper that easily integrates domain routing to the different services, so it beyond easy to get a frontend and backend started.

### Cloud Build

As stated earlier, when new pull requests are merged and pushes are made to a branch, builds trigger that are pointed to the different services. I have two builds for pull requests that only build the source code whenever any branch is pushed to. I have two staging builds that build and deploy the corresponding staging services for my UI and API whenever a push is made to my repository's `develop` branch, as well as a duplicate setup for production for the `production` branch.

### Cloud SQL

Each environment (stg, prod, etc.) has a corresponding PostgreSQL instance in Google's Cloud SQL platform. They are declared as connections both in the services' environment variables and connections configuration.

## Search Engine Optimization

Search Engine Optimization (SEO) is hugely important for relevance on the web. There are certain things that we can do, as engineers and developers, to improve the performance of our website in terms of SEO.

This application features dynamic canonical URLs for things like blog posts and projects (or anything with its own separate page view), which improve URL readability and SEO. Similarly, the (HTML) title of a page changes dynamically according to the pages content.

I have also included files like `robots.txt` and the `sitemap.xml` to try and help indexing of my application's pages by Google. 

## Acknowledgements

This is the third version of [mattmaxwell.dev](https://mattmaxwell.dev) and it felt just as much of a learning experience this time around as the previous two iterations. However, the whole point of this third re-work was to establish an application architecture that will be as maintainable and extendable as possible so that minimal work is required by me to make changes whenever needed. 

I really appreciate you taking the time to checkout the repository and website - thank you very much. Cheers!
