import { Expose } from 'class-transformer';

export class GitHubUserResponseDto {
  @Expose()
  login: string;

  @Expose()
  id: number;

  @Expose()
  node_id: string;

  @Expose()
  avatar_url: string;

  @Expose()
  gravatar_id: string;

  @Expose()
  url: string;

  @Expose()
  html_url: string;

  @Expose()
  followers_url: string;

  @Expose()
  following_url: string;

  @Expose()
  gists_url: string;

  @Expose()
  starred_url: string;

  @Expose()
  subscriptions_url: string;

  @Expose()
  organizations_url: string;

  @Expose()
  repos_url: string;

  @Expose()
  events_url: string;

  @Expose()
  received_events_url: string;

  @Expose()
  type: string;

  @Expose()
  user_view_type: string;

  @Expose()
  site_admin: boolean;

  @Expose()
  name: string;

  @Expose()
  company: string;

  @Expose()
  blog: string;

  @Expose()
  location: string;

  @Expose()
  email: string;

  @Expose()
  hireable: boolean;

  @Expose()
  bio: string;

  @Expose()
  twitter_username: string;

  @Expose()
  public_repos: number;

  @Expose()
  public_gists: number;

  @Expose()
  followers: number;

  @Expose()
  following: number;

  @Expose()
  created_at: string;

  @Expose()
  updated_at: string;
}
