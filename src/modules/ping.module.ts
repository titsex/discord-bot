import PingCommand from '@command/ping.command'
import PingAnswer from '@answer/ping.answer'

import { ICommand } from '@types'

const PingModule: ICommand = {
    data: PingCommand,
    execute: async (interaction) => {
        const total = Date.now() - +interaction.createdAt

        return interaction.send(PingAnswer[interaction.location ?? 'en'].replace('{arg}', `${total}`))
    },
}

export default PingModule
