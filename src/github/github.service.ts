import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { GitHubUser, GitHubRepo } from '../common/interfaces/github.interfaces.js';
import { handleGitHubError } from '../common/helpers/GithubErrors.js';

@Injectable()
export class GithubService {
  private readonly logger = new Logger(GithubService.name);
  private readonly baseUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.baseUrl = this.configService.get<string>('GITHUB_API_URL')!;
  }

  async getUserProfile(username: string): Promise<GitHubUser> {
    try {
      const response = await firstValueFrom(
        this.httpService.get<GitHubUser>(`${this.baseUrl}/users/${username}`),
      );

      return response.data;
    } catch (error) {
      handleGitHubError(error, username);
    }
  }

  async getUserRepos(username: string): Promise<GitHubRepo[]> {
    try {
      const response = await firstValueFrom(
        this.httpService.get<GitHubRepo[]>(`${this.baseUrl}/users/${username}/repos`, {
          params: {
            sort: 'updated',
            direction: 'desc',
            per_page: 100,
          },
        }),
      );

      return response.data;
    } catch (error) {
      handleGitHubError(error, username);
    }
  }
}
