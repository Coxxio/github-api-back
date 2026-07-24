import { Controller, Get, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { GithubService } from './github.service.js';
import { GitHubUserResponseDto } from './dto/github-user-response.dto.js';
import { GitHubRepoResponseDto } from './dto/github-repo-response.dto.js';
import { Serialize } from '../common/interceptors/serialize.interceptor.js';

@Controller('github')
export class GithubController {
  constructor(private readonly githubService: GithubService) {}

  @Get(':username')
  @HttpCode(HttpStatus.OK)
  @Serialize(GitHubUserResponseDto)
  getUserProfile(@Param('username') username: string): Promise<GitHubUserResponseDto> {
    return this.githubService.getUserProfile(username);
  }

  @Get(':username/repos')
  @HttpCode(HttpStatus.OK)
  @Serialize(GitHubRepoResponseDto)
  getUserRepos(@Param('username') username: string): Promise<GitHubRepoResponseDto[]> {
    return this.githubService.getUserRepos(username);
  }
}
