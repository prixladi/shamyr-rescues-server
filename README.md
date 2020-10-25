# Shamyr rescues react

Backend for [Shamyr Rescues](https://github.com/prixladi/shamyr-rescues) project,<br />
For everything to function properly should be run together with [Frontend](https://github.com/prixladi/shamyr-rescues-server).

## Yarn

### `yarn start`

Runs the app in the development mode on [http://localhost:8000](http://localhost:8000) address.

The app will restart if you make edits.<br />
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.<br />
App is ready to be deployed!

## Docker

### `docker build .`

Builds production-ready image.

### `docker-compose up`

Runs app container and other required/optional containers (**postgress, pgadmin, mongodb, authority service**) and builds app image if does not exist.