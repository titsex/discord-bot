import { formatDuration, Queue, Song } from 'distube'
import { EmbedBuilder, TextChannel } from 'discord.js'
import { messages } from '@index'

export default async function (queue: Queue, song: Song) {
    const channel = queue.textChannel as unknown as TextChannel

    const tag = song.user?.tag || `${song.member?.user.username}#${song.member?.user.discriminator}`

    const embed = new EmbedBuilder()
        .setTitle(`Играет трек от ${tag}`)
        .setColor('Random')
        .addFields([
            {
                name: 'Название',
                value: song.name!,
                inline: false,
            },
            {
                name: 'Длительность',
                value: formatDuration(song.duration),
                inline: true,
            },
        ])

    if (song.thumbnail) embed.setThumbnail(song.thumbnail)

    const savedMessageId = messages.get(channel.guildId)
    if (savedMessageId) return await channel.messages.edit(savedMessageId, { embeds: [embed] })

    const sentMessage = await channel.send({ embeds: [embed] })
    messages.set(channel.guildId, sentMessage.id)
}
