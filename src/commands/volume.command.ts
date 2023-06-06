import { SlashCommandBuilder } from 'discord.js'

export default new SlashCommandBuilder()
    .setName('volume')
    .setNameLocalization('ru', 'громкость')
    .setDescription('Set music volume')
    .setDescriptionLocalization('ru', 'Установить громкость музыки')
    .addNumberOption((option) =>
        option
            .setName('percent')
            .setNameLocalization('ru', 'процент')
            .setDescription('volume as a percentage')
            .setDescriptionLocalization('ru', 'громкость в процентах')
            .setRequired(true)
    )
