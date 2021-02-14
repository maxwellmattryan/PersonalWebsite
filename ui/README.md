# UI 

## Overview

Angular is quite a robust framework and really provides a maintainable solution to creating dynamic web applications. The project is setup with three main folders, which are 'core', 'modules', and 'shared, each of which is explained below.

## Architecture

Similar to the backend, the frontend project is broken up into modules where each one corresponds to a large distinct chunk of functionality, like a blog or a portfolio.

The per-module design is similar to [layered architecture](https://en.wikipedia.org/wiki/Multitier_architecture) pattern, but the components use services more loosely from other modules if needed and business logic isn't necessarily as strictly contained as it is in the backend. 

It should also be noted that terminology is sort of constrained to that which is used in the Angular ecosystem. The terms to note here are "component", "service", and "model". 

### Components

These are the main entities responsible for the interaction the users have with the backend. Components contain all of the functionality responsible for handling routes, including the services and other logic needed for business needs.

### Services

Services are classes that provide specific functionality to components where they are instantiated. These can be anything including input validation, API requests, and anything else that you could need.

### Models

Models are pre-defined data structures that typically correspond to the data that we'll be passing back and forth in requests. They do **NOT** contain functionality, rather properties.

*NOTE: It's worth looking into partial class construction in ES6+ so that it is possible to create instances of our data types with nullable entries.*
