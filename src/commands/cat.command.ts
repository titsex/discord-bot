import { SlashCommandBuilder } from 'discord.js'

export default new SlashCommandBuilder()
    .setName('cat')
    .setNameLocalization('ru', 'кот')
    .setDescription('Generate random cat picture')
    .setDescriptionLocalization('ru', 'Генерирует рандомную фотку кота')
