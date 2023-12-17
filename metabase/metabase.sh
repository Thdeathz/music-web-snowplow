docker run -d -p 4000:3000 \
  -e "MB_DB_TYPE=mongodb" \
  -e "MB_DB_DBNAME=mern" \
  -e "MB_DB_PORT=27017" \
  -e "MB_DB_HOST=" \
  --network  \
  --name metabase metabase/metabase
