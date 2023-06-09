import { SlashCommandBuilder } from 'discord.js'

export default new SlashCommandBuilder()
    .setName('anifind')
    .setNameLocalization('ru', 'анипоиск')
    .setDescription('Find anime by scenes')
    .setDescriptionLocalization('ru', 'Поиск аниме по кадрам')
    .addAttachmentOption((option) =>
        option
            .setName('scene')
            .setNameLocalization('ru', 'сцена')
            .setDescription('A scene or frame from an anime')
            .setDescriptionLocalization('ru', 'Сцена или кадр из аниме')
            .setRequired(true)
    )
