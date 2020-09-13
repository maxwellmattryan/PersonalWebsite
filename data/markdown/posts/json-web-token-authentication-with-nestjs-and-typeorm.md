# The NestJS Framework and Authentication

<br>

This project's source code is visible here at its [GitHub repository](https://github.com/maxwellmattryan/nestjs-jwt-auth) if you wish to download it as a starter project and get going. If you'd like to see how I set up the the project as is in the repo the follow along with the rest of the post. 

<br><br>

## NestJS

<br>

[NestJS](https://nestjs.com/) is a wonderful backend framework that utilizes an environment that is incredibly similar to Angular. In that sense, the module system and dependency injection is similar to use programmatically.

<br><br>

## Authentication

<br>

In a literal sense, "authentication" refers to the act of proving some assertion, whether it be the identity of a person or the user of a computer system. It is not necessarily the process of identifying whatever the credentials may be but rather the process of verifying them.

<br>

With the power of authentication, we can have things like permissions and guards that serve to prevent users who are not authorized or who are forbidden towards committing certain actions or having access to particular pages. For example, it's important that guards are put in place for endpoints that deal with modifying data in any way. If there is a way to delete a resource that belongs to a user that I don't know or have the credentials of then that is a major security concern.

<br><br>

### JSON Web Token

<br>

The [JSON Web Token](https://en.wikipedia.org/wiki/JSON_Web_Token) is a protocol for encrypted signatures that contain JSON data for making certain claims to the server (or wherever else they're being sent) to help with our security concerns. The information specifically refers to things like the signature generation algorithm, types of predefined types of login names, expiration times, the raw token string itself, and more. I will explain more specifcally later when we actually generate the token for cookie storage.

<br>

A JWT is returned to a user when they successfully login with credentials after they have been verified in by the authentication process. We need them to grant authorization access to users wanting to do things that people typically might in a CRUD (Create, read, update, and delete) application. 

<br><br>

### Cookies

<br>

As far as HTTP is concerned [cookies](https://en.wikipedia.org/wiki/HTTP_cookie) are small (less than 4kb) pieces of data that are stored on the client-side while interacting with websites. They are a useful and consistent mechanism implemented by the browser for holding useful information like browsing sessions.

<br>

They are set programmatically quite easily via the class API for the `Request` object in Express. I will explain more later when it comes time to generate the cookie and attach it as an HTTP header.

<br><br>

## Setup

<br>

Begin with initializing an blank and empty NestJS project. You can use these commands to install the command-line interface and generate a new project.

<br>

```
$ npm install -g @nestjs/cli
$ nest new <app-name-here>
```

<br><br>

### Logging

<br>

Before starting the server, I like to add logging middleware before I get started mainly because enabling this make things easier for ourselves to debug in the future.

<br>

It'll be important to see our incoming HTTP requests as they are received by the server, and NestJS doesn't have logging enabled by default. There are multiple ways to handle logging of http requests, and the package I'll be using to log reqests is called morgan and is pretty commonly used logging middleware with Express, which NestJS uses under the hood by default.

<br>

Start off by installing the npm package with:

<br>

```
$ npm install morgan --save
```

<br>

After importing the `morgan` npm package and using it as a middleware for NestJS and Express, our `main.ts` file will some new changes.

<br>

```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// Import the logging middleware for console output of HTTP requests
import * as morgan from 'morgan';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // Initialize with "tiny" option - prefined formatting for string output
    app.use(morgan('tiny'));

    await app.listen(3001);
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

### TypeORM

<br>

We need to have some sort of persistent storage and way to access it in order to verify user credentials against. This means methods for creating users, logging them in, and logging them out. There are different ways to design applications that access some type of data source, but one common way is [layered architecture](https://www.oreilly.com/library/view/software-architecture-patterns/9781491971437/ch01.html).

<br>

In a layered architecture, we use classes called "repository" which serve as an access point for a database. Here we perform operations like retrieving users, creating new ones, or deleting them. With [TypeORM](https://typeorm.io/#/), the solution is quite simple, and although there is just a little boilerplate, it's really not too bad.

<br>

Run the following command to install TypeORM, but don't forget to add the specific database driver of choice beforehand.

<br>

``` 
$ npm install @nestjs/typeorm typeorm <npm-db-driver-here> --save
```

<br><br>

#### Database

<br>

We need to get a database up and running for this to really work, so just make sure that you something installed, liked [PostgreSQL](https://www.postgresql.org/download/), or [MySQL](https://www.mysql.com/downloads/). Make sure that the npm database drivers you just installed match whatever you're using here.

<br>

Remember the database name, because we will use it later in our confiuration for TypeORM.

<br><br>

#### Configuration

<br>

There are two ways we can do database configuration with TypeORM. We can write all of our configuration in the code of our `app.module.ts`, or we opt for an `ormconfig.json` file in the root directory that holds the same information. Let's try the latter of the two!

<br>

```
- nestjs-jwt-auth/
    - node_modules/
    - src/
    - test/
    - ormconfig.json <-- CAUTION: Place in server's root directory
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
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
    imports: [TypeOrmModule.forRoot()],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule { }
```

<br>

Check to make sure that TypeORM is being initialized when the server starts up. When all is well, let's get started at making a user entity.

<br><br>

### Authentication Module

<br>

I like to setup a central directory named `core` for holding this kind of stuff that's essential and used throughout applications.

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

#### User Entity

<br>

It is most likely that our user will have some form of credentials - either a user name or email, perhaps both, alongside a password. We want to tell TypeORM to create a table in our database that contains that information and some more constraints as well. Let's get a basic version of the `user.entity.ts` file going first.

<br>

```typescript
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
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

Now let's add in some more configurations for typing, constraints, and also creating a user. In the decorators we can specify options for our data as well.

<br>

```typescript
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class User {
    @PrimaryGeneratedColumn()
    public id?: number;
    
    // Add varchar(50) NOT NULL UNIQUE for usernames
    @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
    public username: string;
    
    // Add text NOT NULL UNIQUE for emails
    @Column({ type: 'text', nullable: false, unique: true })
    public email: string;
    
    // Add varchar(255) NOT NULL for passwords
    @Column({ type: 'varchar', length: 255, nullable: false })
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
import { Exclude } from 'class-transformer';

...
export class User {
    ...
    
    @Column({ type: 'varchar', length: 255, nullable: false })
    @Exclude() // Exclude the password from being serialized in responses
    public password: string;

    ...
}
```

<br><br>

#### Module Configuration

<br>

We need to tie the entity together with TypeORM in our `auth.module.ts` so that it generates the table in the database for us to start utilizing. This happens in the module's decorator much like those of Angular - we declare TypeORM in the imports array using the `User` type we just created.

<br>

```typescript
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './entities/user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    exports: [],
    controllers: [],
    providers: []
})
export class AuthModule { }
```

<br>

It's important that we also import the `AuthModule` in the root `AppModule` so that it is added in compilation.

<br>

```typescript
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './core/auth/auth.module';

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

#### Controller

<br>

While we are here, let's create our authentication controller inside of a controllers folder and add it to `app.module.ts`.

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

This will generate a controller file where we define our controller endpoints with decorators in the class's body. As we don't have any users yet, let's create (or stub out) some functionality for registering new users.

<br>

```typescript
import { Controller, HttpCode, Post, Req } from '@nestjs/common';

import { Request } from 'express';

import { User } from '@api/core/auth/entities/user.entity';

@Controller('auth')
export class AuthController {
    constructor() { }

    @Post('register')
    @HttpCode(201)
    registerUser(@Req() request: Request): Promise<User> {
        return new User(request.body);
    }
}
```

<br>

Just to clear some things up that may be confusing for those that don't know. In the imports of the above snippet, I've added a custom path to my `tsconfig.json` `compilerOptions` object to give more readable import paths.

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
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthController } from './controllers/auth/auth.controller';
import { User } from './entities/user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    exports: [],
    controllers: [AuthController],
    providers: []
})
export class AuthModule { }
```

<br>

Now when running the server we should see the the new route for `/auth/register` is mapped by NestJS and ready to go. Let's open up Postman and see what happens when a request is made to the endpoint (as per the code above, a blank User object will be returned with a 201 status).

<br>

<div class="post__image-container">
    <img class="post__image" alt="Sending register request via Postman" src="assets/images/blog/01-postman-register-without-db.png">
</div>

<br><br>

#### Service

<br>

The next important step is creating another layer within our architecture that will handle the business logic needs for our application. For authentication we want to create a user and save it to the database whenever a client sends a request with data falling within the constraints set earlier in the entities.

<br>

Let's generate another file with the NestJS cli - this time it will be a service.

<br>

```
$ cd ./src/core/auth/services
$ nest generate service auth
OR
$ nest g s auth
``` 

<br>

```typescript
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
    constructor() { }
}
```

<br>

By default this creates a file containing an `@Injectable()` decorator. This means that this class is able to be instantiate via NestJS's dependency injection into controllers and other places where it is declared. To demonstrate, I will add it the constructor of my `auth.controller.ts` file and integrate into the controller's register method, but first let's define service functionality for registering a user:

<br>

We need to define a constructor for the service class that injects the repositories needed, which is just the `User` repository in this case. While we're at it, let's define a method, `registerUser(userData: User)`, that takes in data to create and save a new user to the database.

<br>

```typescript
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { User } from '@api/core/auth/entities/user.entity';

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

We're missing one important step, and that is password hash generator for encrypting passwords as they are stored in the database. This is massively important for having a secure way for users to log into your application. 

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
import * as bcrypt from 'bcrypt';

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

This approach works, but it doesn't have any error handling at all. The call to `create(user)` is a `Promise` that will throw an `HttpException` error if the PostgreSQL query fails. We need to check that a user with an already existing email or username, which we do by comparing the error's code against 23505 which is PostgreSQL's unique constraint.

<br>

I like to create errors with a more business-domain related implementation. Before changing the method in the authentication service, let's create an exception file that holds HTTP exceptions relevant to authentication.

<br>

``` 
- ../
    - auth
        - exceptions
            - auth.exception.ts <-- NOTE: Contains all exceptions for authentication
```

<br>

That file will have multiple classes that extend different `HttpException` types with extra messages pertaining specifically to the request made. They don't need to be officially added anywhere in the `auth.module.ts` file, and can be used anywhere where they are imported.

<br>

```typescript
import { BadRequestException } from '@nestjs/common';

export class UserAlreadyExistsException extends BadRequestException {
    constructor() {
        super('User already exists.');
    }
}
```

<br>

```typescript
...
import { UserAlreadyExistsException } from '@api/core/auth/exceptions/auth.exception';

public async registerUser(userData: User): Promise<User> {
    const passwordHash = await bcrypt.hash(userData.password, 10);

    const user: User = this.userRepository.create({ ...userData, password: hashedPassword });
    
    return await this.userRepository.save(user)
        .catch((error) => {
            if(error.code === '23505') {
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
import { AuthService } from '@api/core/auth/services/auth/auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) { }

    @Post('register')
    @HttpCode(201)
    async registerUser(@Req() request: Request): Promise<User> {
            return await this.authService.registerAdmin(request.body);
        }   
    }
```

<br>

Now let's test what happens when we make two requests to this endpoint. The reason I say two is because `POST` requests are not idempotent, which is to say that they always result in a state change on the server side. Luckily our data constraints protect us against resources being created in the database, and we just throw a custom `HttpException` saying that the user is not found.

<br>

<div class="post__image-container">
    <img class="post__image" alt="Sending register request with db connection via Postman" src="assets/images/blog/01-postman-register-with-db.png">
</div>

<br>

As we can so though, when we try to make a request with the same credentials, our custom error will be thrown to us for us to consume potentially on a frontend somewhere or something. 

<br>

<div class="post__image-container">
    <img class="post__image" alt="Sending register request with error thrown" src="assets/images/blog/01-postman-register-error.png">
</div>

<br><br>

### Login