'use server';
/**
 * @fileOverview An AI agent to translate a question and its parts into a specified language.
 *
 * - translateQuestion - A function that handles translating question content.
 * - TranslateQuestionInput - The input type for the translateQuestion function.
 * - TranslateQuestionOutput - The return type for the translateQuestion function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import translate from 'google-translate-api-browser';

// Define the response type for the translation
interface TranslationResponse {
  text: string;
  from: {
    language: {
      didYouMean: boolean;
      iso: string;
    };
    text: {
      autoCorrected: boolean;
      value: string;
      didYouMean: boolean;
    };
  };
}

const TranslateQuestionInputSchema = z.object({
  question: z.string().describe('The question text to translate.'),
  options: z.array(z.string()).describe('The multiple-choice options to translate.'),
  answer: z.string().describe('The correct answer text to translate.'),
  language: z.string().describe('The target language for translation (e.g., "French", "Yoruba", "Hausa", "Igbo").'),
});
export type TranslateQuestionInput = z.infer<typeof TranslateQuestionInputSchema>;

const TranslateQuestionOutputSchema = z.object({
  translatedQuestion: z.string().describe('The translated question text.'),
  translatedOptions: z.array(z.string()).describe('The translated multiple-choice options.'),
  translatedAnswer: z.string().describe('The translated correct answer text.'),
  error: z.string().optional().describe('An error message if translation failed.'),
});
export type TranslateQuestionOutput = z.infer<typeof TranslateQuestionOutputSchema>;

export async function translateQuestion(input: TranslateQuestionInput): Promise<TranslateQuestionOutput> {
  return translateQuestionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'translateQuestionPrompt',
  input: { schema: TranslateQuestionInputSchema },
  output: { schema: TranslateQuestionOutputSchema },
  prompt: `You are a professional translator. Translate the following educational content into {{{language}}}.

Original Question: {{{question}}}
Options: 
{{#each options}}
- {{{this}}}
{{/each}}
Answer: {{{answer}}}

Provide the translations for the question, each option, and the answer. Ensure the translations are accurate and maintain the educational context.
`,
});

const translateQuestionFlow = ai.defineFlow(
  {
    name: 'translateQuestionFlow',
    inputSchema: TranslateQuestionInputSchema,
    outputSchema: TranslateQuestionOutputSchema,
  },
  async (input) => {
    try {
      // First, try to use the Genkit AI for translation
      const { output } = await prompt(input);
      if (output?.translatedQuestion) {
        return output;
      }
      throw new Error("AI translation failed to produce output.");
    } catch (aiError) {
      console.warn('AI translation failed, falling back to basic translation:', aiError);
      try {
        // Map language names to their corresponding language codes
        const languageMap: Record<string, string> = {
          'hausa': 'ha',
          'yoruba': 'yo',
          'igbo': 'ig',
          'french': 'fr',
          'spanish': 'es',
          'english': 'en'
        };
        
        // Get the language code, defaulting to the first 2 letters if not in the map
        const targetLang = languageMap[input.language.toLowerCase()] || 
                          input.language.substring(0, 2).toLowerCase();
        
        console.log(`Translating to ${targetLang} (${input.language})`);
        
        const [tQuestion, tAnswer, ...tOptions] = await Promise.all([
            translate(input.question, { to: targetLang })
              .then((res: TranslationResponse) => res.text)
              .catch((error: Error) => {
                console.error('Error translating question:', error);
                return input.question;
              }),
              
            translate(input.answer, { to: targetLang })
              .then((res: TranslationResponse) => res.text)
              .catch((error: Error) => {
                console.error('Error translating answer:', error);
                return input.answer;
              }),
              
            ...input.options.map(opt => 
              translate(opt, { to: targetLang })
                .then((res: TranslationResponse) => res.text)
                .catch((error: Error) => {
                  console.error('Error translating option:', error);
                  return opt;
                })
            )
        ]);

        return {
          translatedQuestion: tQuestion,
          translatedOptions: tOptions,
          translatedAnswer: tAnswer,
        };

      } catch (fallbackError) {
         console.error('Fallback translation also failed:', fallbackError);
         return {
            translatedQuestion: input.question,
            translatedOptions: input.options,
            translatedAnswer: input.answer,
            error: 'The translation service is currently unavailable. Please try again later.'
        }
      }
    }
  }
);
