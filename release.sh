#!/bin/bash
echo -e "\033[0;32mDeploying updates to GitHub...\033[0m"
hugo --theme=skeleton
cp -f 404.html public/404.html
firebase deploy

