import { SlashCommandBuilder } from 'discord.js'

export default new SlashCommandBuilder()
    .setName('resume')
    .setNameLocalization('ru', 'возобновить')
    .setDescription('Resume music')
    .setDescriptionLocalization('ru', 'Возобновить музыку')
