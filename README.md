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
3. From GH page, go through process of adding new repo, then use https it gives and run: 5. git remote add origin https://github.com/leanneduyck/chat.git
4. git push -u origin main

To push:

1. Run: git add .
2. Run: git commit -m "Your commit message"
3. Run: git push
