import { SlashCommandBuilder } from 'discord.js'

export default new SlashCommandBuilder()
    .setName('cat')
    .setNameLocalization('ru', 'кот')
    .setDescription('Generate random cat gif')
    .setDescriptionLocalization('ru', 'Генерирует рандомную гифку кота')
