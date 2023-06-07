import { SlashCommandBuilder } from 'discord.js'

export default new SlashCommandBuilder()
    .setName('yesorno')
    .setNameLocalization('ru', 'данетка')
    .setDescription('Generate random yes or no gif')
    .setDescriptionLocalization('ru', 'Генерирует рандомную гифку да или нет')
    .addStringOption((option) =>
        option
            .setName('question')
            .setNameLocalization('ru', 'вопрос')
            .setDescription('you can ask a question and get an answer in the form of yes or no')
            .setDescriptionLocalization('ru', 'можете задать вопрос и получить ответ в виде да или нет')
    )
