import { NotFoundException, BadGatewayException, InternalServerErrorException, HttpException, HttpStatus } from '@nestjs/common';

export function handleGitHubError(error: unknown, username: string): never {
    if (error && typeof error === 'object' && 'response' in error) {
      const axiosError = error as {
        response?: { status?: number; data?: { message?: string } };
      };

      const status = axiosError.response?.status;
      const message = axiosError.response?.data?.message ?? 'Unknown error';

      if (status === 404) {
        this.logger.warn(`User not found: ${username}`);
        throw new NotFoundException(
          `User '${username}' not found on GitHub`,
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
      throw new BadGatewayException(
        `GitHub API error: ${message}`,
      );
    }

    this.logger.error('Unexpected error calling GitHub API', error);
    throw new InternalServerErrorException(
      'Internal server error',
    );
  }