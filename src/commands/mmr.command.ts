import { ILolMode, ILolServer, LoLModeType, LoLServerType } from '@types'
import { SlashCommandBuilder } from 'discord.js'

const servers: LoLServerType[] = ['euw', 'na', 'eune', 'jp', 'kr', 'br', 'lan', 'ru', 'oc', 'tr']
const modes: LoLModeType[] = ['SOLO', 'FLEX', 'ARAM', 'NORMAL']

const serverOptions: ILolServer[] = servers.map((server) => {
    return { name: server, value: server }
})

const modeOptions: ILolMode[] = modes.map((mode) => {
    return { name: mode, value: mode }
})

export default new SlashCommandBuilder()
    .setName('mmr')
    .setNameLocalization('ru', 'ммр')
    .setDescription('Considers your mmr in the League of Legends')
    .setDescriptionLocalization('ru', 'Считает ваш mmr в League of Legends')
    .addStringOption((option) =>
        option
            .setName('server')
            .setNameLocalization('ru', 'сервер')
            .setDescription('which server is your account on?')
            .setDescriptionLocalization('ru', 'на каком сервере ваш аккаунт?')
            .addChoices(...serverOptions)
            .setRequired(true)
    )
    .addStringOption((option) =>
        option
            .setName('nickname')
            .setNameLocalization('ru', 'никнейм')
            .setDescription('your account nickname')
            .setDescriptionLocalization('ru', 'никнейм вашего аккаунта')
            .setRequired(true)
    )
    .addStringOption((option) =>
        option
            .setName('mode')
            .setNameLocalization('ru', 'режим')
            .setDescription('Select the game mode')
            .setDescriptionLocalization('ru', 'Выберите игровой режим')
            .addChoices(...modeOptions)
            .setRequired(true)
    )
