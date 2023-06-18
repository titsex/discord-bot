import { CustomInteraction, ICommand, RANK_NAMES } from '@types'
import { readdirSync, statSync } from 'fs'
import { REST, Routes } from 'discord.js'
import { Logger } from '@class/Logger'
import { join } from 'path'

export const getDate = () => {
    const date = new Date()

    return [date, date.toLocaleString('ru-RU')]
}

export async function updateCommands(commands: ICommand[]) {
    const rest = new REST({ version: '10' }).setToken(process.env.DS_BOT_TOKEN!)

    try {
        await rest.put(Routes.applicationCommands(process.env.DS_BOT_ID!), {
            body: commands.map((command: ICommand) => command.data),
        })
    } catch (error) {
        Logger.error(error)
    }
}

export async function fetchCommands(path: string, commands: ICommand[] = []): Promise<ICommand[]> {
    const files = readdirSync(path)

    for (const file of files) {
        const filePath = join(path, file)
        const isDirectory = (await statSync(filePath)).isDirectory()

        if (isDirectory) await fetchCommands(filePath, commands)
        else commands.push(await import(filePath))
    }

    return commands.map((command: ICommand) => Object.values(command)[0])
}

export async function extendInteraction(interaction: CustomInteraction) {
    interaction.send = async (content: string) =>
        await interaction.reply({
            content,
            ephemeral: true,
        })

    interaction.location = interaction.locale.replace(/-.+/i, '')

    return interaction
}

export function getRankOfMMR(mmr: number) {
    let rankName: keyof typeof RANK_NAMES
    let rankValue: string

    if (mmr >= 0 && mmr <= 499.99) {
        rankName = 'Iron'
        rankValue = ['I', 'II', 'III', 'IV'][mmr < 150 ? 0 : mmr < 300 ? 1 : mmr < 450 ? 2 : 3]
    }

    if (mmr >= 500 && mmr <= 999.99) {
        rankName = 'Bronze'
        rankValue = ['I', 'II', 'III', 'IV'][mmr < 650 ? 0 : mmr < 800 ? 1 : mmr < 950 ? 2 : 3]
    }

    if (mmr >= 1000 && mmr <= 1499.99) {
        rankName = 'Silver'
        rankValue = ['I', 'II', 'III', 'IV'][mmr < 1150 ? 3 : mmr < 1300 ? 2 : mmr < 1450 ? 1 : 0]
    }

    if (mmr >= 1500 && mmr <= 1999.99) {
        rankName = 'Gold'
        rankValue = ['I', 'II', 'III', 'IV'][mmr < 1650 ? 3 : mmr < 1800 ? 2 : mmr < 1950 ? 1 : 0]
    }

    if (mmr >= 2000 && mmr <= 2499.99) {
        rankName = 'Platinum'
        rankValue = ['I', 'II', 'III', 'IV'][mmr < 2150 ? 3 : mmr < 2300 ? 2 : mmr < 2450 ? 1 : 0]
    }

    if (mmr >= 2500 && mmr <= 2999.99) {
        rankName = 'Diamond'
        rankValue = ['I', 'II', 'III', 'IV'][mmr < 2650 ? 3 : mmr < 2800 ? 2 : mmr < 2950 ? 1 : 0]
    }

    if (mmr >= 3000 && mmr <= 3499.99) rankName = 'Master'
    if (mmr >= 3500 && mmr <= 3999.99) rankName = 'Grandmaster'
    if (mmr > 4000) rankName = 'Challenger'

    const rankIcon = join(__dirname, '..', 'resources', `Season_2022_-_${rankName!}.webp`)

    return { rankName: rankName!, rankValue: rankValue!, rankIcon }
}
