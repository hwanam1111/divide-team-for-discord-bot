import { Module } from '@nestjs/common';
import { DiscordModule } from '@discord-nestjs/core';

import { DiscordBotGateway } from '@src/discord-bot/discord-bot.gateway';
import { DivideTeam } from '@src/discord-bot/features/divide-team';

@Module({
  imports: [DiscordModule.forFeature()],
  providers: [DiscordBotGateway, DivideTeam],
})
export class DiscordBotModule {}
