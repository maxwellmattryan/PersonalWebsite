# mattmaxwell.dev

Welcome to the codebase for my personal web application! The stack consists of Angular, NestJS, and PostgreSQL. Please visit the url, [mattmaxwell.dev](https://mattmaxwell.dev), to see it in action!

## Overview

- [API](#API)
- [UI](#UI)
- [Database](#Database)
- [Deployment](#Deployment)
- [Storage](#Storage)
- [Search Engine Optimization](#Search-Engine-Optimization)
- [Acknowledgements](#Acknowledgements)

## API

The API is built with the [NestJS](https://nestjs.com/) framework, which offers an incredibly similar feel to Angular. It has many capabilities, so please feel free to read more on the [API page](api/).

## UI

The UI is built with the [Angular](https://angular.io/) framework, offering an extensive and well-maintained library of functionality to use on the client-side. Check out the [UI page](ui/) to read more.

## Database

Although there are no 1:1 relationships in this database design, there is fortunately enough complexity in the app to warrant a need for 1:n and m:n relation types. For this reason, I chose PostgreSQL to efficiently and optimally handle my data needs opposed to a non-relational database technology like MongoDB (which would still work fine, but is not specifically intended for relational data).

## Deployment

The current deployment uses Heroku, where it is easy and affordable to get apps up and running. While I ultimately prefer GCP, it is too expensive for this type of application. 

## Search Engine Optimization

Search Engine Optimization (SEO) is hugely important for relevance on the web. There are certain things that we can do, as engineers and developers, to improve the performance of our website in terms of SEO.

This application features dynamic canonical URLs for things like blog posts and projects (or anything with its own separate page view), which improve URL readability and SEO. Similarly, the (HTML) title of a page changes dynamically according to the pages content.

I have also included files like `robots.txt` and the `sitemap.xml` to try and help indexing of my application's pages by Google. 

## Acknowledgements

This is the third version of [mattmaxwell.dev](https://mattmaxwell.dev) and it felt just as much of a learning experience this time around as the previous two iterations. However, the whole point of this third re-work was to establish an application architecture that will be as maintainable and extendable as possible so that minimal work is required by me to make changes whenever needed. 

I really appreciate you taking the time to checkout the repository and website - thank you very much. Cheers!
