import { IAnswer } from '@types'

interface IAniFindAnswerTranslation {
    incorrect: string
    error: string
}

type IAniFindAnswer = IAnswer & {
    [key: string]: IAniFindAnswerTranslation
}

export default {
    ru: {
        incorrect: 'Неверный тип файла',
        error: 'Не удалось найти аниме по вашей сцене',
    },
    en: {
        incorrect: 'Incorrect file type',
        error: "Couldn't find anime on your scene",
    },
} as IAniFindAnswer
