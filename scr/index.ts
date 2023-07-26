import { getInput, setOutput } from '@actions/core';
import github from '@actions/github';

(async () => {
  const excludeEnvs = getInput('exclude-envs', { required: false }) || [];
  const hasProtectionRule =
    getInput('has-protection-rule', { required: false }) || true;
  const repotoken = getInput('repo-token', { required: false }) || true;

  const headers = new Headers();
  headers.append('Authorization', `Bearer ${repotoken}`);

  const { repo } = github.context;

  const payload = (await fetch(
    `https://api.github.com/repos/${repo}/environments`,
    { method: 'GET', headers },
  )) as unknown as IEnvironmentApi;

  const envList = payload.environments.filter(({ name, protection_rules }) =>
    !excludeEnvs.includes(name) && hasProtectionRule
      ? protection_rules.length
      : true,
  );

  return setOutput('environments', envList);
})();
