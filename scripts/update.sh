#!/bin/bash -e
cd $(dirname $0)
npm run build
for song in ~/gdrive/metal\ bubbi/Songs/*; do node build convert --output "../songs/$(basename "$song").json" "$song"; done
node build import ../songs/*
