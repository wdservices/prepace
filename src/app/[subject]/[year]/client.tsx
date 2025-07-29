
"use client";

import { useState, useMemo, useEffect } from "react";
import type { Question } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CheckCircle2, XCircle, Loader, MessageCircleQuestion, ArrowRight, Bot, Languages } from "lucide-react";
import { useProgress } from "@/hooks/use-progress";
import { generateExplanation } from "@/ai/flows/generate-explanation";
import { translateQuestion, TranslateQuestionOutput } from "@/ai/flows/translate-question";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ChatModal } from "@/components/ChatModal";
import { ProgressBar } from "@/components/ProgressBar";
import Link from "next/link";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


type QuestionClientPageProps = {
  subject: string;
  year: string;
  questions: Question[];
};

type TranslatedData = {
    question: string;
    options: string[];
    answer: string;
}

export function QuestionClientPage({ subject, year, questions }: QuestionClientPageProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [explanation, setExplanation] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { markAsCompleted, isCompleted } = useProgress();

  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [translatedData, setTranslatedData] = useState<TranslatedData | null>(null);
  const [isTranslating, setIsTranslating] = useState(false);

  const currentQuestion = useMemo(() => questions[currentQuestionIndex], [questions, currentQuestionIndex]);
  const isQuestionAnswered = selectedOption !== null;

  useEffect(() => {
    setSelectedLanguage('English');
    setTranslatedData(null);
  }, [currentQuestionIndex]);
  
  const handleAnswerSelect = async (option: string) => {
    if (isQuestionAnswered) return;

    const originalAnswer = currentQuestion.answer;
    const isAnswerCorrect = selectedLanguage === 'English' 
        ? option === originalAnswer
        : option === translatedData?.answer;

    setSelectedOption(option);
    setIsCorrect(isAnswerCorrect);
    setIsLoading(true);

    if (!isCompleted(subject, year, currentQuestion.id)) {
      markAsCompleted(subject, year, currentQuestion.id);
    }
    
    try {
      const result = await generateExplanation({
        question: currentQuestion.question,
        answer: originalAnswer, // Always send original answer to explanation
        isCorrect: isAnswerCorrect,
      });
      setExplanation(result.explanation);
    } catch (error) {
      console.error("Error fetching explanation:", error);
      setExplanation("Sorry, I couldn't fetch an explanation right now.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setIsCorrect(null);
    setExplanation(null);
    setIsLoading(false);
    setCurrentQuestionIndex((prev) => prev + 1);
  };
  
  const handleLanguageChange = async (language: string) => {
    if (language === 'English') {
        setTranslatedData(null);
        setSelectedLanguage('English');
        return;
    }

    setIsTranslating(true);
    setSelectedLanguage(language);
    try {
        const result = await translateQuestion({
            question: currentQuestion.question,
            options: currentQuestion.options,
            answer: currentQuestion.answer,
            language: language,
        });
        setTranslatedData({
            question: result.translatedQuestion,
            options: result.translatedOptions,
            answer: result.translatedAnswer
        });
    } catch (error) {
        console.error("Error translating question:", error);
        // Handle error state in UI if needed
    } finally {
        setIsTranslating(false);
    }
  };


  const progressPercentage = ((currentQuestionIndex) / questions.length) * 100;
  const displayQuestion = translatedData?.question || currentQuestion.question;
  const displayOptions = translatedData?.options || currentQuestion.options;

  if (currentQuestionIndex >= questions.length) {
    return (
        <main className="flex-1 container mx-auto p-4 md:p-8 flex flex-col items-center justify-center text-center">
            <Card className="w-full max-w-2xl">
                <CardHeader>
                    <CardTitle className="text-3xl font-headline">Session Complete!</CardTitle>
                    <CardDescription>You have answered all questions for {subject} {year}.</CardDescription>
                </CardHeader>
                <CardContent>
                    <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <p className="text-lg">Great work!</p>
                </CardContent>
                <CardFooter className="flex justify-center">
                    <Button asChild>
                        <Link href={`/${subject}`}>Choose another year</Link>
                    </Button>
                </CardFooter>
            </Card>
        </main>
    )
  }

  return (
    <main className="flex-1 container mx-auto p-4 md:p-8 flex flex-col items-center">
      <div className="w-full max-w-2xl">
        <ProgressBar value={progressPercentage} />
        <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground text-center my-2">
                Question {currentQuestionIndex + 1} of {questions.length}
            </p>
             <div className="w-48">
                <Select onValueChange={handleLanguageChange} value={selectedLanguage}>
                    <SelectTrigger className="w-full">
                        <Languages className="h-4 w-4 mr-2" />
                        <SelectValue placeholder="Language" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="English">English</SelectItem>
                        <SelectItem value="French">French</SelectItem>
                        <SelectItem value="Yoruba">Yoruba</SelectItem>
                        <SelectItem value="Hausa">Hausa</SelectItem>
                        <SelectItem value="Igbo">Igbo</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
      </div>
      <Card className="w-full max-w-2xl mt-4">
        <CardHeader>
          <CardTitle className="text-2xl font-headline leading-tight">
             {isTranslating ? <Loader className="animate-spin" /> : displayQuestion}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-3">
            {isTranslating ? (
                <div className="flex justify-center items-center">
                    <Loader className="animate-spin" />
                </div>
            ) : (displayOptions.map((option, index) => {
              const isSelected = selectedOption === option;
              const correctAnsw = translatedData?.answer || currentQuestion.answer;
              const isTheCorrectAnswer = option === correctAnsw;

              return (
                <Button
                  key={index}
                  variant="outline"
                  size="lg"
                  className={cn(
                    "h-auto w-full justify-start text-left py-3 whitespace-normal",
                    isSelected && isCorrect === true && "bg-green-100 border-green-500 text-green-800 hover:bg-green-200",
                    isSelected && isCorrect === false && "bg-red-100 border-red-500 text-red-800 hover:bg-red-200",
                    isQuestionAnswered && isTheCorrectAnswer && "bg-green-100 border-green-500 text-green-800"
                  )}
                  onClick={() => handleAnswerSelect(option)}
                  disabled={isQuestionAnswered}
                >
                  <span className="mr-4 font-bold">{String.fromCharCode(65 + index)}</span>
                  <span>{option}</span>
                </Button>
              );
            }))}
          </div>
        </CardContent>
      </Card>

      {isQuestionAnswered && (
        <Alert className="w-full max-w-2xl mt-6 animate-in fade-in" variant={isCorrect ? 'default' : 'destructive'}>
          {isCorrect ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
          <AlertTitle>{isCorrect ? 'Correct!' : 'Incorrect'}</AlertTitle>
          <AlertDescription>
            {isLoading ? (
              <div className="flex items-center gap-2">
                <Loader className="h-4 w-4 animate-spin" />
                Generating explanation...
              </div>
            ) : (
              <div className="mt-2 space-y-2">
                <div className="font-semibold flex items-center gap-2">
                  <Bot size={16} />
                  AI Explanation
                </div>
                <p>{explanation}</p>
              </div>
            )}
          </AlertDescription>
        </Alert>
      )}

      {isQuestionAnswered && !isLoading && (
        <CardFooter className="w-full max-w-2xl flex justify-between mt-6 p-0">
          <Button variant="ghost" onClick={() => setIsChatOpen(true)}>
            <MessageCircleQuestion className="mr-2 h-4 w-4" />
            Ask Assistant
          </Button>
          <Button onClick={handleNextQuestion}>
            Next Question
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      )}
      <ChatModal subject={subject} isOpen={isChatOpen} setIsOpen={setIsChatOpen} />
    </main>
  );
}

    