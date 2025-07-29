// src/ai/flows/generate-explanation.ts
'use server';
/**
 * @fileOverview Generates a clear, concise, and easy-to-understand AI-powered explanation after a student answers a question.
 *
 * - generateExplanation - A function that generates an AI explanation for a question.
 * - GenerateExplanationInput - The input type for the generateExplanation function.
 * - GenerateExplanationOutput - The return type for the generateExplanation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateExplanationInputSchema = z.object({
  question: z.string().describe('The question that was asked.'),
  answer: z.string().describe('The answer selected by the student.'),
  isCorrect: z.boolean().describe('Whether the answer was correct or not.'),
});
export type GenerateExplanationInput = z.infer<typeof GenerateExplanationInputSchema>;

const GenerateExplanationOutputSchema = z.object({
  explanation: z.string().describe('The AI-generated explanation of the answer.'),
});
export type GenerateExplanationOutput = z.infer<typeof GenerateExplanationOutputSchema>;

export async function generateExplanation(input: GenerateExplanationInput): Promise<GenerateExplanationOutput> {
  return generateExplanationFlow(input);
}

const generateExplanationPrompt = ai.definePrompt({
  name: 'generateExplanationPrompt',
  input: {schema: GenerateExplanationInputSchema},
  output: {schema: GenerateExplanationOutputSchema},
  prompt: `You are an AI tutor. A student selected this answer to a WAEC question. Is it right or wrong? Explain why, in under 50 words, using simple terms.\n\nQuestion: {{{question}}}\nAnswer: {{{answer}}}\nCorrect: {{{isCorrect}}}`,
});

const generateExplanationFlow = ai.defineFlow(
  {
    name: 'generateExplanationFlow',
    inputSchema: GenerateExplanationInputSchema,
    outputSchema: GenerateExplanationOutputSchema,
  },
  async input => {
    const {output} = await generateExplanationPrompt(input);
    return output!;
  }
);
