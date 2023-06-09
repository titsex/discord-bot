import { CustomInteraction, ICommand } from '@types'
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
