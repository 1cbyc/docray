import { OpenAIApi, Configuration } from 'openai';

const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(configuration);

export async function extractTerms(text: string) {
  const prompt = `Extract key contract terms from the following text: ${text}`;
  const response = await openai.createChatCompletion({
    model: 'gpt-4',
    messages: [{ role: 'user', content: prompt }],
  });
  return response.data.choices[0].message?.content;
}
