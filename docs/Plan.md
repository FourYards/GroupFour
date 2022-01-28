# Plan
## Summary of Project

- This website platform where talented service providers, trade specialists, entrepreneurs, and those seeking help with any project gather, on one easy to use interface to find and receive work.
- The system will allow customers to post job listings, and providers to bid on those job listings. After bidding is over a customer can select their preferred provider.
- Customers and providers will be able to review each other after each project in order to keep both the customer and provider satisfied
- A small fee will be added to each sale, fees are decided based on frequency of listings and reviews.

## Team Organization

- Project Manager
  - Kyler Nelson
- Designers and Developers
  - Wesley Perrett - Main UX/UI Designer
  - Keaton Anderson - Developer
  - Richard Snider - Developer

## Development Process Description

- GitHub Git Flow
- At least 2 reviews on each PR, will do sprint-level reviews of master
- Master branch and Feature Branches
- Each new feature create a branch
- Create many small commits
- Create pull request
- Merge to master
## Policies, Procedures, Comms Tools

- Discord - Main channel for communication. Used for group communication, collaborative activities, and sharing small files.
- Google Drive - Storage for files needed that are not directly part of the project documentation. Files outlining Milestone 1.
- GitHub - Code and (long-term) documentation hosting.
- Trello - Use for collaboration on project as well as tracking time estimates

## Risk Analysis
- **Database Structure**
  - Likelihood - Low
  - Severity - High
  - Consequences - Heavy amount of technical debt, difficulty in future extensibility of application, poor application design
  - Workaround - None. Just do it right the first time so we don&#39;t have to redo the database schema.
- **Login/Authentication**
  - Likelihood - Low
  - Severity - High
  - Consequences - Improper user authentication could lead to many users being able to perform privileged actions. User experience would suffer if users were unable to login or perform actions they expect to perform.
  - Work-Around - None. System will not work properly without a good Login/Authentication.
- **UI**
  - Likelihood - Low
  - Severity - High
  - Consequences - Users would be unable to interact with the application.
  - Work-Around - None. System requires a way for user interaction.
- **Hosting**
  - Likelihood - Low
  - Severity - High
  - Consequences - System would be unable to serve files and information to users
  - Work-Around - Host server using cloud hosting systems.
