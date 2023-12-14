MY ADMIN
===============================================================================
 
## GIT COMMANDS
-------------------------------------------------------------------------------
Resets back to previous commit      |  `git reset --hard {commit id}`
-------------------------------------------------------------------------------
Resets back to previous commit      |  `git push --force origin master`
and undoes all changes on branch

Push to branch                      |  `git push --set-upstream https://git-codecommit.us-east-1.amazonaws.com/v1/repos/myadmin master`


## PWA CONCEPTS

Note that for a PWA the manifest needs to be located in the root directory of the app (i.e. where ever the index.html file is).

The challenge is that if outside of the root directory the PWA is blocked from loading due to CORS errors.
