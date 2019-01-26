#!/bin/bash

tmpDir=$1
srcDir=$2

oldPath="$tmpDir/old"
newPath="$tmpDir/new"

# Get the opened pull requests
jsonPulls=$(curl -k -H "Authorization: token $GITHUB_TOKEN" https://api.github.com/repos/${TRAVIS_REPO_SLUG}/pulls?state=open)
arrPulls=$(jq -n "$jsonPulls" | jq -r '.[].number')

# Get the active branches
jsonBranches=$(curl -k -H "Authorization: token $GITHUB_TOKEN" https://api.github.com/repos/${TRAVIS_REPO_SLUG}/branches?state=open)
arrBranches=$(jq -n "$jsonBranches" | jq -r '.[].name')

# Clone gh-pages to tmpDir
git clone --quiet --single-branch -b gh-pages https://${GITHUB_TOKEN}@github.com/${TRAVIS_REPO_SLUG}.git ${oldPath}

# Clean old git folder
if [ "$TRAVIS_PULL_REQUEST" != false ] ; then
  target="pulls/$TRAVIS_PULL_REQUEST"
else
  target="branches/$TRAVIS_BRANCH"
fi
cd $oldPath
eval "git filter-branch --tree-filter 'rm -rf $target' --prune-empty HEAD"

# Create new folder and copy git conf
mkdir -p ${newPath}
cp -R ${oldPath}/.git ${newPath}/.git

# Copy branches folders
for branch in $arrBranches; do
  [[ -d ${oldPath}/branches/${branch} ]] &&
  mkdir -p ${newPath}/branches/${branch} &&
  cp -R ${oldPath}/branches/${branch}/* ${newPath}/branches/${branch}
done

# Copy pulls folders
for pull in $arrPulls; do
  [[ -d ${oldPath}/pulls/${pull} ]] &&
  mkdir -p ${newPath}/pulls/${pull} &&
  cp -R ${oldPath}/pulls/${pull}/* ${newPath}/pulls/${pull}
done

# Add new build to repo
mkdir -p ${newPath}/${target}
cp -Rp ${srcDir}/* ${newPath}/${target}

# Push changes
cd $newPath
git add -A
git commit -m "Travis commit"
git push --force -u origin gh-pages

