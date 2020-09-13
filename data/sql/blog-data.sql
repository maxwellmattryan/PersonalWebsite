INSERT INTO blog_author(first_name, last_name) VALUES ('Matthew', 'Maxwell');

INSERT INTO blog_post_status(status) VALUES ('DRAFT');
INSERT INTO blog_post_status(status) VALUES ('PUBLISHED');
INSERT INTO blog_post_status(status) VALUES ('ARCHIVED');

INSERT INTO blog_post(author_id, status_id, title, subtitle, preview, content, image_url)
VALUES (1,
       2,
       'The Constraints of Audio Programming',
       'Restrictions of the digital audio domain',
       'Programming for audio software is such a fascinating problem domain and requires some interesting ways of thinking to write optimal code.',
        '# TITLE

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus urna neque viverra justo nec ultrices. Nunc faucibus a pellentesque sit amet porttitor eget dolor morbi. Libero enim sed faucibus turpis in eu mi bibendum neque. Id aliquet risus feugiat in. Tortor at auctor urna nunc id. Eu turpis egestas pretium aenean. Suspendisse sed nisi lacus sed viverra tellus in. Quis commodo odio aenean sed. Non arcu risus quis varius quam quisque id diam vel.

<br>

```typescript
ngOnInit(): void {
    this.isAdmin = this.authService.isLoggedIn();

    this.apiService.getPost(this.router.url).subscribe(post => {
        if(post.status.status !== ''PUBLISHED'' && !this.isAdmin) {
            this.notificationService.createNotification(''Unable to view the blog post.'');
            this.router.navigate(['''']);
        }

        this.post = post;
        this.post.topics.sort(this.comparisonService.topics);

        this.isLoaded = true;
    }, (error: HttpErrorResponse) => {
        this.notificationService.createNotification(error.error.message);
    });
}
```

<br>

Sed adipiscing diam donec adipiscing tristique. Interdum velit euismod in pellentesque massa. Ultricies lacus sed turpis tincidunt id aliquet risus feugiat in. Posuere urna nec tincidunt praesent semper feugiat nibh sed pulvinar. Facilisi cras fermentum odio eu feugiat pretium nibh ipsum. Mattis molestie a iaculis at. Amet porttitor eget dolor morbi non. Elit scelerisque mauris pellentesque pulvinar pellentesque habitant morbi tristique senectus. Ut morbi tincidunt augue interdum velit. Vel quam elementum pulvinar etiam non quam. Vulputate odio ut enim blandit volutpat maecenas volutpat. Sollicitudin nibh sit amet commodo nulla facilisi nullam vehicula. Convallis posuere morbi leo urna molestie at elementum eu. Condimentum mattis pellentesque id nibh tortor id aliquet lectus. Amet venenatis urna cursus eget nunc scelerisque viverra mauris.',
       'assets/images/projects/rotor.png');

INSERT INTO blog_post(author_id, status_id, title, subtitle, preview, content, image_url)
VALUES (1,
       2,
       'Making a Game for the 2019 Global Game Jam',
       'No sleep, only game development',
       'Making a game for a game jam is quite an intense experience, but is beyond rewarding if you''re willing to learn new skills or hone some old ones.',
        '# TITLE

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus urna neque viverra justo nec ultrices. Nunc faucibus a pellentesque sit amet porttitor eget dolor morbi. Libero enim sed faucibus turpis in eu mi bibendum neque. Id aliquet risus feugiat in. Tortor at auctor urna nunc id. Eu turpis egestas pretium aenean. Suspendisse sed nisi lacus sed viverra tellus in. Quis commodo odio aenean sed. Non arcu risus quis varius quam quisque id diam vel.

<br>

```typescript
ngOnInit(): void {
    this.isAdmin = this.authService.isLoggedIn();

    this.apiService.getPost(this.router.url).subscribe(post => {
        if(post.status.status !== ''PUBLISHED'' && !this.isAdmin) {
            this.notificationService.createNotification(''Unable to view the blog post.'');
            this.router.navigate(['''']);
        }

        this.post = post;
        this.post.topics.sort(this.comparisonService.topics);

        this.isLoaded = true;
    }, (error: HttpErrorResponse) => {
        this.notificationService.createNotification(error.error.message);
    });
}
```

<br>

Sed adipiscing diam donec adipiscing tristique. Interdum velit euismod in pellentesque massa. Ultricies lacus sed turpis tincidunt id aliquet risus feugiat in. Posuere urna nec tincidunt praesent semper feugiat nibh sed pulvinar. Facilisi cras fermentum odio eu feugiat pretium nibh ipsum. Mattis molestie a iaculis at. Amet porttitor eget dolor morbi non. Elit scelerisque mauris pellentesque pulvinar pellentesque habitant morbi tristique senectus. Ut morbi tincidunt augue interdum velit. Vel quam elementum pulvinar etiam non quam. Vulputate odio ut enim blandit volutpat maecenas volutpat. Sollicitudin nibh sit amet commodo nulla facilisi nullam vehicula. Convallis posuere morbi leo urna molestie at elementum eu. Condimentum mattis pellentesque id nibh tortor id aliquet lectus. Amet venenatis urna cursus eget nunc scelerisque viverra mauris.',
       'assets/images/projects/operation-home.png');

INSERT INTO blog_post(author_id, status_id, title, subtitle, preview, content, image_url)
VALUES (1,
       1,
       'My First Internship Experience',
       'Navigating a new tech environment in Japanese',
       'This post is going to be about going through my first internship experience and the things I learned throughout the process.',
        '# TITLE

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus urna neque viverra justo nec ultrices. Nunc faucibus a pellentesque sit amet porttitor eget dolor morbi. Libero enim sed faucibus turpis in eu mi bibendum neque. Id aliquet risus feugiat in. Tortor at auctor urna nunc id. Eu turpis egestas pretium aenean. Suspendisse sed nisi lacus sed viverra tellus in. Quis commodo odio aenean sed. Non arcu risus quis varius quam quisque id diam vel.

<br>

```typescript
ngOnInit(): void {
    this.isAdmin = this.authService.isLoggedIn();

    this.apiService.getPost(this.router.url).subscribe(post => {
        if(post.status.status !== ''PUBLISHED'' && !this.isAdmin) {
            this.notificationService.createNotification(''Unable to view the blog post.'');
            this.router.navigate(['''']);
        }

        this.post = post;
        this.post.topics.sort(this.comparisonService.topics);

        this.isLoaded = true;
    }, (error: HttpErrorResponse) => {
        this.notificationService.createNotification(error.error.message);
    });
}
```

<br>

Sed adipiscing diam donec adipiscing tristique. Interdum velit euismod in pellentesque massa. Ultricies lacus sed turpis tincidunt id aliquet risus feugiat in. Posuere urna nec tincidunt praesent semper feugiat nibh sed pulvinar. Facilisi cras fermentum odio eu feugiat pretium nibh ipsum. Mattis molestie a iaculis at. Amet porttitor eget dolor morbi non. Elit scelerisque mauris pellentesque pulvinar pellentesque habitant morbi tristique senectus. Ut morbi tincidunt augue interdum velit. Vel quam elementum pulvinar etiam non quam. Vulputate odio ut enim blandit volutpat maecenas volutpat. Sollicitudin nibh sit amet commodo nulla facilisi nullam vehicula. Convallis posuere morbi leo urna molestie at elementum eu. Condimentum mattis pellentesque id nibh tortor id aliquet lectus. Amet venenatis urna cursus eget nunc scelerisque viverra mauris.',
       'assets/images/projects/green-foot.png');

INSERT INTO blog_post(author_id, status_id, title, subtitle, preview, content, image_url, created_at)
VALUES (
        1,
        2,
        'JSON Web Token (JWT) Authentication with NestJS and TypeORM',
        'A cookie-based approach to solving authentication',
        'Authentication is a huge concern among many when developing a web-based application. There exist multiple solutions for implementing mechanisms to authenticate users and post is an overview of the JWT-based approach.',
        '# The NestJS Framework and Authentication

<br>

This project''s source code is visible here at its [GitHub repository](https://github.com/maxwellmattryan/nestjs-jwt-auth) if you wish to download it as a starter project and get going. If you''d like to see how I set up the the project as is in the repo the follow along with the rest of the post.

<br><br>

## Authentication

<br>

In a literal sense, "authentication" refers to the act of proving some assertion, whether it be the identity of a person or the user of a computer system. It is not necessarily the process of identifying whatever the credentials may be but rather the process of verifying them.

<br>

With the power of authentication, we can have things like permissions and guards that serve to prevent users who are not authorized or who are forbidden towards committing certain actions or having access to particular pages. For example, it''s important that guards are put in place for endpoints that deal with modifying data in any way. If there is a way to delete a resource that belongs to a user that I don''t know or have the credentials of then that is a major security concern.

<br><br>

### JSON Web Token

<br>

The [JSON Web Token](https://en.wikipedia.org/wiki/JSON_Web_Token) is a protocol for encrypted signatures that contain JSON data for making certain claims to the server (or wherever else they''re being sent) to help with our security concerns. The information specifically refers to things like the signature generation algorithm, types of predefined types of login names, expiration times, the raw token string itself, and more. I will explain more specifcally later when we actually generate the token for cookie storage.

<br>

A JWT is returned to a user when they successfully login with credentials after they have been verified in by the authentication process. We need them to grant authorization access to users wanting to do things that people typically might in a CRUD (Create, read, update, and delete) application.

<br><br>

### Cookies

<br>

As far as HTTP is concerned [cookies](https://en.wikipedia.org/wiki/HTTP_cookie) are small (less than 4kb) pieces of data that are stored on the client-side while interacting with websites. They are a useful and consistent mechanism implemented by the browser for holding useful information like browsing sessions.

<br>

They are set programmatically quite easily via the class API for the `Request` object in Express. I will explain more later when it comes time to generate the cookie and attach it as an HTTP header.

<br><br>

# Setup

<br>

Begin with initializing an blank and empty NestJS project. You can use these commands to install the command-line interface and generate a new project.

<br>

```
$ npm install -g @nestjs/cli
$ nest new <app-name-here>
```

<br><br>

## Middleware

<br>

### Logger

<br>

Before starting the server, I like to add logging middleware before I get started mainly because enabling this make things easier for ourselves to debug in the future.

<br>

It''ll be important to see our incoming HTTP requests as they are received by the server, and NestJS doesn''t have logging enabled by default. There are multiple ways to handle logging of http requests, and the package I''ll be using to log reqests is called morgan and is pretty commonly used logging middleware with Express, which NestJS uses under the hood by default.

<br>

Start off by installing the npm package with:

<br>

```
$ npm install morgan --save
```

<br>

We can now use it within our `main.ts` file for the underlying Express app.

<br>

```typescript
import { NestFactory } from ''@nestjs/core'';
import { AppModule } from ''./app.module'';

// Import the logging middleware for console output of HTTP requests
import * as morgan from ''morgan'';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // Initialize with "tiny" option - prefined formatting for string output
    app.use(morgan(''tiny''));

    await app.listen(3000);
}

bootstrap();
```

<br><br>

### Cookie Parser

<br>

Let''s also install a library for parsing cookies as we will need to have it for our JWT cookie mechanism to work.

<br>

```
$ npm install cookie-parser --save
```

<br>

After importing the `morgan` and `cookie-parser` npm packages, let''s tell our app to use them as a middleware, meaning our `main.ts` file will some new changes.

<br>

```typescript
...

// Import the cookie parser npm package that was just installed
import * as cookieParser from ''cookie-parser'';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.use(morgan(''tiny''));

    // Input the cookie parser into the middleware pipeline
    app.use(cookieParser());

    await app.listen(3000);
}

bootstrap();
```

<br>

Now run the server with the following command (":dev" tells NestJS to watch the source code files when changes are made and restarts the server) the npm and verify by visiting localhost at port 3000 (default) in your browser or with a tool like [Postman](https://www.postman.com/).

<br>

```
$ npm run start:dev
```

<br>

The output of the console should look similar to this. We can see NestJS initializing the dependencies of the application, mapping the routes defined in our single app controller, and starting the application.

<br>

<div class="post__image-container">
    <img class="post__image" alt="Output of npm morgan logging library" src="assets/images/blog/01-morgan-logging-output.png">
</div>

<br><br>

## TypeORM

<br>

We need to have some sort of persistent storage and way to access it in order to verify user credentials against. This means methods for creating users, logging them in, and logging them out. There are different ways to design applications that access some type of data source, but one common way is [layered architecture](https://www.oreilly.com/library/view/software-architecture-patterns/9781491971437/ch01.html).

<br>

In a layered architecture, we use classes called "repositories" which serve as an access point for a database. Here we perform operations like retrieving users, creating new ones, or deleting them. With [TypeORM](https://typeorm.io/#/), the solution is quite simple, and although there is just a little boilerplate, it''s really not too bad.

<br>

Run the following command to install TypeORM, but don''t forget to add the specific database driver of choice beforehand.

<br>

```
$ npm install @nestjs/typeorm typeorm <npm-db-driver-here> --save
```

<br><br>

### Database

<br>

We need to get a database up and running for this to really work, so just make sure that you something installed, liked [PostgreSQL](https://www.postgresql.org/download/), or [MySQL](https://www.mysql.com/downloads/). Make sure that the npm database drivers you just installed match whatever you''re using here.

<br>

Remember the database name, because we will use it later in our confiuration for TypeORM.

<br><br>

### Configuration

<br>

There are two ways we can do database configuration with TypeORM. We can write all of our configuration in the code of our `app.module.ts`, or we opt for an `ormconfig.json` file in the root directory that holds the same information. Let''s try the latter of the two!

<br>

```
- nestjs-jwt-auth/
    - node_modules/
    - src/
    - test/
    - ormconfig.json <-- CAUTION: Place in server''s root directory
    - package.json
    - package-lock.json
    ...
```

<br>

For MySQL, just modify the type to `mysql` and the port to `3306` or the like for another driver of choice.

<br>

```json
{
  "type": "postgres",
  "host": "localhost",
  "port": 5432,
  "username": "postgres",
  "password": "password",
  "database": "nestjs-jwt-auth",
  "entities": ["dist/**/*.entity{.ts,.js}"],
  "synchronize": true
}
```

<br>

In the previous snippet, the `entities` field refers to the models that reference the tables in the database. In those files we define our data types and models, including the relationships between them. If `true`, `synchronize` will ensure that these entities and the database and up-to-date with each other everytime the application is run.

<br>

From here we need to import the module in our `app.module.ts`.

<br>

```typescript
import { Module } from ''@nestjs/common'';
import { TypeOrmModule } from ''@nestjs/typeorm'';

import { AppController } from ''./app.controller'';
import { AppService } from ''./app.service'';

@Module({
    imports: [TypeOrmModule.forRoot()],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule { }
```

<br>

Check to make sure that TypeORM is being initialized when the server starts up. When all is well, let''s get started at making a user entity.

<br><br>

## Authentication

<br>

I like to setup a central directory named `core` for holding this kind of stuff that''s essential and used throughout applications.

<br>

```
...
- src/
    - core/
        - auth/
            - entities/
                - user.entity.ts <-- NOTE: Our data model for authentication credentials
            - auth.module.ts <-- NOTE: Our authentication module with all its config
    - app.controller.spec.ts
    - app.controller.ts
    - app.service.ts
    - main.ts
...
```

<br><br>

### Entities

<br>

#### User

<br>

It is most likely that our user will have some form of credentials - either a user name or email, perhaps both, alongside a password. We want to tell TypeORM to create a table in our database that contains that information and some more constraints as well. Let''s get a basic version of the `user.entity.ts` file going first.

<br>

```typescript
import { Column, Entity, PrimaryGeneratedColumn } from ''typeorm'';

@Entity(''user'')
export class User {
    @PrimaryGeneratedColumn()
    public id?: number;

    @Column()
    public username: string;

    @Column()
    public email: string;

    @Column()
    public password: string;
}
```

<br>

Now let''s add in some more configurations for typing, constraints, and also creating a user. In the decorators we can specify options for our data as well.

<br>

```typescript
import { Column, Entity, PrimaryGeneratedColumn } from ''typeorm'';

@Entity(''user'')
export class User {
    @PrimaryGeneratedColumn()
    public id?: number;

    // Add varchar(50) NOT NULL UNIQUE for usernames
    @Column({ type: ''varchar'', length: 50, nullable: false, unique: true })
    public username: string;

    // Add text NOT NULL UNIQUE for emails
    @Column({ type: ''text'', nullable: false, unique: true })
    public email: string;

    // Add varchar(255) NOT NULL for passwords
    @Column({ type: ''varchar'', length: 255, nullable: false })
    public password: string;

    // Partial class construction via an object is useful for manipulating data
    constructor(partial: Partial<User>) {
        Object.assign(this, partial);
    }
}
```

<br><br>

#### Serialization / Deserialization

<br>

It would be a massive security risk if we exposed user passwords by passing them around especially when returning the data back to the client as an HTTP response. By using the npm package `class-transformer`, we can serialize data according to constraints we setup programmatically. This is useful in situations where it might be important to obscure or remove data entirely from an object, such as a password.

<br>

First install it via npm. Once it is downloaded and installed, we can import it into the entity file and add it to the password column.

<br>

```
$ npm install class-transformer --save
```

<br>

```typescript
import { Exclude } from ''class-transformer'';

...
export class User {
    ...

    @Column({ type: ''varchar'', length: 255, nullable: false })
    @Exclude() // Exclude the password from being serialized in responses
    public password: string;

    ...
}
```

<br><br>

### Module

<br>

We need to tie the entity together with TypeORM in our `auth.module.ts` so that it generates the table in the database for us to start utilizing. This happens in the module''s decorator much like those of Angular - we declare TypeORM in the imports array using the `User` type we just created.

<br>

```typescript
import { Module } from ''@nestjs/common'';
import { TypeOrmModule } from ''@nestjs/typeorm'';

import { User } from ''./entities/user.entity'';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    exports: [],
    controllers: [],
    providers: []
})
export class AuthModule { }
```

<br>

It''s important that we also import the `AuthModule` in the root `AppModule` so that it is added in compilation.

<br>

```typescript
import { Module } from ''@nestjs/common'';
import { TypeOrmModule } from ''@nestjs/typeorm'';

import { AppController } from ''./app.controller'';
import { AppService } from ''./app.service'';
import { AuthModule } from ''./core/auth/auth.module'';

@Module({
    imports: [
        TypeOrmModule.forRoot(),
        AuthModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule { }
```

<br>

Spin up the server with `npm run start:dev` and check that the newly created entity has a corresponding database table.

<br>

<div class="post__image-container">
    <img class="post__image" alt="User table in database via Datagrip" src="assets/images/blog/01-datagrip-user-table.png">
</div>

<br><br>

# Register

<br>

## Controller

<br>

While we are here, let''s create our authentication controller inside of a controllers folder and add it to `app.module.ts`.

<br>

```
...
- src/
    - core/
        - auth/
            - controllers/
            - entities/
                - user.entity.ts
            - auth.module.ts
...
```

<br>

The controller can be written manually or generated with the well-developed NestJS cli.

<br>

```
$ cd ./src/core/auth/controllers
$ nest generate controller auth
OR
$ nest g c auth
```

<br>

This will generate a controller file where we define our controller endpoints with decorators in the class''s body. As we don''t have any users yet, let''s create (or stub out) some functionality for registering new users. In the following code I have declared an endpoint with the decorator, `@Post(''register'')`, further specifying that it will return a 201 Created status, and to lastly utilize the class serialization interceptor that will remove the user entity''s password field that we "excluded" earlier.

<br>

```typescript
import { ClassSerializerInterceptor, Controller, HttpCode, Post, Req, UseInterceptors } from ''@nestjs/common'';

import { Request } from ''express'';

import { User } from ''@api/core/auth/entities/user.entity'';

@Controller(''auth'')
export class AuthController {
    constructor() { }

    @Post(''register'')
    @HttpCode(201)
    @UseInterceptors(ClassSerializerInterceptor)
    registerUser(@Req() request: Request): Promise<User> {
        return new User(request.body);
    }
}
```

<br>

Just to clear some things up that may be confusing for those that don''t know. In the imports of the above snippet, I''ve added a custom path to my `tsconfig.json` `compilerOptions` object to give more readable import paths.

<br>

```json
{
    "compilerOptions": {
        ...
        "paths": {
            "@api/*": ["src/*"]
        },
        ...
    }
}
```

<br>

We also have to add it to our `auth.module.ts` controllers init so that NestJS knows to create and map routes to those endpoints.

<br>

```typescript
import { Module } from ''@nestjs/common'';
import { TypeOrmModule } from ''@nestjs/typeorm'';

import { AuthController } from ''./controllers/auth/auth.controller'';
import { User } from ''./entities/user.entity'';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    exports: [],
    controllers: [AuthController],
    providers: []
})
export class AuthModule { }
```

<br>

Now when running the server we should see the the new route for `/auth/register` is mapped by NestJS and ready to go. Let''s open up Postman and see what happens when a request is made to the endpoint (as per the code above, a blank User object will be returned with a 201 status).

<br>

<div class="post__image-container">
    <img class="post__image" alt="Sending register request via Postman" src="assets/images/blog/01-postman-register-no-db.png">
</div>

<br><br>

## Service

<br>

The next important step is creating another layer within our architecture that will handle the business logic needs for our application. For authentication we want to create a user and save it to the database whenever a client sends a request with data failing to fit the constraints set earlier in the user entity.

<br>

Let''s generate another file with the NestJS cli - this time it will be a service.

<br>

```
$ cd ./src/core/auth/services
$ nest generate service auth
OR
$ nest g s auth
```

<br>

```typescript
import { Injectable } from ''@nestjs/common'';

@Injectable()
export class AuthService {
    constructor() { }
}
```

<br>

By default this creates a file containing an `@Injectable()` decorator. This means that this class is able to be instantiate via NestJS''s dependency injection into controllers and other places where it is declared. To demonstrate, I will add it the constructor of my `auth.controller.ts` file and integrate into the controller''s register method, but first let''s define service functionality for registering a user:

<br>

This file needs to be brought into the authentication module file so that controllers and other services can use it via dependency injection. I have added it to exports as well so that when other modules import this one, they are able to use these services.

<br>

```typescript
import { Module } from ''@nestjs/common'';
import { TypeOrmModule } from ''@nestjs/typeorm'';

import { AuthController } from ''./controllers/auth/auth.controller'';
import { AuthService } from ''./services/auth/auth.service'';
import { User } from ''./entities/user.entity'';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    exports: [AuthService],
    controllers: [AuthController],
    providers: [AuthService]
})
export class AuthModule { }
```

<br>

We need to define a constructor for the service class that injects the repositories needed, which is just the `User` repository in this case. While we''re at it, let''s define a method, `registerUser(userData: User)`, that takes in data to create and save a new user to the database.

<br>

```typescript
import { Injectable } from ''@nestjs/common'';
import { InjectRepository } from ''@nestjs/typeorm'';

import { Repository } from ''typeorm'';

import { User } from ''@api/core/auth/entities/user.entity'';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) { }

    public async registerUser(userData: User): Promise<User> {
        return new User({ });
    }
}
```

<br>

We''re missing one important step, and that is password hash generator for encrypting passwords as they are stored in the database. This is massively important for having a secure way for users to log into your application.

<br>

We are going to use the npm package called `bcrypt`, which is a native C++ module that tends to outperform its pure JavaScript counterpart, bcrypt-js. We needed it within our `AuthService` class to help with creating a user and comparing credentials. Install the npm package with the following command.

<br>

```
$ npm install @types/bcrypt bcrypt --save
```

<br>

Once the install is finished, it can be imported into `auth.service.ts` and used to created a hashed password for us to use in creating a new user. When calling the actual hash method, we need to supply it with the password and a number pertaining to the number of [salt rounds](https://en.wikipedia.org/wiki/Salt_(cryptography)) used to hash the password. This number is a cost factor that is indicative of the amount of time needed to generate or calculate a hash (higher salt rounds equals harder difficulty). Using 10 results in a decently hard encryption calculate therefore crack.

<br>

```typescript
...
import * as bcrypt from ''bcrypt'';

@Injectable()
export class AuthService {
    ...

    public async registerUser(userData: User): Promise<User> {
        const passwordHash = await bcrypt.hash(userData.password, 10);

        const user: User = this.userRepository.create({ ...userData, password: hashedPassword });

        return await this.userRepository.save(user);
    }
}
```

<br>

This approach works, but it doesn''t have any error handling at all. The call to `create(user)` is a `Promise` that will throw an `HttpException` error if the PostgreSQL query fails. We need to check that a user with an already existing email or username, which we do by comparing the error''s code against 23505 which is PostgreSQL''s unique constraint.

<br><br>

## Error Handling

<br>

I like to create errors with a more business-domain related implementation. Before changing the method in the authentication service, let''s create an exception file that holds HTTP exceptions relevant to authentication.

<br>

```
- ../
    - auth
        - exceptions
            - auth.exception.ts <-- NOTE: Contains all exceptions for authentication
```

<br>

That file will have multiple classes that extend different `HttpException` types with extra messages pertaining specifically to the request made. They don''t need to be officially added anywhere in the `auth.module.ts` file, and can be used anywhere where they are imported.

<br>

```typescript
import { BadRequestException } from ''@nestjs/common'';

export class UserAlreadyExistsException extends BadRequestException {
    constructor() {
        super(''User already exists.'');
    }
}
```

<br>

```typescript
...
import { UserAlreadyExistsException } from ''@api/core/auth/exceptions/auth.exception'';

public async registerUser(userData: User): Promise<User> {
    const passwordHash = await bcrypt.hash(userData.password, 10);

    const user: User = this.userRepository.create({ ...userData, password: hashedPassword });

    return await this.userRepository.save(user)
        .catch((error) => {
            if(error.code === ''23505'') {
                throw new UserAlreadyExistsException();
            } else {
                throw new InternalServerErrorException();
            }
        });
}
```

<br>

We need to adjust the method in our controller to return the result of the newly defined `registerUser()` method in the `AuthService`.

<br>

```typescript
...
import { AuthService } from ''@api/core/auth/services/auth/auth.service'';

@Controller(''auth'')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) { }

    @Post(''register'')
    @HttpCode(201)
    @UseInterceptors(ClassSerializerInterceptor)
    async registerUser(@Req() request: Request): Promise<User> {
            return await this.authService.registerAdmin(request.body);
        }
    }
```

<br>

Now let''s test what happens when we make two requests to this endpoint. The reason I say two is because `POST` requests are not idempotent, which is to say that they always result in a state change on the server side. Luckily our data constraints protect us against resources being created in the database, and we just throw a custom `HttpException` saying that the user is not found.

<br>

<div class="post__image-container">
    <img class="post__image" alt="Sending register request with db connection via Postman" src="assets/images/blog/01-postman-register.png">
</div>

<br>

When we try to make a request with the same credentials, our custom error will be thrown to us for us to consume potentially on a frontend somewhere or something.

<br>

<div class="post__image-container">
    <img class="post__image" alt="Sending register request with error thrown" src="assets/images/blog/01-postman-register-error.png">
</div>

<br><br>

# Login

<br>

We need to add an endpoint for logging users in now that we have a means of inputting data into the database. This can be done by simply adding another function with decorators specifying the end and HTTP status codes, except we need to add some more authentication functionality to make it actually work. Let''s think about what we need.

<br>

__We need__:
<br>
- A controller route that has a defined login endpoint and has exception handling
<br>
- An authentication method in our service that takes the login data and returns the database record if the passwords match
<br>
- A method to generate cookies via JWT tokens (token payload, environment variable reading)
<br>
- a JWT strategy file that validates cookies from request headers for us

<br>

Let''s add the controller route for logging in that first authenticates the admin if the credentials were right, otherwise it throws a wrong credentials exception I will start with the new exception for `auth.exception.ts`.

<br>

```typescript
export class WrongUserCredentialsWereProvidedException extends BadRequestException {
    constructor() {
        super(''The wrong user credentials were provided.'');
    }
}
```

<br><br>

## Controller

<br>

Following this, let''s create a login endpoint in the controller that calls a not-yet-made function in our service called `authenticateUser()` that takes in user data.

<br>

```typescript
...
import { WrongUserCredentialsWereProvidedException } from ''@api/core/auth/exceptions/auth.exception'';

@Controller(''auth'')
export class AuthController {
    @Post(''login'')
    @HttpCode(200)
    @UseInterceptors(ClassSerializerInterceptor)
    async login(@Req() request: Request): Promise<User> {
        const user = await this.authService.authenticateUser(request.body);
        if(!user) throw new WrongUserCredentialsWereProvidedException();

        return user;
    }
}
```

<br><br>

## Service

<br>

We need to define that method that we are controller from the controller that we are declaring exists. In this method we need to find the user from the database because it has the hashed password and we compare it with the passowrd given by request.

<br>

```typescript
public async authenticateUser(userData: User): Promise<User> {
    const user: User = await this.userRepository.findOne({ username: userData.username });

    if(user && await bcrypt.compare(userData.password, user.password)) {
        return user;
    } else {
        return;
    }
}
```

<br>

At this point we can test to see if we get a user object back with our login request. It''s evident that sending the wrong credentials will result in a 400 status while the correct credentials will see a 200 response.

<br>

<div class="post__image-container">
    <img class="post__image" alt="Sending login request with wrong credentials" src="assets/images/blog/01-postman-login-error.png">
</div>

<br>

Our work isn''t over as we still need to add the code for handling the generation of the JWT cookie. We need to create some things, namely the token payload, JWT authentication guard, and the JWT strategy for this to work. Let''s start by creating the `token-payload.interface.ts` file.

<br><br>

## Token

<br>

The token payload makes up the second part of the JWT cookie and holds compact information typically regarding the user.

<br>

```typescript
export interface TokenPayload {
    id: number;
    username: string;
    email: string;
}
```

<br><br>

## Environment Variables

<br>

We have to setup support for environment variables so we can set things like the secret and expiratory time for our JWTs. To do this we need install the config module from NestJS and configure it with Joi from hapi.

<br>

```
$ npm install @nestjs/config @hapi/joi --save
```

<br>

From there we need to add configuration in our `app.module.ts` that declares the environment variables that we need to have in order to use our app.

<br>

```typescript
import { ConfigModule } from ''@angular/config'';

import * as Joi from ''@hapi/joi'';

@Module({
    imports: [
        ConfigModule.forRoot({
            validationSchema: Joi.object({
                JWT_SECRET: Joi.string().required(),
                JWT_EXPIRES_IN: Joi.string().required()
            })
        }),
        TypeOrmModule.forRoot(),
        AuthModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule { }
```

<br>

When this is run we get an error thrown, which happens because haven''t actually defined our values for the key-value pair of our environment variables. We fix this by adding a .env file to our root directory.

<br>

```
- src/
- test/
- .env
...
```

<br>

The file contents will simply just be values for our variables, JWT secret and JWT expiratory time. In the code below I have the secret to something that shouldn''t ever be used in a production context, and a value of 21,600 seconds, which equates to 6 hours.

<br>

_CAUTION: It''s important that this information stay out of the public''s knowledge when using with real applications so don''t forgot to add to the repository gitigore!''_

<br>

```
JWT_SECRET=mysecret
JWT_EXPIRES_IN=21600s
```

<br><br>

## JWT Strategy

<br>

Add a directory in the authentication module for JWT and create two files, namely `jwt.strategy.ts` and `jwt-auth.guard.ts`. The strategy file informs our application the method of validating the JWT guard that we will use on the logout endpoint. First, we need to install the passport module for NestJS to use passport strategies.

<br>

```
$ npm install @nestjs/passport @nestjs/jwt @types/passport-jwt passport passport-jwt --save
```

<br>

Once those are installed, let''s setup a `user.service.ts` file for retrieving user records for the JWT strategy validation.

<br>

```
$ cd ./src/core/auth/services
$ nest generate service user
OR
$ nest g s user
```

<br>

Let''s add the repository injection for users so that we can get access to our database with this service. We will write a simple method to retrieve users via their ids.

<br>

```typescript
import { Injectable } from ''@nestjs/common'';
import { InjectRepository } from ''@nestjs/typeorm'';

import { Repository } from ''typeorm'';

import { User } from ''@api/core/auth/entities/user.entity'';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) { }

    public async getById(userId: number): Promise<User> {
        return await this.userRepository.findOne({ id: userId });
    }
}
```

<br>

Let''s not forgot to add the necessary import statements to the authentication module.

<br>

```typescript
import { Module } from ''@nestjs/common'';
import { TypeOrmModule } from ''@nestjs/typeorm'';
import { ConfigModule, ConfigService } from ''@nestjs/config'';
import { PassportModule } from ''@nestjs/passport'';
import { JwtModule } from ''@nestjs/jwt'';

import { AuthController } from ''./controllers/auth/auth.controller'';
import { AuthService } from ''./services/auth/auth.service'';
import { User } from ''./entities/user.entity'';
import { UserService } from ''./services/user/user.service'';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        ConfigModule,
        PassportModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>(''JWT_SECRET''),
                signOptions: {
                    expiresIn: configService.get<string>(''JWT_EXPIRES_IN'')
                }
            })
        })
    ],
    exports: [
        AuthService,
        UserService
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        UserService
    ]
})
export class AuthModule { }
```

<br>

From here, let''s create the `jwt.strategy.ts` file for our application. Here we tell our JWT strategy to extract the cookie named "Authentication" and to use the JWT_SECRET environment variable. We use our user service to find a user to validate the credentials with.

<br>

```typescript
import { Injectable } from ''@nestjs/common'';
import { ConfigService } from ''@nestjs/config'';
import { PassportStrategy } from ''@nestjs/passport'';

import { ExtractJwt, Strategy } from ''passport-jwt'';

import { Request } from ''express'';

import { TokenPayload } from ''../interfaces/token-payload.interface'';

import { User } from ''@api/core/auth/entities/user.entity''
import { UserService } from ''@api/core/auth/services/user/user.service'';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly configService: ConfigService,
        private readonly userService: UserService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
                return request?.cookies?.Authentication;
            }]),
            secretOrKey: configService.get(''JWT_SECRET'')
        });
    }

    async validate(payload: TokenPayload): Promise<User> {
        return this.userService.getById(payload.id);
    }
}
```

<br><br>

## JWT Cookie

<br>

Because our controller layer deals with HTTP, we want to put have it be responsible for generating the JWT cookie and setting it with the "Set-Header" HTTP header. For now let''s also make a call to a to-be-made method in the `AuthService` class that generates a cookie given user data.

<br>

```typescript
...

@Post(''login'')
@HttpCode(200)
async login(@Req() request: Request): Promise<User> {
    const user = await this.authService.authenticateUser(request.body);
    if(!user) throw new WrongUserCredentialsWereProvidedException();

    const jwtCookie = this.authService.generateCookieWithJwtToken(user);
    request.res.setHeader(''Set-Cookie'', jwtCookie);

    return user;
}
```

<br>

We need to define the `generateCookieWithJwtToken(user)` method in the service for this to compile correctly. We also cannot forget to add our configuration and JWT services to our our imports (both from NestJS).

<br>

```typescript
import { ConfigService } from ''@nestjs/config'';
import { JwtService } from ''@nestjs/jwt'';

...

public generateCookieWithJwtToken(user: User): string {
        const payload: TokenPayload = { id: user.id, username: user.username, email: user.email };
        const token = this.jwtService.sign(payload);
        const expiresIn = this.configService.get<string>(''JWT_EXPIRES_IN'');

        // CAUTION: When trying to include the ''Secure;'' option, HTTPS has to be used
        // NOTE: Cookie just disappears from client-side storage after it expires
        return `Authentication=${token}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${expiresIn}`;
    }
```

<br>

The return statement at the end of this method contains all of the cookie information for us to see in a readable format. Here we see that it is set to HttpOnly, the SameSite value is Lax, and the authentcation token is the JWT.

<br>

After setting back in the controller, we can now test it out to see if it works and sets an Authenticatin cookie as we need.

<br>

<div class="post__image-container">
    <img class="post__image" alt="JWT cookie in Postman" src="assets/images/blog/01-postman-login-cookie.png">
</div>

<br><br>

# Logout

<br>

## Controller

<br>

It''s time to add our last endpoint involving authentication, which is to logout. There is something important involving an authentication guard that we need to specify so that we make sure users that are logging out have been authenticated.

<br>

Let''s begin with adding a controller route for logging out that will simply remove the cookie and send a 200 OK. We accomplish this by telling our Request interface to clear the "Authentication" cookie in its response, effectively removing it from the HTTP communication that happens between the frontend and backend.

<br>

```typescript
@Controller(''auth'')
export class AuthController {
    ...

    @Post(''logout'')
    @HttpCode(204)
    async logout(@Req() request: Request): Promise<void> {
        request.res.clearCookie(''Authentication'');
    }
}
```

<br><br>

## JWT Authentication Guard

<br>

We are missing the mechanism that will actually allow users to successfully send requests to this endpoint, which is the JWT authentication guard. Luckily we can just create file named `jwt-auth.guard.ts` and extend a class from the passport module.

<br>

```typescript
import { Injectable } from ''@nestjs/common'';
import { AuthGuard } from ''@nestjs/passport'';

@Injectable()
export class JwtAuthGuard extends AuthGuard(''jwt'') { }
```

<br>

The way that we use this is to attach it to the logout endpoint in the auth controller. NestJS has decorators that allow us to indicate this information quite easily.

<br>

```typescript
import { Controller, HttpCode, Post, Req, Get, UseGuards, Body } from ''@nestjs/common'';

...

import { JwtAuthGuard } from ''../jwt/jwt-auth.guard'';

@Controller(''auth'')
export class AuthController {
    ...

    @Post(''logout'')
    @HttpCode(204)
    @UseGuards(JwtAuthGuard)
    async logout(@Req() request: Request): Promise<void> {
        request.res.clearCookie(''Authentication'');
    }
}
```

<br>

After spinning up the server and testing the endpoint with Postman, we can see that we cannot technically "logout" unless we are logged in prior or else we will receive a 401 Unauthorized response.

<br>

<div class="post__image-container">
    <img class="post__image" alt="401 Unauthorized response in Postman" src="assets/images/blog/01-postman-unauthorized.png">
</div>

<br>

Thank you for taking the time to read this post. I hope it was informative and help to get a basic JWT-based approach for authentication setup in your project. Please feel free to reach out, check out my [Github profile](https://github.com/maxwellmattryan) for other projects, or head back to the [blog](https://mattmaxwell.dev/blog) to read more!',
        'assets/images/projects/jlpt-scrape.png',
        '2020-09-12 17:16:23.119169');

INSERT INTO blog_topic(name, description) VALUES ('Audio Development', 'Any and all things related to audio development and audio programming.');
INSERT INTO blog_topic(name, description) VALUES ('Game Development', 'Any and all things related to game development.');
INSERT INTO blog_topic(name, description) VALUES ('Software Design', 'Any and all things related to software design.');
INSERT INTO blog_topic(name, description) VALUES ('Software Engineering', 'Any and all things related to software engineering.');

INSERT INTO blog_post_topics_blog_topic(blog_post_id, blog_topic_id) VALUES (1, 1), (1, 4);
INSERT INTO blog_post_topics_blog_topic(blog_post_id, blog_topic_id) VALUES (2, 1), (2, 2);
INSERT INTO blog_post_topics_blog_topic(blog_post_id, blog_topic_id) VALUES (3, 3), (3, 4);
INSERT INTO blog_post_topics_blog_topic(blog_post_id, blog_topic_id) VALUES (4, 3), (4, 4);