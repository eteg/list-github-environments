import { getInput, setOutput } from '@actions/core';
import { context as contextGit } from '@actions/github';
import axios from 'axios';

const hasProtectionRuleFilter = (
  value: ProtectionRule[],
  hasProtection: string | undefined,
): boolean => {
  if (typeof hasProtection === 'undefined') return true;

  return hasProtection === 'true' ? !!value.length : !value.length;
};

(async () => {
  const excludeEnvsInput = getInput('exclude-envs', { required: false });

  const excludeEnvs = (
    excludeEnvsInput ? JSON.stringify(excludeEnvsInput) : []
  ) as string[];

  const hasProtectionRule =
    getInput('has-protection-rule', {
      required: false,
    }) || undefined;

  const repoToken = getInput('repo-token', { required: true });

  const axiosConfig = axios.create({
    baseURL: 'https://api.github.com',
    headers: { Authorization: `Bearer ${repoToken}` },
  });

  const {
    repo: { repo, owner },
  } = contextGit;

  const fetchEnvs = await axiosConfig.get<IEnvironmentApi>(
    `/repos/${owner}/${repo}/environments`,
  );

  const envList = fetchEnvs.data?.environments
    .filter(
      ({ name, protection_rules }) =>
        !excludeEnvs.includes(name) &&
        hasProtectionRuleFilter(protection_rules, hasProtectionRule),
    )
    .map((it) => it.name);

  return setOutput('environments', envList);
})();
