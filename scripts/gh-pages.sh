#!/bin/bash

tmpDir=$1
src=$2

remote=`git config --get remote.origin.url`

if [ "$TRAVIS_PULL_REQUEST" != false ] ; then
  baseTarget="pulls"
  target="pulls/$TRAVIS_PULL_REQUEST"
else
  baseTarget="branches"
  target="branches/$TRAVIS_BRANCH"
fi

# Get the opened pull requests
jsonPulls=$(curl -k -H "Authorization: token $GITHUB_TOKEN" https://api.github.com/repos/${TRAVIS_REPO_SLUG}/pulls?state=open)
arrPulls=$(jq -n "$jsonPulls" | jq -r '.[].number')

# Get the active branches
jsonBranches=$(curl -k -H "Authorization: token $GITHUB_TOKEN" https://api.github.com/repos/${TRAVIS_REPO_SLUG}/branches?state=open)
arrBranches=$(jq -n "$jsonBranches" | jq -r '.[].name')

# Test inArray function
inArray() {
    local haystack=${1}[@]
    local needle=${2}
    for i in ${!haystack}; do
        if [[ ${i} == ${needle} ]]; then
            return 0
        fi
    done
    return 1
}

# Clone de gh-pages to tmpFolder
eval "git clone --single-branch -b gh-pages $remote $tmpDir"
cd $tmpDir

# Clean pull request folders
for f in pulls/*; do
    if [ -d ${f} ]; then
        echo $f
        if ! inArray arrPulls ${f##*/} ; then
          echo "Deleting outdated pull request #${f##*/}"
          rm -R $f
        fi
    fi
done

# Clean branches folders
echo $arrBranches

for f in branches/*; do
    if [ -d ${f} ]; then
        echo $f
        if ! inArray arrBranches ${f##*/} ; then
          echo "Deleting outdated branch #${f##*/}"
          rm -R $f
        fi
    fi
done

echo "tmpDir: $tmpDir"
echo "target: $target"
echo "src: $src"

eval "git filter-branch --tree-filter 'rm -rf $target' --prune-empty HEAD"
eval "mkdir $baseTarget"
eval "cp -Rp $src $tmpDir/$target"
