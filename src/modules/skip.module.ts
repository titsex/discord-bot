import SkipCommand from '@command/skip.command'
import SkipAnswer from '@answer/skip.answer'

import { ICommand } from '@types'
import { client } from '@index'

const SkipModule: ICommand = {
    data: SkipCommand,
    type: 'music',
    execute: async (interaction) => {
        try {
            await client.distube.skip(interaction.guildId!)
            await interaction.send(SkipAnswer[interaction.location ?? 'en'].success)
        } catch {
            await interaction.send(SkipAnswer[interaction.location ?? 'en'].error)
        }
    },
}

export default SkipModule
