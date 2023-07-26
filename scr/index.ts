import { getInput, setOutput } from '@actions/core';
import github from '@actions/github';
import axios from 'axios';

(async () => {
  const excludeEnvs = getInput('exclude-envs', { required: false }) || [];
  const hasProtectionRule =
    getInput('has-protection-rule', { required: false }) || true;
  const repotoken = getInput('repo-token', { required: false }) || true;

  const axiosConfig = axios.create({
    baseURL: 'https://api.github.com',
    headers: { Authorization: `Bearer ${repotoken}` },
  });

  const { repo } = github.context;

  const fetchEnvs = await axiosConfig.get<IEnvironmentApi>(
    `/repos/${repo}/environments`,
  );

  const envList = fetchEnvs.data?.environments.filter(
    ({ name, protection_rules }) =>
      !excludeEnvs.includes(name) && hasProtectionRule
        ? protection_rules.length
        : true,
  );

  return setOutput('environments', envList);
})();
