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

The development will be broken up into five phases. Each phase will be a little
like a Sprint in an Agile method and a little like an iteration in a Spiral
process. Specifically, each phase will be like a Sprint, in that work to be
done will be organized into small tasks, placed into a “backlog”, and
prioritized. Then, using on time-box scheduling, the team will decide which
tasks the phase (Sprint) will address. The team will use a Scrum Board to keep
track of tasks in the backlog, those that will be part of the current Sprint,
those in progress, and those that are done.

Each phase will also be a little like an iteration in a Spiral process, in that
each phase will include some risk analysis and that any development activity
(requirements capture, analysis, design, implementation, etc.) can be done
during any phase. Early phases will focus on understanding (requirements
capture and analysis) and subsequent phases will focus on design and
implementation. Each phase will include a retrospective.

1. Phase 1 - Requirements Capture
2. Phase 2 - Analysis, Architectural, UI, and DB Design
3. Phase 3 - Implementation, and Unit Testing
4. Phase 4 - More Implementation and Testing

We will use Unified Modeling Language (UML) to document user goals, structural
concepts, component interactions, and behaviors.

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
