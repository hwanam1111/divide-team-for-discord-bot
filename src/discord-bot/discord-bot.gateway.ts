import { Injectable } from '@nestjs/common';
import { Once, InjectDiscordClient } from '@discord-nestjs/core';
import { Client, ActivityType } from 'discord.js';

@Injectable()
export class DiscordBotGateway {
  constructor(
    @InjectDiscordClient()
    private readonly client: Client,
  ) {}

  @Once('ready')
  onReady() {
    this.client.user.setActivity('명령어는 "/팀나누기"', { type: ActivityType.Playing });
    console.log(`Discord Bot ${this.client.user.tag} was started!`);
  }
}
