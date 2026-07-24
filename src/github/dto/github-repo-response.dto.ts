import { Expose, Type } from 'class-transformer';

class RepoOwnerDto {
  @Expose()
  login: string;

  @Expose()
  avatar_url: string;

  @Expose()
  html_url: string;
}

class RepoLicenseDto {
  @Expose()
  name: string;

  @Expose()
  spdx_id: string;
}

export class GitHubRepoResponseDto {
  @Expose()
  name: string;

  @Expose()
  full_name: string;

  @Expose()
  html_url: string;

  @Expose()
  description: string;

  @Expose()
  fork: boolean;

  @Expose()
  language: string;

  @Expose()
  stargazers_count: number;

  @Expose()
  watchers_count: number;

  @Expose()
  forks_count: number;

  @Expose()
  open_issues_count: number;

  @Expose()
  size: number;

  @Expose()
  default_branch: boolean;

  @Expose()
  topics: string[];

  @Expose()
  visibility: string;

  @Expose()
  created_at: string;

  @Expose()
  updated_at: string;

  @Expose()
  pushed_at: string;

  @Type(() => RepoOwnerDto)
  @Expose()
  owner: RepoOwnerDto;

  @Type(() => RepoLicenseDto)
  @Expose()
  license: RepoLicenseDto;
}
