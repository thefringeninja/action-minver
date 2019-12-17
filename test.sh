#!/usr/bin/env bash

docker build -t action-minver .

docker run --rm -it action-minver