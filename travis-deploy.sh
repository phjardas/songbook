#!/bin/bash -e
if [ "$TRAVIS_BRANCH" == "master" -a "$TRAVIS_PULL_REQUEST" == "false" ]; then
  echo "Deploying branch $TRAVIS_BRANCH to Firebase"
  npm run deploy -- --token=${FIREBASE_TOKEN} --force
else
  echo "Skipping Firebase deployment of branch $TRAVIS_BRANCH"
fi
