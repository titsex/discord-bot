import { IAnswer } from '@types'

interface IResumeAnswerTranslation {
    success: string
    error: string
}

type IResumeAnswer = IAnswer & {
    [key: string]: IResumeAnswerTranslation
}

export default {
    ru: {
        success: 'Музыка возобновлена',
        error: 'Музыка итак играет',
    },
    en: {
        success: 'Music resumed',
        error: 'So the music is playing',
    },
} as IResumeAnswer
