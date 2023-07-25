"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@actions/core");
const github_1 = require("@actions/github");
(async () => {
    const excludeEnvs = core_1.default.getInput('exclude-envs', { required: false }) || [];
    const hasProtectionRule = core_1.default.getInput('has-protection-rule', { required: false }) || true;
    const repotoken = core_1.default.getInput('repo-token', { required: false }) || true;
    const headers = new Headers();
    headers.append('Authorization', `Bearer ${repotoken}`);
    const { repo } = github_1.default.context;
    const payload = (await fetch(`https://api.github.com/repos/${repo}/environments`, { method: 'GET', headers }));
    const envList = payload.environments.filter(({ name, protection_rules }) => !excludeEnvs.includes(name) && hasProtectionRule
        ? protection_rules.length
        : true);
    core_1.default.setOutput('environments', envList);
})();
//# sourceMappingURL=index.js.map