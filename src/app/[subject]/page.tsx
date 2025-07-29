import { notFound } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/Header";
import { getSubjects, getYearsForSubject, getSubjectIcon } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";

export function generateStaticParams() {
  return getSubjects().map((subject) => ({
    subject,
  }));
}

type SubjectPageProps = {
  params: {
    subject: string;
  };
};

export default function SubjectPage({ params }: SubjectPageProps) {
  const subjectName = decodeURIComponent(params.subject);
  const years = getYearsForSubject(subjectName);
  const Icon = getSubjectIcon(subjectName);

  if (!years.length) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="flex-1 container mx-auto p-4 md:p-8">
        <div className="flex items-center gap-4 mb-6">
            <Icon className="h-10 w-10 text-primary" />
            <h1 className="text-3xl md:text-4xl font-bold font-headline">
            {subjectName}
            </h1>
        </div>
        <h2 className="text-xl md:text-2xl font-bold mb-4 font-headline">Select a Year</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {years.map((year) => (
            <Link href={`/${subjectName}/${year}`} key={year}>
              <Card className="hover:shadow-md hover:border-primary transition-all duration-200">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-xl font-headline">{year} Exam</CardTitle>
                    <ChevronRight className="h-6 w-6 text-muted-foreground" />
                  </div>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
