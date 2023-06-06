import ShuffleCommand from '@command/shuffle.command'
import ShuffleAnswer from '@answer/shuffle.answer'

import { ICommand } from '@types'
import { client } from '@index'

const ShuffleModule: ICommand = {
    data: ShuffleCommand,
    type: 'music',
    execute: async (interaction) => {
        try {
            await client.distube.shuffle(interaction.guildId!)
            await interaction.send(ShuffleAnswer[interaction.location ?? 'en'].success)
        } catch {
            await interaction.send(ShuffleAnswer[interaction.location ?? 'en'].error)
        }
    },
}

export default ShuffleModule
