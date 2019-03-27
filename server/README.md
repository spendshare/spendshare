## Usage
    $ mongod

And in new terminal:

    $ yarn
    $ yarn start


## Docker

You can also use docker for development. Make sure you run npm install on your host machine so that code linting and everything works fine.

```sh
$ npm i
$ cp .env.example .env
```

Start the services

```sh
$ docker-compose up -d
```

View the logs

```sh
$ docker-compose logs -f
```

In case you install a npm module while developing, it should also be installed within docker container, to do this first install the module you want with simple `npm i module name`, then run it within docker container

```sh
$ docker-compose exec node npm i
```

If you make any changes to the file, nodemon should automatically pick up and restart within docker (you can see this in the logs)

To run tests

```sh
$ docker-compose exec -e MONGODB_URL=mongodb://mongo:27017/noobjs_test node npm test
```
