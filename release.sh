hugo --theme=skeleton
git add -A
git commit
git push origin master
git subtree push --prefix=public git@github.com:prakhar1989/prakhar1989.github.com.git gh-pages
