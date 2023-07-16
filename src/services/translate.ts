import { ChatCompletionRequestMessageRoleEnum, Configuration, OpenAIApi } from 'openai'
import { SUPPORTED_LANGUAGES } from '../constant';
import { type FromLanguage, type Language } from '../types';

//no publicar esto ya que la api key se colar'a al publico, esto se haria en el back

const apiKey = import.meta.env.VITE_OPENAI_AI_KEY;

const configuration = new Configuration ({ apiKey})

const openai = new OpenAIApi(configuration)

export async function translate ({
    fromLanguage,
    toLanguage,
    text
}:  {
    fromLanguage: FromLanguage
    toLanguage: Language
    text: string

}) {
    const messages = [
        {
            role: ChatCompletionRequestMessageRoleEnum.System,
            content: 'You are a AI that translate text. You receie a text from the user. Do not answer, just translate the text. The original language is surrounded by  `{{ ` and `}}`. You can recive {{auto}} which means that you have to detec the language. You can translate to any language. The language you translate to is surrounded by `[[` and `]]`.'
        
        }, 
        {
            role: ChatCompletionRequestMessageRoleEnum.User,
            content: 'Hola mundo {{ Español }}  [[English]]'
        },
        {
            role: ChatCompletionRequestMessageRoleEnum.Assistant,
            content: 'Hello world'
        },
        {
            role: ChatCompletionRequestMessageRoleEnum.User,
            content: 'How are you? {{ auto }}  [[Deutsch]]'

        },
        {
            role: ChatCompletionRequestMessageRoleEnum.Assistant,
            content: 'Wie geht es dir?'
        },
        {
            role: ChatCompletionRequestMessageRoleEnum.User,
            content: 'Gutten Tag {{ auto }}  [[Italian]]'

        },
        {
            role: ChatCompletionRequestMessageRoleEnum.Assistant,
            content: 'Buongiorno'
        },

    ]


    const fromCode = fromLanguage == 'auto' ? 'auto' : SUPPORTED_LANGUAGES[fromLanguage]
    const toCode = SUPPORTED_LANGUAGES[toLanguage]

    const completion = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [
            ...messages,
            {
                role: ChatCompletionRequestMessageRoleEnum.User,
                content: `${text} {{${fromCode}}} [[${toCode}]]`
            }
        ]
    })

    return completion.data.choices[0]?.message?.content
}

