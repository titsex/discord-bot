import { SlashCommandBuilder } from 'discord.js'

export default new SlashCommandBuilder()
    .setName('shuffle')
    .setNameLocalization('ru', 'перемешать')
    .setDescription('Shuffle music')
    .setDescriptionLocalization('ru', 'Перемешать музыку')
