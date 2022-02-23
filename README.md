# Four Yards - Yard Work Marketplace

## Summary of Project

- This website platform where talented service providers, trade specialists, entrepreneurs, and those seeking help with any project gather, on one easy to use interface to find and receive work.
- The system will allow customers to post job listings, and providers to bid on those job listings. After bidding is over a customer can select their preferred provider.
- Customers and providers will be able to review each other after each project in order to keep both the customer and provider satisfied
- A small fee will be added to each sale, fees are decided based on frequency of listings and reviews.

## Workspace Layout
The Four Yards web app will be stored in this repository.
The documentation and resources for this project will be kept in the `docs` folder. This includes use case diagrams, the project plan, database diagrams, and more as the
project progresses.
The project will kept in the folder `app`.

## Version Control Policies and Procedures

- Use GitHub Pull Requests
- Get two reviews on each Pull Request
- Commit often
- Keep branches self-contained
- Code Reviews: Learn each others&#39; coding styles (as in techniques/approaches)
- Follow the repo's [code style guide](docs/CodeStyle.md) for naming conventions and use prettier for formatting.

## Tool stack description and setup procedure

- Code formatter - Prettier - To ensure consistent code formatting
- Framework - Express
- ORM - Sequelize
- Templating Engine - Handlebars or EJS (TBD)
- Unit Test Framework - Mocha

## Build instructions

1. Install the latest release of node.js version 16
2. Clone the repository
3. Execute the following commands in the repository directory (folder should contain a file called package.json):
	1. `npm install`
	2. `npm run migrate`
	3. `npm run seed`
1. To start the server, run the following command:
	1. `npm start`
1. The server will be available at the port and address indicated by the program&#39;s console output.

## Unit testing instructions

Perform the following steps after performing the first three steps of the build instructions

1. Navigate to the repository&#39;s root directory (where the package.json file is)
2. Execute the following command: `npm test`

## System testing instructions

System-level testing is done by hand. To conduct system testing, start up an instance of the server by running `npm start` from the repository root if the server is not already running. If you haven&#39;t followed the build directions, perform the steps described in the build section before continuing. After the server is running, navigate to the address indicated in the server&#39;s console output. System testing is performed by walking through each user task/use case and ensuring proper completion of each task from beginning to end, testing all different use case scenarios.

## Other development notes, as needed

- Links to the packages we use and their docs
- Link to express docs - [https://expressjs.com/en/4x/api.html](https://expressjs.com/en/4x/api.html) (API Reference, docs can also be found linked from this page)
- Link to Sequelize ORM docs - [https://sequelize.org/v7/](https://sequelize.org/v7/)
- Link to Mocha Docs - [https://mochajs.org/#table-of-contents](https://mochajs.org/#table-of-contents)