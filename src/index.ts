import { config } from 'dotenv'
config()

import InteractionHandler from '@handler/interaction.handler'
import FinishHandler from '@handler/finish.handler'
import ReadyHandler from '@handler/ready.handler'
import EmptyHandler from '@handler/empty.handler'
import CrashHandler from '@handler/crash.handler'
import ErrorHandler from '@handler/error.handler'
import PlayHandler from '@handler/play.handler'
import TraceMoe from 'moe-api'

import { Client, GatewayIntentBits } from 'discord.js'
import { Logger } from '@class/Logger'
import { fetchCommands } from '@utils'
import { CustomClient } from '@types'
import { DisTube } from 'distube'
import { join } from 'path'

export const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildVoiceStates,
    ],
}) as CustomClient

export const messages = new Map<string, string>()
export const volumes = new Map<string, number>()

const main = async () => {
    const commandsPath = join(__dirname, 'modules')
    const commands = await fetchCommands(commandsPath)

    client.distube = new DisTube(client, {
        leaveOnStop: true,
        leaveOnEmpty: true,
        leaveOnFinish: true,
        emptyCooldown: 0,
        nsfw: true,
    })

    client.moe = new TraceMoe({
        cutBorders: false,
        anilistInfo: true,
        mute: false,
        size: 1,
    })

    client.distube.on('playSong', PlayHandler)
    client.distube.on('finish', FinishHandler)
    client.distube.on('empty', EmptyHandler)
    client.distube.on('error', ErrorHandler)

    client.on('interactionCreate', InteractionHandler(commands))
    client.on('ready', ReadyHandler(commands))
    client.on('error', CrashHandler)

    client.login(process.env.DS_BOT_TOKEN!).then(() => Logger.info('Bot has been successfully started'))
}

main()
