import core from '@actions/core';
import github from '@actions/github';

(async () => {
  const excludeEnvs = core.getInput('exclude-envs', { required: false }) || [];
  const hasProtectionRule =
    core.getInput('has-protection-rule', { required: false }) || true;
  const repotoken = core.getInput('repoToken', { required: false }) || true;

  const headers = new Headers();
  headers.append('Authorization', `Bearer ${repotoken}`);

  const { repo } = github.context;

  // eslint-disable-next-line no-undef
  const payload = (await fetch(
    `https://api.github.com/repos/${repo}/environments`,
    { method: 'GET', headers },
  )) as unknown as IEnvironmentApi;

  const envList = payload.environments.filter(({ name, protection_rules }) =>
    !excludeEnvs.includes(name) && hasProtectionRule
      ? protection_rules.length
      : true,
  );

  core.setOutput('environments', envList);
})();
