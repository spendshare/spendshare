# spendshare

![](./screenshot.png)

## Installing Gurobi

- visit `https://www.gurobi.com/downloads/licenses`
- enter your license key's page
- copy command displayed at the bottom
- download installer for your platform:
  [MacOS](https://packages.gurobi.com/8.1/gurobi8.1.1_mac64.pkg) or
  [Linux 64 bit](https://packages.gurobi.com/8.1/gurobi8.1.1_linux64.tar.gz) or
  [Windows 64 bit](https://packages.gurobi.com/8.1/Gurobi-8.1.1-win64.msi)

## Running in development mode

### Requirements

- `NodeJS` installed in version >= 10
- `yarn` tool installed
- `MongoDB` installed

### Termminal #1

- `cd server`
- `yarn`
- `yarn start`

### Terminal #2

- `mongod`

### Terminal #3

- `cd client`
- `yarn`
- `yarn start`

### IntelliJ

Make sure you have installed Gurobi as described above. Open `gurobi` directory as a project. Run server.

## Running using docker images

- check your local IP address and add it to `server/.env` as `GUROBI_PATH` variable
- make sure you have installed Gurobi as described above
- open `gurobi` directory in IntelliJ and run server with solver
- `docker-compose up` for backend, frontend, MongoDB

## Docker notes

> **NOTE:** _`client` image uses prebuilt `dist/` directory. If you are making any changes to the front end that you want to see in the final image, remember to rebuild by running `yarn run webpack` in `client/`._

> **NOTE:** _The same as above applies to `gurobi`. Remember to run task `fatJar` from Gradle tasks._

Use Node 8.11.1 to compile front end.

Use Node 10.17.0 to run server.
