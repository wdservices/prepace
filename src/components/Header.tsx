import Link from "next/link";
import { BookOpenCheck } from "lucide-react";

export function Header() {
  return (
    <header className="bg-card border-b sticky top-0 z-10">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <BookOpenCheck className="h-7 w-7 text-primary" />
            <span className="text-xl font-bold font-headline tracking-tight">
              WAEC PrepAce
            </span>
          </Link>
          <nav>
            <Link href="/admin" className="text-sm font-medium text-muted-foreground hover:text-primary">
              Dashboard
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
