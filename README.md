# mattmaxwell.tech

Welcome to the codebase for my personal website. This repo contains both the backend and frontend code behind [mattmaxwell.tech](https://mattmaxwell.tech). 

## Overview

- [Angular](#Angular)
    - [Core](#Core)
    - [Modules](#Modules)
    - [Shared](#Shared)
- [Express / Node](#Express-/-Node)
    - [Routes (+ HTTP Methods)](#Routes-(+-HTTP-Methods))
- [MongoDB](#MongoDB)
    - [Schemas](#Schemas)
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
    - TopicEditorComponent
- Home
    - HomeViewComponent
- Material
    - Modules from Angular Material

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

## Express / Node

Express is quite a lightweight framework that makes it so easy to get applications up and running. I found it to be a smooth and easy-to-use framework that I look forward to working with on future projects.

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
        - /:uri (PUT, DELETE)
- /blog
    - / (GET)
    - /posts/:uri (GET)
- /editor
    - / (GET)
- /projects
    - /:uri (GET)

_\*This endpoint will not be available on app's deployment._

## MongoDB

MongoDB was an excellent database choice for this project. There weren't too many relationships that needed to be established between records, but even the ones that have them are easily handle-able by MongoDB and Mongoose for Express.

### Schemas

- Admin
    - Username (String)
    - Password (String)
- Profile
    - _id (ObjectId)
    - Name (String)
    - URI (String)
    - Tagline (String)
    - About (String)
    - Technologies (Array\<Object>)
    - Projects (Array\<Project>)
- Project
    - _id (ObjectId)
    - URI (String)
    - Profiles (Array\<Profile>)
    - Title (String)
    - Subtitle (String)
    - Description (String)
    - ImageURL (String)
    - Externals (Array\<Object>)
- Post
    - _id (ObjectId)
    - URI (String)
    - Title (String)
    - Subtitle (String)
    - Topics (Array\<Topic>)
    - Author (String)
    - Description (String)
    - Content (String)
    - ImageURL (String)
- Topic
    - _id (ObjectId)
    - URI (String)
    - Name (String)
    - Description (String)
    - ImageURL (String)

## Acknowledgements

This is the third version of [mattmaxwell.tech](https://mattmaxwell.tech) and it felt just as much of a learning experience this time around as the previous two iterations. However, the whole point of this third re-work was to establish an application architecture that will be as maintainable and extendable as possible so that minimal work is required by me to make changes whenever needed. 

I really appreciate you taking the time to checkout the repository and website - thank you very much. Cheers!