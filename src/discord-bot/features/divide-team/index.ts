import { Injectable, UseGuards } from '@nestjs/common';
import { Command, EventParams, Handler, IA, InjectDiscordClient, On } from '@discord-nestjs/core';
import {
  ActionRowBuilder,
  Client,
  ModalActionRowComponentBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ClientEvents,
  CommandInteraction,
  codeBlock,
} from 'discord.js';
import { ModalFieldsTransformPipe } from '@discord-nestjs/common';

import { makeTeam } from '@src/discord-bot/features/divide-team/make-team';

import { ModalInteractionGuard } from '@src/discord-bot/guard/modal-interaction.guard';

import { DivideTeamInput } from '@src/discord-bot/dtos/divide-team.dto';

@Command({
  name: '팀나누기',
  description: '팀을 나눌 수 있어요.',
  dmPermission: true,
})
@Injectable()
export class DivideTeam {
  private readonly modalId = 'divideTeamModal';
  private readonly membersInputId = 'members';
  private readonly eachTeamMembersInputId = 'eachTeamMembers';

  constructor(
    @InjectDiscordClient()
    private readonly client: Client,
  ) {}

  @Handler()
  async onRegisterCommand(interaction: CommandInteraction): Promise<void> {
    const modal = new ModalBuilder().setCustomId(this.modalId).setTitle('팀 나누기');

    const memebersInput = new TextInputBuilder()
      .setCustomId(this.membersInputId)
      .setRequired(true)
      .setLabel('참여하는 인원을 입력해주세요.')
      .setPlaceholder('예시 : 이준, 재훈, 홍균, 명재')
      .setStyle(TextInputStyle.Paragraph);

    const eachTeamMembers = new TextInputBuilder()
      .setCustomId(this.eachTeamMembersInputId)
      .setLabel('각 팀당 인원을 입력해주세요. (숫자만 입력)')
      .setPlaceholder('예시 : 4')
      .setMaxLength(2)
      .setRequired(true)
      .setStyle(TextInputStyle.Short);

    const rows = [memebersInput, eachTeamMembers].map((component) =>
      new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(component),
    );

    modal.addComponents(...rows);

    await interaction.showModal(modal);
  }

  @On('interactionCreate')
  @UseGuards(ModalInteractionGuard)
  async onModalSubmit(
    @IA(ModalFieldsTransformPipe) { members, eachTeamMembers }: DivideTeamInput,
    @EventParams() eventArgs: ClientEvents['interactionCreate'],
  ): Promise<void> {
    const [modal] = eventArgs;
    if (!modal.isModalSubmit()) return;

    const joinMembers = members.value.replace(/ /g, '').split(',');
    const divideEachTeamMembers = parseInt(eachTeamMembers.value, 10);

    if (joinMembers?.length <= 3) {
      await modal.reply(codeBlock('Error: 참여 인원은 4명 이상이어야합니다.'));

      return;
    }

    if (divideEachTeamMembers <= 1) {
      await modal.reply(codeBlock('Error: 최소 팀당 인원은 2명 이상이어야합니다.'));

      return;
    }

    const madeTeam = makeTeam(joinMembers, divideEachTeamMembers);

    let result = '';
    madeTeam.forEach((teams, teamIndex) => {
      result += codeBlock(`${teamIndex + 1}팀 : ${teams.join(',')}`);
    });

    await modal.reply(result);
  }
}
