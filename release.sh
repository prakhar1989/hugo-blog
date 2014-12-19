echo -e "\033[0;32mDeploying updates to GitHub...\033[0m"
hugo --theme=skeleton
git add -A
msg="rebuilding site `date`"
if [ $# -eq 1 ]
  then msg="$1"
fi
git commit -m "$msg"
git push origin master
git subtree push --prefix=public git@github.com:prakhar1989/prakhar1989.github.com.git gh-pages
