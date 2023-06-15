import MmrCommand from '@command/mmr.command'
import MmrAnswer from '@answer/mmr.answer'
import axios from 'axios'

import { ICommand, MMR_CODES, RANK_NAMES } from '@types'
import { getRankOfMMR } from '@utils'
import { AttachmentBuilder, EmbedBuilder } from 'discord.js'

const MmrModule: ICommand = {
    data: MmrCommand,
    execute: async (interaction) => {
        await interaction.deferReply()

        const server = interaction.options.getString('server', true)
        const nickname = interaction.options.getString('nickname', true)
        const mode = interaction.options.getString('mode', true) as unknown as MMR_CODES

        try {
            const params = `${server}/${encodeURI(nickname)}/${MMR_CODES[mode]}`

            const response = await axios.get(`https://api.mylolmmr.com/api/mmr/${params}`, {
                headers: {
                    Referer: 'https://mylolmmr.com/',
                },
            })

            const { name, mmr } = response.data
            const { rankName, rankValue, icon } = getRankOfMMR(mmr)

            const title = MmrAnswer[interaction.location ?? 'en'].title
                .replace('{arg}', name)
                .replace('{arg1}', `${Math.round(mmr)}`)

            const description = MmrAnswer[interaction.location ?? 'en'].description.replace(
                '{arg}',
                `${interaction.location !== 'ru' ? rankName : RANK_NAMES[rankName]} ${rankValue ?? ''}`.trim()
            )

            const file = new AttachmentBuilder(icon)

            const embed = new EmbedBuilder()
                .setTitle(title)
                .setDescription(description)
                .setImage(`attachment://${rankName}.webp`)

            return await interaction.editReply({ files: [file], embeds: [embed] })
        } catch {
            await interaction.editReply({ content: MmrAnswer[interaction.location ?? 'en'].error })
        }
    },
}

export default MmrModule
