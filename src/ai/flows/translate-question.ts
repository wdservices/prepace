'use server';
/**
 * @fileOverview An AI agent to translate a question and its parts into a specified language.
 *
 * - translateQuestion - A function that handles translating question content.
 * - TranslateQuestionInput - The input type for the translateQuestion function.
 * - TranslateQuestionOutput - The return type for the translateQuestion function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

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
    const { output } = await prompt(input);
    return output!;
  }
);
