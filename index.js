const { Octokit } = require('@octokit/rest');
const github_auth = process.env.GITHUB_TOKEN || (() => { throw Error('GITHUB_TOKEN environment is required.'); })();
const octokit = new Octokit({ auth: github_auth });

const commandLineArgs = require('command-line-args');
const opts = commandLineArgs([
  { name: 'org', type: String },
  { name: 'team', type: String },
  { name: 'repos', type: String },
  { name: 'permission', type: String },
]);
const org = opts.org || (() => { throw Error('--org is required.'); })();
const team_slug = opts.team;
const repos = opts.repos;

// pull, push, admin, maintain, triage
// see https://docs.github.com/ja/rest/reference/teams#add-or-update-team-repository-permissions
const permission = opts.permission;

const keys = (permission_boolean) => {
  return Object.keys(permission_boolean).filter(k => permission_boolean[k]);
};

(async (octokit) => {
  let res;
  try {
    if(!repos && !team_slug) {
      // repos list
      res = await octokit.request(`GET /orgs/{org}/repos`, { org });
      res.data.map(r => r.name).forEach(s => console.log(s));
      return;
    }
    if(!repos) {
      // repos list for team
      res = await octokit.request(`GET /orgs/{org}/teams/{team_slug}/repos`, { org, team_slug });
      res.data.map(r => [ r.name, keys(r.permissions).join(', ') ].join(': ')).forEach(s => console.log(s));
      return;
    }
    if(permission) {
      // set permission for repos
      res = await octokit.request(`PUT /orgs/{org}/teams/{team_slug}/repos/{org}/{repos}`, { org, repos, team_slug, permission });
      if(res.status == 204) {
        console.log(`${repos} ok`);
      } else {
        console.error(res);
      }
    }
  } catch(e) {
    console.warn(e);
  }
})(octokit);
