import AniFindCommand from '@command/anifind.command'
import AniFindAnswer from '@answer/anifind.answer'

import { ICommand } from '@types'
import { client } from '@index'
import { EmbedBuilder } from 'discord.js'
import { Result } from 'moe-api/dist/esm/interface'
import { AniList } from 'moe-api/dist/cjs/interface'
import { formatDuration } from 'distube'

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

            const episode = anime.episode ? `${anime.episode} episode, ` : ''
            const title = anilist.title.english ?? anilist.title.romaji ?? anilist.title.native

            let time = formatDuration(anime.from)
            if (anime.to !== anime.from) time += ` - ${formatDuration(anime.to)}`

            let similarity: string | number = Math.round(anime.similarity * 100)
            similarity = AniFindAnswer[interaction.location ?? 'en'].similarity.replace('{arg}', `${similarity}%`)

            const embed = new EmbedBuilder()

            if (title) embed.setTitle(title)
            if (anime?.image) embed.setImage(anime.image)

            embed.setDescription(`${episode}${time}`.trim())
            embed.setFooter({ text: `${AniFindAnswer[interaction.location ?? 'en'].warning}\n${similarity}` })
            embed.setThumbnail(argument.url)

            return await interaction.editReply({ embeds: [embed] })
        } catch {
            return await interaction.editReply(AniFindAnswer[interaction.location ?? 'en'].error)
        }
    },
}

export default PlayModule
