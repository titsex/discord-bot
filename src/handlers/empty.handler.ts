import { EmbedBuilder, TextChannel } from 'discord.js'
import { messages } from '@index'
import { Queue } from 'distube'

export default async function (queue: Queue) {
    const channel = queue.textChannel as TextChannel

    const savedMessageId = messages.get(channel.guildId)
    if (savedMessageId) await channel.messages.delete(savedMessageId)

    messages.delete(channel.guildId)

    const embed = new EmbedBuilder()
        .setTitle('Спасибо за прослушивание')
        .setDescription('Все покинули голосовой канал, некому проигрывать музыку')
        .setColor('Random')

    return await channel.send({ embeds: [embed] })
}
