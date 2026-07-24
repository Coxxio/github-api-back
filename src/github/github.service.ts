import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { plainToInstance } from 'class-transformer';
import { GitHubUser } from '../common/interfaces/github.interfaces.js';
import { GitHubUserResponseDto } from './dto/github-user-response.dto.js';
import { GitHubRepoResponseDto } from './dto/github-repo-response.dto.js';

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

  async getUserProfile(username: string): Promise<GitHubUserResponseDto> {
    try {
      const response = await firstValueFrom(
        this.httpService.get<GitHubUser>(`${this.baseUrl}/users/${username}`),
      );

      return plainToInstance(GitHubUserResponseDto, response.data, {
        excludeExtraneousValues: true,
      });
    } catch (error) {
      this.handleGitHubError(error, username);
    }
  }

  async getUserRepos(username: string): Promise<GitHubRepoResponseDto[]> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.baseUrl}/users/${username}/repos`, {
          params: {
            sort: 'updated',
            direction: 'desc',
            per_page: 100,
          },
        }),
      );

      return (response.data as unknown[]).map((item) =>
        plainToInstance(GitHubRepoResponseDto, item, {
          excludeExtraneousValues: true,
        }),
      );
    } catch (error) {
      this.handleGitHubError(error, username);
    }
  }

  private handleGitHubError(error: unknown, username: string): never {
    if (error && typeof error === 'object' && 'response' in error) {
      const axiosError = error as {
        response?: { status?: number; data?: { message?: string } };
      };

      const status = axiosError.response?.status;
      const message = axiosError.response?.data?.message ?? 'Unknown error';

      if (status === 404) {
        this.logger.warn(`User not found: ${username}`);
        throw new HttpException(
          `User '${username}' not found on GitHub`,
          HttpStatus.NOT_FOUND,
        );
      }

      if (status === 403) {
        this.logger.warn('GitHub API rate limit exceeded');
        throw new HttpException(
          'GitHub API rate limit exceeded. Try again later.',
          HttpStatus.TOO_MANY_REQUESTS,
        );
      }

      this.logger.error(`GitHub API error: ${status} - ${message}`);
      throw new HttpException(
        `GitHub API error: ${message}`,
        HttpStatus.BAD_GATEWAY,
      );
    }

    this.logger.error('Unexpected error calling GitHub API', error);
    throw new HttpException(
      'Internal server error',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
