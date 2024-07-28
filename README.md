Overview:
This is a single-page, responsive movie app built using Angular. It is the client-side for the server-side API developed earlier for MyMovies-Server. This app supports user authentication, viewing all movies, detailed views for individual movies/directors/genres, and the ability to manage user profiles. Users can also mark movies as favorites. UI is handled with Material Design (Angular Material). As per project requirements, the user scrolls through movies sideways; similar to Netflix.

Key Features:

1. Displays a welcome view where users are able to either log in or register an account.
2. Once authenticated, users should view all movies.
3. Upon clicking on a particular movie, users will be taken to a single movie view where additional movie details are displayed. The single movie view has the additional features:
   a. A button that takes the user to the director view where details about that movie's director are displayed.
   b. A button that takes the user to the genre view where details about that movie's genre are displayed.
   c. A button that takes the user to the description view where details about that movie's plotline and rating and release are displayed.
   d. A favorite icon that when activated/deactivated adds/removes movies from the user's favorites list.
4. Profile view where users can update user data or delete the account.

Website:

Data Source: This app pulls data from a MongoDB Atlas database that I created.
Server-side Website: https://my---movies-868565568c2a.herokuapp.com/
Server-side Repo: https://github.com/leanneduyck/MyMovies-Client.git

Technologies Used:

1. Angular: The core framework used for building the single-page application; the powerful features and tools help in creating a robust and maintainable codebase.
2. Angular Material: A UI component library that provides pre-built, customizable components following Google's Material Design guidelines, ensuring a consistent and visually appealing interface.
3. TypeScript: The primary programming language used in Angular development, offering static typing and advanced features for better code quality and maintainability.
4. RxJS: A library for reactive programming used extensively in Angular for managing asynchronous data streams and events.
5. Node.js & npm: Node.js provides the runtime environment for the development tools, while npm is used for managing project dependencies and scripts.
6. MyMovies-Server RESTful API: My existing custom-built server-side API developed earlier, providing endpoints for movie data, user authentication, and profile management.
7. Express: A minimal and flexible Node.js web application framework used for building the server-side API.
8. Angular CLI: A command-line interface tool that helps in initializing, developing, scaffolding, and maintaining Angular applications.

Setup Instructions:

Prepare Angular

1.  Install Angular by running: npm install -g @angular/cli
2.  Make sure Node is up to date by running: nvm install node

Create a new project

1.  Run: ng new [project-name] —no-standalone
2.  Answer 'yes' to all, select SCSS
3.  CD to project folder and run the app by running: ng serve --open

Configure Angular HttpClient

1.  Inside src/app/app.module.ts, add "import { HttpClientModule } from '@angular/common/http';" ; also add "HttpClientModule," to @NgModule import section

Create Angular Service for REST API

1.  Run: ng generate service fetch-api-data
2.  Inside src/app/fetch-api-data.service.ts, add "HttpClient, HttpHeaders, HttpErrorResponse, Observable, RxJS, and RxJS Operators" to import statements

Material Design

1. Add Angular Material by running: ng add @angular/material
   a. Custom theme, yes typography/broswer animations
   b. Inside src/app/app.modules.ts, add necessary modultes from @angular/material; also add to @NgModule import section

Create Registration Component

1. Run: ng generate component user-registration-form
   a. Link to the service and root component
2. Cont similiarly for other views.

Run app

1. ng serve

Github: To create new repo:

1. From project directory in terminal run: git init
   2.Run git commit -m "first commit"
2. Run git branch -M main
3. From GH page, go through process of adding new repo, then use https it gives and run: 5. git remote add origin https://github.com/leanneduyck/<repository-name>.git
4. git push -u origin main

To push:

1. Run: git add .
2. Run: git commit -m "Your commit message"
3. Run: git push

To deploy in GH:

1. Run: ng deploy --base-href=/<repository-name>/
2. Or use Vercel...

# MyMoviesAngular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.1.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
