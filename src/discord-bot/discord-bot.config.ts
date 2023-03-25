import { Injectable } from '@nestjs/common';
import { DiscordModuleOption, DiscordOptionsFactory } from '@discord-nestjs/core';
import { GatewayIntentBits } from 'discord.js';

@Injectable()
export class DiscordConfig implements DiscordOptionsFactory {
  createDiscordOptions(): DiscordModuleOption {
    return {
      token: process.env.DISCORD_BOT_TOKEN,
      discordClientOptions: {
        intents: [
          GatewayIntentBits.Guilds,
          GatewayIntentBits.GuildMembers,
          GatewayIntentBits.GuildMessages,
          GatewayIntentBits.MessageContent,
          GatewayIntentBits.DirectMessages,
        ],
      },
      registerCommandOptions: [
        {
          // forGuild: configService.get('GUILD_ID_WITH_COMMANDS'),
          removeCommandsBefore: true,
        },
      ],
    };
  }
}
