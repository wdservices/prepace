'use server';
/**
 * @fileOverview An AI agent to answer follow-up questions on a specific subject.
 *
 * - answerFollowUpQuestion - A function that handles answering follow-up questions.
 * - AnswerFollowUpQuestionInput - The input type for the answerFollowUpQuestion function.
 * - AnswerFollowUpQuestionOutput - The return type for the answerFollowUpQuestion function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnswerFollowUpQuestionInputSchema = z.object({
  subject: z.string().describe('The subject of the question (e.g., Chemistry, Biology).'),
  question: z.string().describe('The follow-up question from the student.'),
});
export type AnswerFollowUpQuestionInput = z.infer<typeof AnswerFollowUpQuestionInputSchema>;

const AnswerFollowUpQuestionOutputSchema = z.object({
  answer: z.string().describe('The AI-generated answer to the follow-up question.'),
});
export type AnswerFollowUpQuestionOutput = z.infer<typeof AnswerFollowUpQuestionOutputSchema>;

export async function answerFollowUpQuestion(input: AnswerFollowUpQuestionInput): Promise<AnswerFollowUpQuestionOutput> {
  return answerFollowUpQuestionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'answerFollowUpQuestionPrompt',
  input: {schema: AnswerFollowUpQuestionInputSchema},
  output: {schema: AnswerFollowUpQuestionOutputSchema},
  prompt: `You are an AI tutor specializing in {{{subject}}}. A student has asked the following follow-up question:

{{{question}}}

Provide a clear, concise, and easy-to-understand answer.
`,
});

const answerFollowUpQuestionFlow = ai.defineFlow(
  {
    name: 'answerFollowUpQuestionFlow',
    inputSchema: AnswerFollowUpQuestionInputSchema,
    outputSchema: AnswerFollowUpQuestionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
