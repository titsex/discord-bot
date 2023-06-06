import { SlashCommandBuilder } from 'discord.js'

export default new SlashCommandBuilder()
    .setName('skip')
    .setNameLocalization('ru', 'пропустить')
    .setDescription('Skip music')
    .setDescriptionLocalization('ru', 'Пропустить музыку')
