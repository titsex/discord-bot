import { IAnswer } from '@types'

interface ICatAnswerTranslation {
    error: string
}

type ICatAnswer = IAnswer & {
    [key: string]: ICatAnswerTranslation
}

export default {
    ru: {
        error: 'Не удалось сгенерировать гифку',
    },
    en: {
        error: 'Failed to generate a gif',
    },
} as ICatAnswer
