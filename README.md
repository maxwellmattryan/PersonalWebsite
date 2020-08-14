# mattmaxwell.tech

Welcome to the codebase for my personal website. This repo contains both the backend and frontend code behind [mattmaxwell.tech](https://mattmaxwell.tech). 

## Overview

- [Angular](#Angular)
    - [Core](#Core)
    - [Modules](#Modules)
    - [Shared](#Shared)
- [Play (Scala)](#Play-(Scala))
    - [Routes (+ HTTP Methods)](#Routes-(+-HTTP-Methods))
- [PostgreSQL](#PostgreSQL)
    - [Schema](#Schema)
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

## Play (Scala)

Play is a powerful framework that leverages the Java Virtual Machine (JVM). It offers a reactive and elastic mechanism to scalability issues, so it is able to keep resource usage to a minimum while still serving my frontend with any data it needs. 

NOTE: This setup could easily be considered overkill for a relatively simple app like this (versus enterprise-grade software leveraging the same tech), but I wanted the challenge of learning this new and incredibly powerful environment.

### Routes (+ HTTP Methods)

- / (GET)
- /admin
    - / (GET)
    - /login (GET)
    - /register (GET*)
- /api
    - / (GET)
    - /admin
        - /auth (POST)
        - /register (POST*)
    - /blog
        - /posts (GET)
        - /posts/:uri (GET, PUT, DELETE)
        - /topics (GET)
        - /topics/:uri (PUT, DELETE)
    - /profiles
        - /:uri (GET, PUT, DELETE)
    - /projects
        - /:uri (GET, PUT, DELETE)
- /blog
    - / (GET)
    - /posts/:uri (GET)
- /editor
    - / (GET)
- /projects
    - /:uri (GET)

_\*This endpoint will not be available on app's deployment._

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

## Acknowledgements

This is the third version of [mattmaxwell.tech](https://mattmaxwell.tech) and it felt just as much of a learning experience this time around as the previous two iterations. However, the whole point of this third re-work was to establish an application architecture that will be as maintainable and extendable as possible so that minimal work is required by me to make changes whenever needed. 

I really appreciate you taking the time to checkout the repository and website - thank you very much. Cheers!