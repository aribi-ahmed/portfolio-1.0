import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-[100dvh] flex items-center justify-center bg-background text-foreground relative overflow-hidden">
      <div className="noise-overlay" />
      <div className="text-center space-y-6 relative z-10">
        <h1 className="text-6xl md:text-8xl font-bold font-display text-primary tracking-tighter">404</h1>
        <p className="text-muted-foreground font-mono text-lg">System anomaly detected. Page not found.</p>
        <Link href="/" className="inline-block mt-8 px-6 py-3 border border-border bg-card hover:border-primary/50 hover:bg-primary/5 transition-colors font-mono text-sm">
          Return to root
        </Link>
      </div>
    </div>
  );
}
