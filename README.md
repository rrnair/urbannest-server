# Urban Nest Server

Urban Nest Server is a REST API Server that serves as a backend to the Web UI `urban-nest ui`. This service is a Node based REST server that exposing APIs for reading Brand details, property listing etc.

The server also has a limited write operations that are secured for a logged in user (admin) to write/update properties handled in the website.

## REST APIs

1. Ping - Hearbeat API, returns a Hello message with current date
2. Property APIs - APIs that returns one or more properties, a filter can be applied by Property Category (residential/commercial) and status (new/upcoming/completed)
3. Admin APIs - Allows to add/update/delete properties

## Configuration

There are minimal configurations for this service specified via `config/deploy-config.json` file. You may add or update the configuration key/values under the respective environments. For instance you might change port number from default port of 7009 to something else in this file.

In your developmemt environment, create a file `.env` at the root of this project (this file is configured to be ignored while you check-in the code to GitHub) and add the property `STAGE=dev`. This will make the service run in development mode.

## Development Environment

You may setup development environment by following below pre-reqs and steps to build/run the project

### PreReqs

1. Node 16.x or later
2. Any editor - VScode, Text Editor or Terminal editors

### Build/Test/Run

Run below targets in a terminal,

1. `npm run swagger` - Generates Swagger REST API docs (OpenAPI v3.0 specification)
2. `npm run dev` - Starts the project in watch mode. Any changes in the code makes the server to reload
3. `npm run build` - Builds the project
4. `npm run test` - Runs test cases and produced a report
5. `npm run coverage` - Runs code coverage
6. `npm run copyright` - Checks whether the code files has copyright header else this will add the copyright header for source code files that are added to Git
7. `npm run upgrade` - Upgrades NPM dependencies to its latest version

It is recommended to run the `npm run swagger` produce the latest Swagger API documentation. Once the project is run in `dev` mode/stage these APIs can be read via browser using `http://<hostname>:<port>/docs` URL i.e. `http://localhost:7009/docs`. The swagger APIs are not loaded in Production or Test environments.
