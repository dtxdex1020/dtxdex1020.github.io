import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/layout/Hero";
import { Sidebar } from "@/components/layout/Sidebar";

export default function Home() {
  return (
    <div className="flex min-h-full flex-1 flex-col app-shell">
      <div className="flex min-h-0 flex-1">
        <Sidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <Header />
          <main className="relative flex flex-1 flex-col">
            <Hero />
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
}
