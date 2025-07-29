import { notFound } from "next/navigation";
import { getQuestions, getSubjects } from "@/lib/data";
import { QuestionClientPage } from "./client";
import { Header } from "@/components/Header";

export async function generateStaticParams() {
  const params: { subject: string; year: string }[] = [];
  const subjects = getSubjects();
  subjects.forEach(subject => {
    const years = Object.keys(subject ? require('@/lib/data').data[subject] : {});
    years.forEach(year => {
      params.push({ subject, year });
    });
  });
  return params;
}

type QuestionPageProps = {
  params: {
    subject: string;
    year: string;
  };
};

export default function QuestionPage({ params }: QuestionPageProps) {
  const subject = decodeURIComponent(params.subject);
  const year = decodeURIComponent(params.year);
  const questions = getQuestions(subject, year);

  if (!questions || questions.length === 0) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <QuestionClientPage subject={subject} year={year} questions={questions} />
    </div>
  );
}
