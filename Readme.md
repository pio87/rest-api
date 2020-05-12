## Sample HTTP REST API on HapiJS

HTTP Server application with 3 sample endpoints.

Technologies / libs used:
- TypeScript
- NodeJS
- HapiJS
- JWT Auth
- Mocha
- Winston

### Requirements

Node installed (tested and developed on v12.16.1).

### Running in development mode

1. First of all - copy `.env.example` file and rename it to `.env`, put it on base level of the project.
2. Install project dependencies `npm instal`
3. Run `npm start`

Application should be operational, everything is in app logs.

### Running tests

2. Install project dependencies if you didn't done that before `npm instal`
3. Run `npm test`

### TODOs

- docker
- git hooks for pre-commit
- CI/CD