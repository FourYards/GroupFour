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
The project itself is made up of all other files in the repository.

Individual folders may contain a readme explaining their use. In general, the bulk of the application code resides in either `client` or `server`, holding code that is relevant to the frontend and backend respectively. Additional top-level folders exist as needed. Top-level files are almost exclusively configuration files, excluding app.js, which defines the middleware and routing stack entrypoints for the application. The `bin` folder contains the executable entrypoint for the server. This is executed by npm scripts.

## Version Control Policies and Procedures

- Use GitHub Pull Requests
- Get two reviews on each Pull Request
- Commit often
- Keep branches self-contained
- Code Reviews: Learn each others&#39; coding styles (as in techniques/approaches)
- Follow the repo's [code style guide](docs/CodeStyle.md) for naming conventions and use prettier for formatting.

## Tool stack description and setup procedure

- Code formatter - Prettier - To ensure consistent code formatting
- Framework - Express + Vue
- ORM - Sequelize
- Templating Engine - Handlebars
- Unit Test Framework - Jest

## Running the application

Since this application needs to communicate with a sqlite dependency, several additional dependencies other than node.js
will be needed to run and build the application dependencies.

1. Install the latest release of node.js version 16
   - On Windows, you may want to customize the installation to enable features to build native node addons/node-gyp/python/build tools.
   - On Linux, it is recommended to use a node version manager such as [nvm](https://github.com/nvm-sh/nvm) or [others](https://nodejs.org/en/download/package-manager/) to install node. if you are installing via a distro package manager, ensure that you install npm `8.3.0` or greater if npm is not included in the node package. Some distros may only ship older versions of node, in which case, you should install using a version manager.
2. Install one of the following python versions: 3.7, 3.8, 3.9, or 3.10
   - On Windows, if you used the windows installer from the nodejs.org website to install node, this may have been installed automatically, or given the option to install if it wasn't installed on your system already. You may manually install python if you would prefer or try this if you are having errors during the steps below.
3. Ensure you have a proper C++ compiler toolchain setup on your machine
   - On Windows, if you used the installer from nodejs.org to install node, the C++ toolchain may have been installed automatically, or have given the option to install, if it was not already installed. If you prefer manual install or are having issues in later steps, Install one of the following:
     - Latest version of Visual Studio Community (using the desktop development with C++ workload)
     - [Visual Studio Build Tools (Direct download link)](https://download.visualstudio.microsoft.com/download/pr/4dfffe3f-2a7e-4dea-922b-62d4beca5e36/e10c2bfb0e7b0358c24bd0df951f3d81897f309a0642a199b93f248db303263c/vs_BuildTools.exe)
     - If you still receive errors about visual studio after installing one of the above two options when following later steps, try the following:
     - Check your npm version with `npm --version`. Ensure it reports `8.3.0` or greater. If not, you can update npm using one of the following options:
       - Install node version `16.14.0` or greater. (Check currently installed node verison with `node --version`)
       - [Manually upgrade the npm version](https://docs.npmjs.com/try-the-latest-stable-version-of-npm#upgrading-on-windows) for your current node version.
     - If your npm version is up to date, Run `npm config set msvs_version 2017`. You can also try replacing 2017 with the year of the version of visual studio/build tools installed.
     - Still stuck? Use the visual studio build tools direct download link above if you haven't. You may also need to run `npm config set msvs_version 2017` if you haven't already (or used a year other than 2017) and are still receiving errors.
   - Linux/UNIX requires `make` to be installed as well as a C++ compiler toolchain.
   - macOS requires the XCode Command Line Tools to be installed. This will install the C++ toolchain.
4. Clone the repository
5. Execute the following commands in the repository directory (folder should contain a file called package.json):
   1. `npm install`
   2. `npm run migrate`
   3. `npm run seed`
6. To start the server normally, run the following command:
   - `npm start`
     - If you are running the app for development, run `npm run dev` instead of `npm start` to enable auto-reload of the server when changes are detected.
7. The server will be available at the port indicated by the program&#39;s console output.
8. Launch your preferred browser and navigate to the address of the machine running the application, providing the port specified in the console output of the server. This is typically `localhost:3000`.

## Testing Instructions

Perform the following steps after performing the first five steps of the app's run instructions

1. Navigate to the repository&#39;s root directory (where the package.json file is)
2. Execute the following command: `npm test`
3. Test results will be printed to the console.

## System testing instructions

System-level testing is done by hand. To conduct system testing, start up an instance of the server by running `npm start` from the repository root if the server is not already running. If you haven&#39;t followed the initial setup/running steps, perform those steps before continuing. After the server is running, navigate to localhost:port as indicated in the server&#39;s console output. System testing is performed by walking through each user task/use case and ensuring proper completion of each task from beginning to end, testing all different use case scenarios.

## Development Notes

This project includes recommended settings and extensions for vscode, in addition to a series of npm scripts to perform the same tasks as the provided extensions. If you are not using vscode, you may want to install an extension/plugin for your favorite editor that supports automatic/enhanced script running or provides one of the following features: Vue syntax highlighting and/or autocomplete, code formatting support using prettier, and linting support using eslint.

### VsCode Recommended Extensions

Upon opening the project for the first time, you will receive a notification about recommended extensions. Click the notification to view and install these extensions. You may also open the extensions pane and look in the recommended section.

### VsCode Recommended Settings

There is a file called `settings-recommended.json` in the `.vscode` directory. If you have a `.vscode/settings.json` file already, copy the contents of this file to it. If not, copy `.vscode/settings-recommended.json` to `.vscode/settings` for an optimal dev experience.

### Development Scripts

The following npm scripts are part of this repository. Several of these are executed when comitting to git, so if you receive an error when commiting, examine the command output from git or manually run any scritps executed by git to view the errors.

All of the below scripts can be run with the following command:

```
npm run <script name>
```

- `test:client` - Execute only unit tests for the client side code.
- `test:client:watch` - Execute unit tests only for client, but continue running and automatically re-run when test is edited.
- `test:server` - Execute unit tests only for the server.
- `debug` - Same as `npm run dev`, but launches node.js with the debugger enabled. If you are using the recommended VsCode settings, VsCode's debugger should auto-attach.
- `debug:nowatch` - Same as `debug`, but it will not automatically reload the server when changes are detected.
- `repl` - Opens a node.js repl while also adding a few additional commands for use with this project in addition to exposing components of the application into the repl, such as DB models. Execute `.help` in the repl created by this script for more info.
- `lint` - **Executed by Git** - Checks the code for various errors or code quality violations. Fixes any issues that can be fixed automatically
- `formatcheck` - Checks if any files need to be formatted to match the prettier configuration of this project.
- `format` - **Executed by Git** - Reformats files in the repository to match the prettier configuration.

## References

- Link to express docs - [https://expressjs.com/en/4x/api.html](https://expressjs.com/en/4x/api.html) (API Reference, docs can also be found linked from this page)
- Link to Vue docs - [https://v2.vuejs.org/](https://v2.vuejs.org/)
- Link to Sequelize ORM docs - [https://sequelize.org/v7/](https://sequelize.org/v7/)
- Link to Jest Docs - [https://jestjs.io/](https://jestjs.io/)
- Link to Vitest Docs - [https://vitest.dev/](https://vitest.dev/)
