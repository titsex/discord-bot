import { CustomInteraction, ICommand } from '@types'
import { extendInteraction } from '@utils'
import { Interaction } from 'discord.js'
import { client, volumes } from '@index'

export default function (commands: ICommand[]) {
    return async (interaction: Interaction): Promise<any> => {
        if (!interaction.isChatInputCommand()) return

        const context = await extendInteraction(interaction as CustomInteraction)
        const command = commands.find((item) => item.data.name === interaction.commandName)

        if (command) {
            if (command.type === 'music') {
                const member = 'voice' in interaction.member! ? interaction.member : null

                if (!member || !member?.voice.channel) {
                    return await context.send(
                        interaction.locale === 'ru'
                            ? 'Подключитесь к голосовому каналу'
                            : 'Connect to the voice channel'
                    )
                }

                const bot = await client.distube.getQueue(context.guildId!)

                if (bot?.voice.channelId && bot?.voice.channelId !== member.voice.channelId) {
                    return await context.send(interaction.locale === 'ru' ? 'Бот не с вами' : 'The bot is not with you')
                }

                return await command.execute(context, member)
            }

            await command.execute(context)
        }
    }
}
