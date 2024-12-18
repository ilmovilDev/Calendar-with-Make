import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources";
import { messagesSpanish } from "~/utils";

export type ChatCompletion = {
    messages: ChatCompletionMessageParam[];
    prompt: string;
    model?: string;
};

export class OpenAIService {
    private openAIClient: OpenAI;
    private readonly defaultModel: string;

    constructor(apiKey: string, defaultModel: string) {
        this.validateApiKey(apiKey);
        this.openAIClient = new OpenAI({ apiKey, timeout: 15000 });
        this.defaultModel = defaultModel;
    }

    /**
     * Creates a chat completion based on the provided parameters.
     * @param params - Parameters for the chat completion
     * @returns The response content or a default message
     */
    async chatCompletion({
        messages,
        prompt,
        model,
    }: ChatCompletion): Promise<string> {
        try {
            const completion = await this.openAIClient.chat.completions.create({
                model: model || this.defaultModel,
                messages: [
                    { role: "system", content: prompt },
                    ...messages,
                ],
                temperature: 0,
                max_tokens: 326,
                top_p: 0,
                frequency_penalty: 0,
                presence_penalty: 0,
            });
            const answer = completion.choices[0]?.message?.content || "No content available.";
            return answer;
        } catch (error) {
            console.error("[OpenAIService] Error in generateChatCompletion:", error);
            throw new Error(messagesSpanish.GENERIC_ERROR_MESSAGE);
        }
    }

    /**
     * Validates the provided API key.
     * @param apiKey - The API key to validate
     * @throws Error if the API key is invalid or missing
     */
    private validateApiKey(apiKey: string): void {
        if (!apiKey || apiKey.trim().length === 0) {
            console.error("[OpenAIService] Invalid API key provided.");
            throw new Error(messagesSpanish.GENERIC_ERROR_MESSAGE);
        }
    }
}
