import { IAnswer } from '@types'

interface IAniFindAnswerTranslation {
    incorrect: string
    error: string
    warning: string
    similarity: string
}

type IAniFindAnswer = IAnswer & {
    [key: string]: IAniFindAnswerTranslation
}

export default {
    ru: {
        incorrect: 'Неверный тип файла',
        error: 'Не удалось найти аниме по вашей сцене',
        warning: 'Результат может быть не точным',
        similarity: `Сходство {arg}`,
    },
    en: {
        incorrect: 'Incorrect file type',
        error: "Couldn't find anime on your scene",
        warning: 'The result may not be accurate',
        similarity: `Similarity {arg}`,
    },
} as IAniFindAnswer
