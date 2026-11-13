import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/layout/Hero";

export default function Home() {
  return (
    <div className="relative flex min-h-full flex-1 flex-col overflow-hidden hero-atmosphere">
      <div className="pointer-events-none absolute inset-0 hero-grid" aria-hidden="true" />
      <Header />
      <main className="relative z-10 flex flex-1 flex-col">
        <Hero />
      </main>
      <Footer />
    </div>
  );
}
