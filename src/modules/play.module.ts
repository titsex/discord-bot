import PlayCommand from '@command/play.command'
import PlayAnswer from '@answer/play.answer'

import { client, volumes } from '@index'
import { TextChannel } from 'discord.js'
import { ICommand } from '@types'

const PlayModule: ICommand = {
    data: PlayCommand,
    type: 'music',
    execute: async (interaction, member) => {
        const argument = interaction.options.getString('argument', true)

        await interaction.send(PlayAnswer[interaction.location ?? 'en'])

        await client.distube.play(member!.voice.channel!, argument, {
            member,
            textChannel: interaction.channel as TextChannel,
        })

        const volume = volumes.get(interaction.guildId!)
        if (volume) client.distube.setVolume(interaction.guildId!, volume)
    },
}

export default PlayModule
