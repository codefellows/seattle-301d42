# Lab 08: Persistence with a SQL database

## Resources

[SQL Syntax Cheatsheet](./cheatsheets/sql.md)

[PostgreSQL Shell Cheatsheet](./cheatsheets/postgres-shell.md)

[PostgreSQL Docs](https://www.postgresql.org/docs/)

[Heroku Postgres Docs](https://devcenter.heroku.com/articles/heroku-postgresql)

## Configuration

- `.env` - with your PORT and API keys. Make sure this file is in your `.gitignore` so your keys are not pushed to GitHub.
- `README.md` - with documentation regarding your lab and its current state of development. Check the "documentation" section below for more details on how that should look **AT MINIMUM**
- `.gitignore` - with standard NodeJS configurations
- `.eslintrc.json` - with Code 301 course standards for the linter
- `package.json` - with all dependencies and any associated details related to configuration
- Note that the `package-lock.json` file is automatically created when dependencies are installed and ensures that future installations of the project use the same versions of the dependencies.

```sh
lab-08-repository
   ├── .env
   ├── .eslintrc.json
   ├── .gitignore
   ├── package-lock.json
   ├── package.json
   ├── schema.sql
   └── server.js
```

## User Acceptance Tests

### Overview

For this lab assignment, you will use the latitude and longitude to request information about movies filmed in the location and Yelp review for local restaurants.

### Time Estimate

For each of the features listed below, make an estimate of the time it will take you to complete the feature, and record your start and finish times for that feature:

```
Number and name of feature: ________________________________

Estimate of time needed to complete: _____

Start time: _____

Finish time: _____

Actual time needed to complete: _____
```

Add this information to your README.

### Repository set-up

- One person from your group should create a new repository on GitHub called `lab-08-back-end`. Add your partner(s) as collaborator(s). Clone your repository.
- Follow the same code review process as lab 7.

### Heroku Deployment

- Once your app is functioning correctly on your master branch, deploy your back end to Heroku in the same manner as labs 6 and 7. Create a new Heroku instance with your new partner(s) today. Your deployed site **should not** contain any broken functionality. 
- You will also need to provision a SQL database on Heroku. See the notes, below, about using PostgreSQL with Heroku.
- As you continue to work on features, make sure to check out your master branch and pull the changes after each pull request is merged. Then, create a new branch from your master branch and continue working. You may now begin your feature tasks for lab 8.

### Feature #1: Caching data

#### Why are we implementing this feature?

- As a user, I want the application to perform quickly so that I can search for locations frequently and reliably.

#### What are we going to implement?

Given that a user enters a valid location in the input  
When the user clicks the "Explore!" button  
Then the results will be loaded from a SQL database, if previously cached  

Given that a user enters a valid location in the input  
When the user clicks the "Explore!" button  
Then the results will be requested from each individual API, if not previously cached  

Given that a user enters a valid location in the input  
When the user clicks the "Explore!" button  
Then the results will be cached in a SQL database for future retrieval  

Given that a user does not enter a valid location in the input  
When the user clicks the "Explore!" button  
Then the location information will not be displayed  

#### How are we implementing it?

Database set-up:
- Install and require the NPM PostgreSQL package `pg` in your server.js file.
- Add your connection string to your `.env` file as your `DATABASE_URL`.
  - Windows and Linux users: You should have retained the user/password from the pre-work for this course. Your OS may require that your connection string is composed of additional information including user and password. For example: `postgres://USER:PASSWORD@HOST:PORT/DBNAME`;
  - Mac users: `postgres://localhost:5432/DBNAME`;
- Pass the appropriate argument when instantiating a new Client.

Table creation:
- Create a file called `schema.sql` which contains correct SQL queries to drop all of your tables and create them, if they do not already exist. All tables should be created in the same database.
- Execute this file from the command line with the following syntax: `psql -d <database-name> -f <filename>`.
  - For example, `psql -d city_explorer -f schema.sql`

Server logic:
- Create a function to check the database for the location information.
  - If the location record already exists in the database, send the location object in the response to the client.
  - It it does not exist in the database, request the data from the API, save it in the database, and then send the location object in the response to the client.
- For all of your other models, write a single lookup function that is dynamic and can be shared by all of the models. This lookup function should accept several options:
  - The search query
  - A function to execute if the records exist in the table
  - A function to execute if the records do not exist in the table.
- Within your route callback, invoke your lookup function, passing the appropriate options.
  - If the records exist, send them as the response to the client.
  - If the records do not exist, request the data from the appropriate APIs, as you have in labs 6 and 7. Store the results in the appropriate table in your database and send the API results as the response to the client.
- Redeploy your application.

#### Postgres on Heroku

In your Heroku instance, navigate to the Resources tab. In the Add-Ons, search for "Postgres" and provision the free version.

- Replicate your local database to Heroku, using the following format for your command: `heroku pg:push city_explorer DATABASE_URL --app <your-heroku-app-name-here>`
  - _Note: Unless the local database is pushed to Heroku again, any changes to the local database will not be reflected in the production database._

- To work with the remote database on your machine, use the following format for your command. Use the same `DATABASE_URL` variable from the push command, but you
must provide the name of a new table that does not already exist to serve as the destination of the data pull. This will prevent you from overwriting your existing local data.
  - `heroku pg:pull DATABASE_URL <new-local-empty-database-name>`


## Documentation

_Your `README.md` must include:_

```md
# Project Name

**Author**: Your Name Goes Here
**Version**: 1.0.0 (increment the patch/fix version number if you make more commits past your first submission)

## Overview
<!-- Provide a high level overview of what this application is and why you are building it, beyond the fact that it's an assignment for this class. (i.e. What's your problem domain?) -->

## Getting Started
<!-- What are the steps that a user must take in order to build this app on their own machine and get it running? -->

## Architecture
<!-- Provide a detailed description of the application design. What technologies (languages, libraries, etc) you're using, and any other relevant design information. -->

## Change Log
<!-- Use this area to document the iterative changes made to your application as each feature is successfully implemented. Use time stamps. Here's an examples:

01-01-2001 4:59pm - Application now has a fully-functional express server, with a GET route for the location resource.

## Credits and Collaborations
<!-- Give credit (and a link) to other people or resources that helped you build this application. -->
-->
```

## Submission Instructions

- Complete your Feature Tasks for the day
- Create a Pull Request (PR) back to the `master` branch of your repository
- On Canvas, submit a link to your PR and a link to your deployed application on Heroku. Add a comment in your Canvas assignment which includes the following:
  - A question within the context of today's lab assignment
  - An observation about the lab assignment, or related 'Ah-hah!' moment
  - How long you spent working on this assignment
