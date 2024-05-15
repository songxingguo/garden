#!/bin/sh

set -eux

curl --request POST \
  --url https://api.github.com/repos/songxingguo/garden/dispatches \
  --header "Accept: application/vnd.github+json" \
  --header "Authorization: Bearer $GH_TOKEN" \
  --header 'content-type: application/json' \
  --data '
{
  "event_type":"second_brain_sync"
}'