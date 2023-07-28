import axios, { AxiosInstance } from 'axios';

type Pagination = {
  owner: string;
  repo: string;
  per_page?: number;
  page?: number;
};

export class Github {
  private githubRequest: AxiosInstance;

  constructor({ apiToken }: { apiToken: string }) {
    this.githubRequest = Github.createGithubConnection(apiToken);
  }

  public async listAllEnvironments({
    owner,
    repo,
    per_page = 2,
    page = 1,
  }: Pagination) {
    let envs: Environment[] = [];
    const { data } = await this.githubRequest.get<IEnvironmentApi>(
      `/repos/${owner}/${repo}/environments`,
      {
        params: {
          per_page,
          page,
        },
      },
    );

    envs = data.environments;

    if (Math.ceil(data.total_count / per_page) >= page + 1) {
      envs = [
        ...envs,
        ...(await this.listAllEnvironments({
          owner,
          repo,
          per_page,
          page: page + 1,
        })),
      ];
    }

    return envs;
  }

  private static createGithubConnection(apiToken: string) {
    return axios.create({
      baseURL: 'https://api.github.com',
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
    });
  }
}
