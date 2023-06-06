import { SlashCommandBuilder } from 'discord.js'

export default new SlashCommandBuilder()
    .setName('ping')
    .setNameLocalization('ru', 'пинг')
    .setDescription('Bot response time')
    .setDescriptionLocalization('ru', 'Время ответа бота')
