cd gurobi
./gradlew fatJar
cd ../client
nvm use 8.11.0
yarn run webpack
cd ..
docker-compose up --build --force-recreate
