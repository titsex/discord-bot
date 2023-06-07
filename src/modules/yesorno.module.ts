import YesOrNoCommand from '@command/yesorno.command'
import YesOrNoAnswer from '@answer/yesorno.answer'
import GifAnswer from '@answer/gif.answer'
import axios from 'axios'

import { ICommand } from '@types'
import { EmbedBuilder } from 'discord.js'

const YesOrNoModule: ICommand = {
    data: YesOrNoCommand,
    execute: async (interaction) => {
        await interaction.deferReply()

        try {
            const response = await axios.get(process.env.YES_OR_NO_API_URL!)
            const question = interaction.options.getString('question', false)

            if (question) {
                const embed = new EmbedBuilder()
                    .setTitle(YesOrNoAnswer[interaction.location ?? 'en'].replace('{arg}', interaction.user.tag))
                    .setDescription(question)
                    .setImage(response.data.image)

                return await interaction.editReply({ embeds: [embed] })
            }

            return await interaction.editReply({
                files: [response.data.image],
            })
        } catch (error) {
            console.log(error)
            await interaction.editReply({ content: GifAnswer[interaction.location ?? 'en'].error })
        }
    },
}

export default YesOrNoModule
