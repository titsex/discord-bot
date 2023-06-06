import { IAnswer } from '@types'

interface IVolumeAnswerTranslation {
    incorrect: string
    success: string
    error: string
}

type IVolumeAnswer = IAnswer & {
    [key: string]: IVolumeAnswerTranslation
}

export default {
    ru: {
        incorrect: 'Громкость музыки не может быть меньше нуля или больше ста процентов',
        success: 'Громкость музыки изменена',
        error: 'Не удалось изменить громкость музыки',
    },
    en: {
        incorrect: 'The music volume cannot be less than zero or more than one hundred percent',
        success: 'Music volume changed',
        error: "Couldn't change music volume",
    },
} as IVolumeAnswer
