import CatCommand from '@command/cat.command'
import GifAnswer from '@answer/gif.answer'

import { ICommand } from '@types'

const CatModule: ICommand = {
    data: CatCommand,
    execute: async (interaction) => {
        await interaction.deferReply()

        try {
            await interaction.editReply({ files: [`${process.env.CAT_SERVICE_API_URL}/cat/gif.gif`] })
        } catch {
            await interaction.editReply({ content: GifAnswer[interaction.location ?? 'en'].error })
        }
    },
}

export default CatModule
