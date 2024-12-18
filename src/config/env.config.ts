import "dotenv/config";

type EnvConfig = {
    port: string;
    open_ai_model: string;
    open_api_key: string;
}

const getEnvVar = (
    key: string, 
    isRequired: boolean = true
): string | undefined => {
    const value = process.env[key];
    if (isRequired && (!value || value.trim() === "")) {
        throw new Error(`Environment variable ${key} is required but was not provided.`);
    }
    return value;
};

export const envConfig = (): EnvConfig => {

    const PORT = getEnvVar("PORT", false) ?? "3001";
    const OPEN_AI_MODEL = getEnvVar("OPEN_AI_MODEL");
    const OPENAI_API_KEY = getEnvVar("OPENAI_API_KEY");

    return {
        // Global
        port: PORT,
        // OpenAI
        open_ai_model: OPEN_AI_MODEL,
        open_api_key: OPENAI_API_KEY,
    }
}