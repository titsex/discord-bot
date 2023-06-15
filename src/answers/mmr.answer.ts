import { IAnswer } from '@types'

interface ICatAnswerTranslation {
    error: string
    title: string
    description: string
}

type ICatAnswer = IAnswer & {
    [key: string]: ICatAnswerTranslation
}

export default {
    ru: {
        error: 'Не удалось получить Ваш ММР, проверьте никнейм и сервер',
        title: 'ММР {arg} - {arg1}',
        description: `Средний ранг врагов - {arg}`,
    },
    en: {
        error: "Couldn't get your MMR, check the nickname and the server",
        title: '{arg} MMR is {arg1}',
        description: 'Average enemy rank - {arg}',
    },
} as ICatAnswer
