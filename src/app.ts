import { createBot } from '@builderbot/bot';
import { envConfig } from './config';
import templates from './templates';
import { provider } from './provider';
import { database } from './database';
import { OpenAIService } from './services';

const PORT = envConfig().port;
const openaiApiKey = envConfig().open_api_key
const openAiModel = envConfig().open_ai_model
const openai = new OpenAIService(openaiApiKey, openAiModel)

const main = async () => {
    const { handleCtx, httpServer } = await createBot({
        flow: templates,
        provider,
        database,
    }, { extensions: { openai } })
    httpServer(Number(PORT))
}

main()