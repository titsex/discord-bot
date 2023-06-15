import type { SlashCommandBuilder, ChatInputCommandInteraction, GuildMember, InteractionResponse } from 'discord.js'

import TraceMoe from 'moe-api'
import DisTube from 'distube'

import { Client } from 'discord.js'

export class CustomClient extends Client {
    distube!: DisTube
    moe!: TraceMoe
}

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

export enum MMR_CODES {
    SOLO = 420,
    FLEX = 400,
    ARAM = 450,
    NORMAL = 430,
}

export enum RANK_NAMES {
    Iron = 'Железо',
    Bronze = 'Бронза',
    Silver = 'Серебро',
    Gold = 'Золото',
    Palatine = 'Платина',
    Diamond = 'Алмаз',
    Master = 'Мастер',
    Grandmaster = 'Грандмастер',
    Challenger = 'Претендент',
}

export interface ICommand {
    type?: CommandType
    data: SlashCommandBuilder | Omit<SlashCommandBuilder, 'addSubcommand' | 'addSubcommandGroup'>
    execute: (interaction: CustomInteraction, member?: GuildMember) => unknown
}

export interface CustomInteraction extends ChatInputCommandInteraction {
    send: (message: string) => Promise<void | InteractionResponse>
    location: string
}

export interface IAnswerTranslation {
    [key: string]: string
}

export interface IChoose<T, K> {
    name: T
    value: K
}

export type ILolServer = IChoose<LoLServerType, LoLServerType>

export type ILolMode = IChoose<LoLModeType, LoLModeType>

export type IAnswer = {
    [language in AnswerLanguageType]?: IAnswerTranslation
}

export type AnswerLanguageType = 'ru' | 'en'

export type LoLServerType = 'euw' | 'na' | 'eune' | 'jp' | 'kr' | 'br' | 'lan' | 'ru' | 'oc' | 'tr'

export type LoLModeType = 'SOLO' | 'FLEX' | 'ARAM' | 'NORMAL'

export type CommandType = 'music'
