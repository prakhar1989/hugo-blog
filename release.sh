hugo --theme=skeleton
git add public/
git commit
git push
ansible digitalocean -m shell -a "cd /home/captain/Code/hugo/ && git pull" -u captain
