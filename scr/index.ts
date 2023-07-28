import 'dotenv/config';
import { getInput, setOutput } from '@actions/core';
import { context } from '@actions/github';
import { Github } from './services/github';

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

  const { repo } = context;

  const git = new Github({ apiToken: repoToken });

  const fetchEnvs = await git.listAllEnvironments(repo);

  const envList = fetchEnvs
    .filter(
      ({ name, protection_rules }) =>
        !excludeEnvs.includes(name) &&
        hasProtectionRuleFilter(protection_rules, hasProtectionRule),
    )
    .map((it) => it.name);

  return setOutput('environments', envList);
})();
