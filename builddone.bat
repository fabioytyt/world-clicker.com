timeout /t 25

move "./docs/browser" "./"
echo J|rmdir /s docs
ren "browser" "docs"

git add .
git commit -m "Autocommit"
git fetch
git rebase
git push origin

exit