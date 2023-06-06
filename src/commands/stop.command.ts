import { SlashCommandBuilder } from 'discord.js'

export default new SlashCommandBuilder()
    .setName('stop')
    .setNameLocalization('ru', 'стоп')
    .setDescription('Stop music')
    .setDescriptionLocalization('ru', 'Останавливает музыку')
