# Class 5: Deployment Workshop 

## Overview

Today we will cover code deployments.

Following lecture, we will deploy our portfolio app, workshop style. Each student will follow along, deploying the personal portfolio built in lab 4 to a cloud web hosting platform called Heroku.

## Daily Plan

- Warm-up exercise
- Review code challenges
- Introduction of today's code challenge topic
- Depoyment Overview and Demo
- Deployment Workshop
- Lab Preview

## Learning Objectives

As a result of completing lecture 5 of Code 301, students will:
- Understand the difference between deploying static and dynamic web applications
- Understand deployment processes over multiple environments
- Be able to deploy dynamic web applications to Heroku

## Node.js
* A real JavaScript environment!
* npm -- node application/package manager and bundler

## Building a web server with Node and Express.js
* Handling multiple requests from clients
* Sending data back in multiple formats

## Deployments
* Historically: FTP and direct server access, uploading changes immediately and directly
  * In many smaller shops, this is still the way!
* Deployment: Moving code from development into a production environment
* With source control tools (`git`, direct integrations, and pipleine scripting `bamboo`) we can more safely control what goes out, where it goes, and when it happens.
* Environments: Most companies have multiple environments where code can be deployed to.  Code changes less frequently and the stability of the codebase is less volatile as you get closer to production.
  * Local: Developer Workstations/Laptops
  * Dev: Shared environment where developers release code frequently for integration testing
  * Stage: Pre-Production environment that generally exists for Product/Business to do feature analysis and review
  * UAT: User Acceptance Testing environment is typically where the client and end users get a final look at the state of the app before it goes live.
  * A/B/C: Hot-Swappable production environments where the code is actually "Live"
    * C (passive): The most recent "good" release
    * B (standby): The current release, but not active
    * A (active): The current release, live to the world


#### Heroku Deployment Reference:

- `git remote -v`  (verify your git remotes)
- `heroku create [appname]`  (create the app on Heroku and set remote)
    - Or, `heroku git:remote -a [appname]` (for a previously created heroku app)
- `git remote -v` (see that heroku is now a remote)
- `git push heroku master` (deploy from master)
  - `git push heroku [branch]:master` (deploy from a non-master branch to Heroku)