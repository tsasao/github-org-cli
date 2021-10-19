# github-org-cli

## usage
this command requires GITHUB_TOKEN environment.

GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

### list repositories in org
$ node index.js --org *your-org-name*

### list repositories with permission for team in org
$ node index.js --org *your-org-name* --team *team-slug*

- *team-slug* is usualy the same as team name.

### update repository permission for team in org
$ node index.js --org *your-org-name* --team *team-slug* --repos *target-repos-name* --permission *permission*

- *permission* is one of `pull`, `push`, `admin`, `maintain`, `triage`. see https://docs.github.com/ja/rest/reference/teams#add-or-update-team-repository-permissions
