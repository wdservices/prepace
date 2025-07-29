
"use client";

import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Header } from "@/components/Header";
import { ProgressBar } from "@/components/ProgressBar";
import { useProgress } from "@/hooks/use-progress";
import { getSubjects, getTotalQuestionsInSubject, getSubjectIcon } from "@/lib/data";

export default function SubjectsPage() {
  const subjects = getSubjects();
  const { getSubjectProgress } = useProgress();

  return (
    <>
      <Header />
      <main className="flex-1 container mx-auto p-4 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 font-headline text-center">
          Choose a Subject
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((subjectName) => {
            const progress = getSubjectProgress(subjectName);
            const totalQuestions = getTotalQuestionsInSubject(subjectName);
            const percentage = totalQuestions > 0 ? (progress / totalQuestions) * 100 : 0;
            const Icon = getSubjectIcon(subjectName);

            return (
              <Link href={`/${subjectName}`} key={subjectName}>
                <Card className="hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-xl font-headline">{subjectName}</CardTitle>
                    <Icon className="h-8 w-8 text-primary" />
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col justify-end">
                    <p className="text-sm text-muted-foreground mb-2">{progress} / {totalQuestions} questions completed</p>
                    <ProgressBar value={percentage} />
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </main>
    </>
  );
}
