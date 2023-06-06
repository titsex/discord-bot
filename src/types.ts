import type {
    SlashCommandBuilder,
    ChatInputCommandInteraction,
    Locale,
    GuildMember,
    InteractionResponse,
} from 'discord.js'

import DisTube from 'distube'

import { Client } from 'discord.js'

export enum COLORS {
    NONE = '\x1b[0',
    CYAN = '\x1b[36',
    RED = '\x1b[31',
    YELLOW = '\x1b[33',
}

export enum COLOR_TYPES {
    NONE = 'm',
    BOLD = ';1m',
}

export type ICommandType = 'music'

export interface ICommand {
    type?: ICommandType
    data: SlashCommandBuilder | Omit<SlashCommandBuilder, 'addSubcommand' | 'addSubcommandGroup'>
    execute: (interaction: CustomInteraction, member?: GuildMember) => unknown
}

export interface CustomInteraction extends ChatInputCommandInteraction {
    send: (message: string) => Promise<void | InteractionResponse>
    location: string
}

export class CustomClient extends Client {
    distube!: DisTube
}

export type IAnswerLanguages = 'ru' | 'en'

export interface IAnswerTranslation {
    [key: string]: string
}

export type IAnswer = {
    [language in IAnswerLanguages]?: IAnswerTranslation
}
