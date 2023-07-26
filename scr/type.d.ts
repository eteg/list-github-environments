interface Reviewer {
  login?: string;
  id: number;
  node_id: string;
  avatar_url?: string;
  gravatar_id?: string;
  url: string;
  html_url: string;
  followers_url?: string;
  following_url?: string;
  gists_url?: string;
  starred_url?: string;
  subscriptions_url?: string;
  organizations_url?: string;
  repos_url?: string;
  events_url?: string;
  received_events_url?: string;
  type?: string;
  site_admin?: boolean;
  name?: string;
  slug?: string;
  description?: string;
  privacy?: string;
  notification_setting?: string;
  permission?: string;
  members_url?: string;
  repositories_url?: string;
  parent?: unknown;
}

interface Deploymentbranchpolicy {
  protected_branches: boolean;
  custom_branch_policies: boolean;
}

interface Reviewer2 {
  type: string;
  reviewer: Reviewer;
}

interface ProtectionRule {
  id: number;
  node_id: string;
  type: string;
  wait_timer?: number;
  reviewers?: Reviewer2[];
}

interface Environment {
  id: number;
  node_id: string;
  name: string;
  url: string;
  html_url: string;
  created_at: string;
  updated_at: string;
  protection_rules: ProtectionRule[];
  deployment_branch_policy: Deploymentbranchpolicy;
}

interface IEnvironmentApi {
  total_count: number;
  environments: Environment[];
}
