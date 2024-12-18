import { createBot } from '@builderbot/bot';
import { envConfig } from './config';
import templates from './templates';
import { provider } from './provider';
import { database } from './database';

const PORT = envConfig().port;

const main = async () => {
    const { handleCtx, httpServer } = await createBot({
        flow: templates,
        provider,
        database,
    })
    httpServer(Number(PORT))
}

main()