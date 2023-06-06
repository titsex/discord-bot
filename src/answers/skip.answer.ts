import { IAnswer } from '@types'

interface ISkipAnswerTranslation {
    success: string
    error: string
}

type ISkipAnswer = IAnswer & {
    [key: string]: ISkipAnswerTranslation
}

export default {
    ru: {
        success: 'Музыка пропущена',
        error: 'Эта музыка последняя в очереди',
    },
    en: {
        success: 'Music skipped',
        error: 'This music is the last in line',
    },
} as ISkipAnswer
