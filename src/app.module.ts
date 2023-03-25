import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DiscordModule } from '@discord-nestjs/core';
import * as Joi from 'joi';

import { DiscordConfig } from '@src/discord-bot/discord-bot.config';
import { DiscordBotModule } from './discord-bot/discord-bot.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
      validationSchema: Joi.object({
        SERVER_PORT: Joi.string().required(),
        DISCORD_CLIENT_ID: Joi.string().required(),
        DISCORD_CLIENT_SECRET: Joi.string().required(),
        DISCORD_BOT_TOKEN: Joi.string().required(),
      }),
    }),
    DiscordModule.forRootAsync({
      useClass: DiscordConfig,
    }),
    DiscordBotModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
