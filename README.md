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

1. Prepare Angular
   a. Install Angular by running: npm install -g @angular/cli
   b. Make sure Node is up to date by running: nvm install node
2. Create a new project
   a. Run: ng new [project-name] —no-standalone
   b. Answer 'yes' to all, select SCSS
   c. CD to project folder and run the app by running: ng serve --open
3. Configure Angular HttpClient
   a. Inside src/app/app.module.ts, add "import { HttpClientModule } from '@angular/common/http';" ; also add "HttpClientModule," to @NgModule import section
4. Create Angular Service for REST API
   a. Run: ng generate service fetch-api-data
   b. Inside src/app/fetch-api-data.service.ts, add "HttpClient, HttpHeaders, HttpErrorResponse, Observable, RxJS, and RxJS Operators" to import statements

Github: To create new repo:
From project directory in terminal run: git init
Run git commit -m "first commit"
Run git branch -M main
From GH page, go through process of adding new repo, then use https it gives and run: git remote add origin https://github.com/leanneduyck/chat.git
git push -u origin main

To push:
Run: git add .
Run: git commit -m "Your commit message"
Run: git push
