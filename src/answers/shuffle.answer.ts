import { IAnswer } from '@types'

interface IShuffleAnswerTranslation {
    success: string
    error: string
}

type IShuffleAnswer = IAnswer & {
    [key: string]: IShuffleAnswerTranslation
}

export default {
    ru: {
        success: 'Перемешал всю музыку из очереди',
        error: 'Не удалось перемешать список музыки',
    },
    en: {
        success: 'Mixed all the music from the queue',
        error: "Couldn't shuffle the music list",
    },
} as IShuffleAnswer
