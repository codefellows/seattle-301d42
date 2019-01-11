# Lab 4: Personal Portfolio

## Resources

- [HTML5 UP templates](https://html5up.net/)

## User Acceptance Tests

### Overview

For today's lab assignment, you will work independently to create a personal portfolio. You will begin with the provided starter code and modify the contents to complete your feature tasks. Take time to review the provided code base and understand its structure before adding features.

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

### Repository Set-up

- Create a new repository on GitHub named `portfolio`.
- Pull the starter code from your upstream remote, which is the course repository.
- From the command line, copy or move the contents of the starter code folder from the course repository into the root of your portfolio repository.
- For example, if your working directory is `~/codefellows/301` and you have two repositories in this folder named `portfolio` and `<course-repository-name>`, you can select one of the following commands. 
  - Both of these commands accept two arguments: the source of the files and the destination of the files.
  - To use the move command, `mv`, to move the starter code, enter `mv <course-repository-name>/04-RWD-RegEx/lab/ portfolio`.
  - The use the copy command, `cp`, to copy the starter code, enter `cp -r <course-repository-name>/04-RWD-RegEx/lab/ portfolio`. The `-r` flag will recursively move all of the contents of the lab folder into the portfolio repository.
  - For both commands, note the trailing forward slash at the end of the source of the files. This will move the contents of the lab folder, but not the lab folder itself. Removing the trailing forward slash will move the lab folder as well as all of its contents.
- Add and commit this initial state of the code base to your master branch.
- From this point on, work on semantically-named non-master branches. Remember to add, commit, and push regularly.

### Feature #1: Refactor the CSS 

#### Why are we implementing this feature?

- As a user, I want the portfolio to have a clean UI so that it is visually appealing.

#### What are we going to implement?

Given that a user opens the application in the browser  
When the user navigates to the home page  
Then the portfolio contents should be displayed  

#### How are we implementing it?

- Refactor the `main.css` file using SMACSS principles.
  - You may decide how many files to include, but at the minimum should include  `base.css`, `layout.css`, and `modules.css`. However, think through the way you separate your CSS rules. For example, you may want several CSS files in a `modules` folder, if you feel that the code needs to be organized in that manner.

### Feature #2: Modify the contents

#### Why are we implementing this feature?

- As a user, I want to view a unique portfolio so that the skills and personality of the developer are portrayed.

#### What are we going to implement?

Given that a user opens the application in the browser  
When the user navigates to the home page  
Then the content should be unique and reflect the skills and personality of the developer  

#### How are we implementing it?

- Modify the contents of the template to make it your own. The HTML elements may remain the same if you like, but the content should be adapted to reflect your personal details and skills.
- Apply the following changes, some of which were part of your prework for this course:
  - Next to the header image, add your name and a short, 2-3 word title.
  - In the Intro section, add a personal headline. This should be the same as or similar to your headline on your LinkedIn profile.
  - In the Portfolio section, state what you are excited about in tech. Add links to projects and include placeholders for future 301 and 401 projects. If you would like, you can add links to sites such as LinkedIn and GitHub here, or social sites.
  - In the About Me section, add your personal pitch and banner photo. 
- Add you own color scheme and Google fonts.
- Change the content and images to reflect your personal preferences. If you are using online images, make sure they are licensed for free, commercial use. For example, [Unsplash](https://unsplash.com/) has a nice variety of free images. 
- Update the list of social media icons with your links using icons for your favorite social media sites from IcoMoon or Font Awesome.
- Keep in mind that this template is just a starting point. It is yours to modify to reflect your personal online presence as a software developer so have fun and be creative!

## Submission Instructions

- Complete your Feature Tasks for the day
- Create a Pull Request (PR) back to the `master` branch of your repository
- On Canvas, submit a link to your PR. Add a comment in your Canvas assignment which includes the following:
  - A question within the context of today's lab assignment
  - An observation about the lab assignment, or related 'Ah-hah!' moment
  - How long you spent working on this assignment
