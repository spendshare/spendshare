## Notes to self

```bash
wget -O sp https://github.com/spendshare/spendshare/archive/$BRANCH_NAME.zip
rm -rf spendshare
unzip sp -d spendshare
cd spendshare/spendshare-master
cd client
yarn # download dependencies
export FRONTEND_URL=$FRONTEND_URL
export BACKEND_URL=$BACKEND_URL
yarn run webpack # bundle to dist
rm -rf /var/www/html
cp -r dist /var/www/html
cp public/index.html /var/www/html
cd ../server
yarn
pm2 start npm -- run server # run server using babel-node as runtime
```
