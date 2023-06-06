import { SlashCommandBuilder } from 'discord.js'

export default new SlashCommandBuilder()
    .setName('pause')
    .setNameLocalization('ru', 'пауза')
    .setDescription('Pause music')
    .setDescriptionLocalization('ru', 'Поставить музыку на паузу')
