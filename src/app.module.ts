import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GithubModule } from './github/github.module.js';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), GithubModule],
})
export class AppModule {}
