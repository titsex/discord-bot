import PauseCommand from '@command/pause.command'
import PauseAnswer from '@answer/pause.answer'

import { ICommand } from '@types'
import { client } from '@index'

const PauseModule: ICommand = {
    data: PauseCommand,
    type: 'music',
    execute: async (interaction) => {
        try {
            await client.distube.pause(interaction.guildId!)
            await interaction.send(PauseAnswer[interaction.location ?? 'en'].success)
        } catch {
            await interaction.send(PauseAnswer[interaction.location ?? 'en'].error)
        }
    },
}

export default PauseModule
