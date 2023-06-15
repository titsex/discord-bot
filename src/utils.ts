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

    switch (true) {
        case mmr >= 0 && mmr <= 149.99:
            rankName = 'Iron'
            rankValue = 'IV'
            break
        case mmr >= 150 && mmr <= 299.99:
            rankName = 'Iron'
            rankValue = 'III'
            break
        case mmr >= 300 && mmr <= 449.99:
            rankName = 'Iron'
            rankValue = 'II'
            break
        case mmr >= 450 && mmr <= 499.99:
            rankName = 'Iron'
            rankValue = 'I'
            break
        case mmr >= 500 && mmr <= 649.99:
            rankName = 'Bronze'
            rankValue = 'IV'
            break
        case mmr >= 650 && mmr <= 799.99:
            rankName = 'Bronze'
            rankValue = 'III'
            break
        case mmr >= 800 && mmr <= 949.99:
            rankName = 'Bronze'
            rankValue = 'II'
            break
        case mmr >= 950 && mmr <= 999.99:
            rankName = 'Bronze'
            rankValue = 'I'
            break
        case mmr >= 1000 && mmr <= 1149.99:
            rankName = 'Silver'
            rankValue = 'IV'
            break
        case mmr >= 1150 && mmr <= 1299.99:
            rankName = 'Silver'
            rankValue = 'III'
            break
        case mmr >= 1300 && mmr <= 1449.99:
            rankName = 'Silver'
            rankValue = 'II'
            break
        case mmr >= 1450 && mmr <= 1499.99:
            rankName = 'Silver'
            rankValue = 'I'
            break
        case mmr >= 1500 && mmr <= 1649.99:
            rankName = 'Gold'
            rankValue = 'IV'
            break
        case mmr >= 1650 && mmr <= 1799.99:
            rankName = 'Gold'
            rankValue = 'III'
            break
        case mmr >= 1800 && mmr <= 1949.99:
            rankName = 'Gold'
            rankValue = 'II'
            break
        case mmr >= 1950 && mmr <= 1999.99:
            rankName = 'Gold'
            rankValue = 'I'
            break
        case mmr >= 2000 && mmr <= 2149.99:
            rankName = 'Palatine'
            rankValue = 'IV'
            break
        case mmr >= 2150 && mmr <= 2299.99:
            rankName = 'Palatine'
            rankValue = 'III'
            break
        case mmr >= 2300 && mmr <= 2449.99:
            rankName = 'Palatine'
            rankValue = 'II'
            break
        case mmr >= 2450 && mmr <= 2499.99:
            rankName = 'Palatine'
            rankValue = 'II'
            break
        case mmr >= 2500 && mmr <= 2649.99:
            rankName = 'Diamond'
            rankValue = 'IV'
            break
        case mmr >= 2650 && mmr <= 2799.99:
            rankName = 'Diamond'
            rankValue = 'III'
            break
        case mmr >= 2800 && mmr <= 2949.99:
            rankName = 'Diamond'
            rankValue = 'II'
            break
        case mmr >= 2950 && mmr <= 2999.99:
            rankName = 'Diamond'
            rankValue = 'I'
            break
        case mmr >= 3000 && mmr <= 3499.99:
            rankName = 'Master'
            break
        case mmr >= 3500 && mmr <= 3999.99:
            rankName = 'Grandmaster'
            break
        case mmr > 4000:
            rankName = 'Challenger'
            break
    }

    const rankIcon = join(__dirname, '..', 'resources', `Season_2022_-_${rankName!}.webp`)

    return { rankName: rankName!, rankValue: rankValue!, icon: rankIcon }
}
