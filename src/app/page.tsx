
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Header } from '@/components/Header';
import { CheckCircle, BookOpenCheck, Bot, BarChart, Award, Users, Smartphone, BookOpen, MessageSquare } from 'lucide-react';
import Image from 'next/image';

export default function LandingPage() {
  const features = [
    {
      icon: <BookOpenCheck className="h-10 w-10 text-primary" />,
      title: 'Real WAEC Past Questions',
      description: 'Study from actual past exam papers across major subjects.',
    },
    {
      icon: <MessageSquare className="h-10 w-10 text-primary" />,
      title: 'AI-Powered Explanations',
      description: 'Know why your answers are right or wrong with instant, easy-to-understand feedback.',
    },
    {
      icon: <Bot className="h-10 w-10 text-primary" />,
      title: 'Interactive Subject Chatbot',
      description: 'Ask follow-up questions and get help, just like chatting with a private tutor.',
    },
    {
      icon: <Smartphone className="h-10 w-10 text-primary" />,
      title: 'Low Data, Fast Loading',
      description: 'PrepAce is light, fast, and efficient. No heavy downloads required.',
    },
  ];

  const subjects = [
    'English Language', 'Mathematics', 'Physics', 'Chemistry', 'Biology',
    'Economics', 'Geography', 'Government', 'Literature in English', 'Civic Education',
    'Agricultural Science', 'Commerce', 'Accounting', 'Further Mathematics', 'Computer Studies'
  ];

  const testimonials = [
    {
      quote: "PrepAce helped me understand why I was getting questions wrong. Now I actually learn, not just guess!",
      author: "Sarah, SS3 student"
    },
    {
      quote: "The chatbot feels like a real tutor. It made Chemistry way easier for me.",
      author: "David, WAEC candidate"
    },
    {
      quote: "I love how it works even with my poor internet connection. A game-changer for students like me.",
      author: "Amina, SS3 student"
    }
  ];

  const steps = [
    "Choose a subject and year",
    "Practice questions and get instant feedback",
    "Ask questions and chat with the AI assistant",
    "Track your progress and improve"
  ];

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="text-center py-20 px-4 bg-gradient-to-b from-primary/10 to-white">
          <div className="container mx-auto">
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-lg inline-block mb-8">
              <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4 text-primary">
                PrepAce – Pass WAEC with Confidence
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                Smart, interactive exam prep designed for West African students. Practice real past questions, get instant AI-powered explanations, and study anywhere—without wasting your data.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="text-lg">
                  <Link href="/subjects">Get Started for Free</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="text-lg">
                  <Link href="#features">Learn More</Link>
                </Button>
              </div>
            </div>
            <div className="mt-12 relative w-full max-w-5xl mx-auto rounded-xl overflow-hidden shadow-2xl border border-gray-200">
              <Image 
                src="/exams.webp"
                alt="WAEC exam preparation"
                width={1200}
                height={600}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
          </div>
        </section>

        {/* What is PrepAce? */}
        <section id="about" className="py-20 px-4 bg-gray-50">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center font-headline mb-8">
              What is PrepAce?
            </h2>
            <div className="bg-white p-8 rounded-xl shadow-md">
              <p className="text-lg mb-6">
                <strong>PrepAce is a smart learning tool built to help students prepare for WAEC exams with confidence and clarity.</strong>
              </p>
              <p className="mb-6">
                Whether you're reviewing Chemistry equations, English comprehension, or Biology facts, PrepAce gives you access to real past questions, step-by-step explanations, and subject-wise chat support—all from your phone.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                <p className="font-medium">We understand the challenges students face:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Expensive data costs</li>
                  <li>Unstable internet</li>
                  <li>Lack of personalized feedback</li>
                </ul>
                <p className="mt-3">
                  <strong>PrepAce is built for exactly that environment</strong>—optimized to run online but using very little data, and designed to work fast even on entry-level smartphones.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 px-4">
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center font-headline mb-12">
              Key Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {features.map((feature, index) => (
                <Card key={index} className="text-left h-full hover:shadow-lg transition-shadow">
                  <CardHeader className="flex flex-row items-start space-x-4 space-y-0">
                    <div className="bg-primary/10 rounded-full h-12 w-12 flex-shrink-0 flex items-center justify-center">
                      {feature.icon}
                    </div>
                    <div>
                      <CardTitle className="text-xl font-headline">{feature.title}</CardTitle>
                      <p className="text-muted-foreground mt-1">{feature.description}</p>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Subjects Covered */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center font-headline mb-12">
              Subjects Covered
            </h2>
            <div className="bg-white p-8 rounded-xl shadow-md">
              <p className="text-center mb-6 text-lg">
                We currently support core WAEC subjects including:
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {subjects.map((subject, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span>{subject}</span>
                  </div>
                ))}
              </div>
              <p className="text-center mt-6 text-blue-600 font-medium">...and more coming soon!</p>
            </div>
          </div>
        </section>

        {/* Who is this for? */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center font-headline mb-12">
              Who is this for?
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-6">
                <Users className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-3">WAEC Students</h3>
                <p className="text-muted-foreground">
                  Whether you're in Nigeria, Ghana, or anywhere in West Africa, PrepAce is designed to help you pass your WAEC exams with confidence.
                </p>
              </Card>
              <Card className="p-6">
                <Award className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-3">Schools & Tutors</h3>
                <p className="text-muted-foreground">
                  Looking for a smart digital tool to enhance your teaching? PrepAce is perfect for classrooms and tutoring centers.
                </p>
              </Card>
              <Card className="p-6">
                <BookOpen className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-3">Parents & Guardians</h3>
                <p className="text-muted-foreground">
                  Help your children prepare effectively for their exams with a tool that makes learning engaging and effective.
                </p>
              </Card>
              <Card className="p-6">
                <Smartphone className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-3">Low-Data Users</h3>
                <p className="text-muted-foreground">
                  Can't afford heavy apps or subscriptions? PrepAce is optimized to work with minimal data usage.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center font-headline mb-12">
              What Students Are Saying
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="p-6 h-full">
                  <div className="flex flex-col h-full">
                    <div className="flex-1">
                      <p className="italic text-muted-foreground mb-4">"{testimonial.quote}"</p>
                    </div>
                    <div className="mt-auto pt-4 border-t border-gray-100">
                      <p className="font-medium">{testimonial.author}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How to Get Started */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center font-headline mb-12">
              How to Get Started
            </h2>
            <div className="bg-white p-8 rounded-xl shadow-md">
              <ol className="space-y-4">
                {steps.map((step, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold mr-4 mt-0.5">
                      {index + 1}
                    </div>
                    <p className="text-lg">{step}</p>
                  </li>
                ))}
              </ol>
              <div className="mt-10 text-center">
                <Button asChild size="lg" className="text-lg">
                  <Link href="/subjects">Start Learning Now</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

      </main>
      {/* Call to Action */}
      <section className="bg-primary py-16 px-4 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-headline mb-6">
            Start preparing smarter today
          </h2>
          <p className="text-xl mb-8 text-primary-foreground/90 max-w-2xl mx-auto">
            Join thousands of WAEC students using PrepAce to succeed in their exams.
          </p>
          <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100 text-lg">
            <Link href="/subjects">Try PrepAce Now – It's Free!</Link>
          </Button>
        </div>
      </section>

      <footer className="bg-gray-900 text-gray-300 py-8 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold text-white mb-2">PrepAce</h3>
              <p className="text-sm">Your smart WAEC exam preparation partner</p>
            </div>
            <div className="flex space-x-6">
              <Link href="/about" className="hover:text-white transition-colors">About</Link>
              <Link href="/subjects" className="hover:text-white transition-colors">Subjects</Link>
              <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-6 text-center text-sm">
            <p>&copy; {new Date().getFullYear()} PrepAce. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
