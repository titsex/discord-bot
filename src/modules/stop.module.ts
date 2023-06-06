import StopCommand from '@command/stop.command'
import StopAnswer from '@answer/stop.answer'

import { client, messages } from '@index'
import { ICommand } from '@types'

const StopModule: ICommand = {
    data: StopCommand,
    type: 'music',
    execute: async (interaction) => {
        const savedMessageId = messages.get(interaction.guildId!)

        if (savedMessageId) {
            await interaction.channel!.messages.delete(savedMessageId)
            messages.delete(interaction.guildId!)
        }

        await interaction.send(StopAnswer[interaction.location])
        await client.distube.stop(interaction.guildId!)
    },
}

export default StopModule
