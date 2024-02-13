#!/bin/bash

mongodb_is_ready() {
  while true; do
    result=$(mongo --host health --eval "db.adminCommand('ping')")
    echo "$result"

    if [[ "$result" == *'"ok" : 1'* ]]; then
      echo "MongoDB is ready!"
      break
    else
      echo "Waiting for MongoDB to be ready..."
      sleep 2
    fi
  done
}

echo "MongoDB is ready."

mongoimport --host localhost --db health --collection users --type json --file ./generated_users.json --jsonArray

echo "Data import completed."
