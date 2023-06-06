import VolumeCommand from '@command/volume.command'
import VolumeAnswer from '@answer/volume.answer'

import { ICommand } from '@types'
import { client, volumes } from '@index'

const VolumeModule: ICommand = {
    data: VolumeCommand,
    type: 'music',
    execute: async (interaction) => {
        const percent = interaction.options.getNumber('percent', true)

        if (percent > 100 || percent < 0) return interaction.send(VolumeAnswer[interaction.location ?? 'en'].incorrect)
        volumes.set(interaction.guildId!, percent)

        try {
            await client.distube.setVolume(interaction.guildId!, percent)
            await interaction.send(VolumeAnswer[interaction.location ?? 'en'].success)
        } catch {
            await interaction.send(VolumeAnswer[interaction.location ?? 'en'].error)
        }
    },
}

export default VolumeModule
