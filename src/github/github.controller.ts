import { Controller, Get, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { GithubService } from './github.service.js';
import { GitHubUserResponseDto } from './dto/github-user-response.dto.js';
import { GitHubRepoResponseDto } from './dto/github-repo-response.dto.js';

@Controller('github')
export class GithubController {
  constructor(private readonly githubService: GithubService) {}

  @Get(':username')
  @HttpCode(HttpStatus.OK)
  async getUserProfile(
    @Param('username') username: string,
  ): Promise<GitHubUserResponseDto> {
    return this.githubService.getUserProfile(username);
  }

  @Get(':username/repos')
  @HttpCode(HttpStatus.OK)
  async getUserRepos(
    @Param('username') username: string,
  ): Promise<GitHubRepoResponseDto[]> {
    return this.githubService.getUserRepos(username);
  }
}
