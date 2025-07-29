
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Header } from '@/components/Header';
import { CheckCircle, BookOpenCheck, Bot, BarChart } from 'lucide-react';
import Image from 'next/image';

export default function LandingPage() {
  const features = [
    {
      icon: <BookOpenCheck className="h-10 w-10 text-primary" />,
      title: 'Past Questions',
      description: 'Access a vast library of past WAEC exam questions by subject and year.',
    },
    {
      icon: <CheckCircle className="h-10 w-10 text-primary" />,
      title: 'Instant Feedback',
      description: 'Receive immediate feedback on your answers and get AI-powered explanations.',
    },
    {
      icon: <Bot className="h-10 w-10 text-primary" />,
      title: 'AI Assistant',
      description: 'A subject-specific chatbot to help you with follow-up questions.',
    },
    {
      icon: <BarChart className="h-10 w-10 text-primary" />,
      title: 'Progress Tracking',
      description: 'Monitor your completion rates for each subject to stay on track.',
    },
  ];

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="text-center py-20 px-4 bg-primary/10">
          <div className="container mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4">
              Ace Your WAEC Exams with Confidence
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              PrepAce provides AI-powered tools, offline access to past questions, and personalized feedback to help you excel.
            </p>
            <Button asChild size="lg">
              <Link href="/subjects">Get Started Now</Link>
            </Button>
            <div className="mt-12 relative w-full max-w-4xl mx-auto">
              <Image 
                src="https://placehold.co/1200x600.png"
                alt="App screenshot"
                width={1200}
                height={600}
                className="rounded-lg shadow-2xl"
                data-ai-hint="app user interface"
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 px-4">
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center font-headline mb-12">
              Everything You Need to Succeed
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <div className="mx-auto bg-primary/10 rounded-full h-20 w-20 flex items-center justify-center">
                      {feature.icon}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardTitle className="text-xl font-headline mb-2">{feature.title}</CardTitle>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

      </main>
      <footer className="bg-card border-t py-6">
        <div className="container mx-auto text-center text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} WAEC PrepAce. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
