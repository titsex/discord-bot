import AniFindCommand from '@command/anifind.command'
import AniFindAnswer from '@answer/anifind.answer'

import { ICommand } from '@types'
import { client } from '@index'
import { EmbedBuilder } from 'discord.js'
import { Result } from 'moe-api/dist/esm/interface'
import { AniList } from 'moe-api/dist/cjs/interface'

const PlayModule: ICommand = {
    data: AniFindCommand,
    execute: async (interaction) => {
        await interaction.deferReply()

        const argument = interaction.options.getAttachment('scene', true)

        if (!['image/png', 'image/jpeg'].includes(argument.contentType!))
            return await interaction.editReply(AniFindAnswer[interaction.location ?? 'en'].incorrect)

        try {
            const response = await client.moe.traceFromUrl(argument.url)

            const anime = (response as Result).result[0]
            const anilist = anime.anilist as AniList

            const embed = new EmbedBuilder()
                .setTitle(anilist.title.english)
                .setDescription(`${anime.episode} episode`)
                .setImage(anime.image)

            return await interaction.editReply({ embeds: [embed] })
        } catch (error) {
            return await interaction.editReply(AniFindAnswer[interaction.location ?? 'en'].error)
        }
    },
}

export default PlayModule
