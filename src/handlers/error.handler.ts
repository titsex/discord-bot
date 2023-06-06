import { GuildTextBasedChannel } from 'discord.js'
import { client, messages } from '@index'
import { Logger } from '@class/Logger'

export default async function (channel: GuildTextBasedChannel | undefined, error: Error) {
    await client.distube.stop(channel!.guildId)

    messages.delete(channel!.guildId)

    Logger.error(error)
    return await channel!.send(`Произошла ошибка при проигрывании мызки`)
}
