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
- HTTP
    - Admin
        - Authenticates from login
        - Registers new admin
    - Posts
        - Create, read, update, and delete posts
        - Get data for all posts
    - Profile
        - Get the currently selected profile for homepage data
    - Topics
        - Get data for specific topic
        - Get data for all topics
- Services
    - Editor
        - Get, has, and set operations for the PostEditorComponent
    - Notification
        - Creates Angular Material SnackBar popup
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
- Home
    - HomeViewComponent
- Material
    - Used components from Angular Material

### Shared

The 'shared' folder contains all of the things that are going to be commonly used throughout the entire application and will appear on a majority of the pages. Having access to all of these needed Angular structures through a single 'shared' access point has made the whole development (and debug) process a lot easier.

- Components
    - FooterComponent
    - HeaderComponent
    - PostCollectionComponent
    - ProjectCollectionComponent
    - TopicCollectionComponent
- Interfaces
    - Admin
    - Blog
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
    - /admin
        - /auth (POST)
        - /register (POST)
    - /blog
        - / (GET)
        - /posts/:uri (GET, PUT, DELETE)
        - /topics (GET)
        - /topics/:uri (GET, PUT, DELETE)
    - /profiles
        - /:uri (GET, PUT, DELETE)
- /blog
    - / (GET)
    - /posts/:uri (GET)
    - /topics/:uri (GET)
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
    - Posts (Array\<Post>)

## Acknowledgements

This is the third version of [mattmaxwell.tech](https://mattmaxwell.tech) and it felt just as much of a learning experience this time around as the previous two iterations. However, the whole point of this third re-work was to establish an application architecture that will be as maintainable and extendable as possible so that minimal work is required by me to make changes whenever needed. 

I really appreciate you taking the time to checkout the repository and website - thank you very much. Cheers!