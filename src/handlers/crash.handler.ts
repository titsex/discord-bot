import { Logger } from '@class/Logger'

export default async function (error: Error) {
    Logger.error(error)
}
