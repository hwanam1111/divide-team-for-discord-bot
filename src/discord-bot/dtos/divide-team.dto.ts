import { Field } from '@discord-nestjs/core';
import { TextInputModalData } from 'discord.js';

export class DivideTeamInput {
  @Field('members')
  members: TextInputModalData;

  @Field('eachTeamMembers')
  eachTeamMembers: TextInputModalData;
}
