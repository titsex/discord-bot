import ResumeCommand from '@command/resume.command'
import ResumeAnswer from '@answer/resume.answer'

import { ICommand } from '@types'
import { client } from '@index'

const ResumeModule: ICommand = {
    data: ResumeCommand,
    type: 'music',
    execute: async (interaction) => {
        try {
            await client.distube.resume(interaction.guildId!)
            await interaction.send(ResumeAnswer[interaction.location ?? 'en'].success)
        } catch {
            await interaction.send(ResumeAnswer[interaction.location ?? 'en'].error)
        }
    },
}

export default ResumeModule
