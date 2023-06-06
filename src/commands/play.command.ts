import { SlashCommandBuilder } from 'discord.js'

export default new SlashCommandBuilder()
    .setName('play')
    .setNameLocalization('ru', 'играть')
    .setDescription('Play music')
    .setDescriptionLocalization('ru', 'Играть музыку')
    .addStringOption((option) =>
        option
            .setName('argument')
            .setNameLocalization('ru', 'аргумент')
            .setDescription('name or url')
            .setDescriptionLocalization('ru', 'название или ссылка')
            .setRequired(true)
    )
