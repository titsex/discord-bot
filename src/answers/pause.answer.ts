import { IAnswer } from '@types'

interface IPauseAnswerTranslation {
    success: string
    error: string
}

type IPauseAnswer = IAnswer & {
    [key: string]: IPauseAnswerTranslation
}

export default {
    ru: {
        success: 'Музыка приостановлена',
        error: 'Музыка уже стоит на паузе',
    },
    en: {
        success: 'Music paused',
        error: 'The music is already on pause',
    },
} as IPauseAnswer
