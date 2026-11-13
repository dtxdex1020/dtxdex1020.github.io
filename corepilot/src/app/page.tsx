import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/layout/Hero";
import { Messaging } from "@/components/layout/Messaging";
import { ProductPreview } from "@/components/layout/ProductPreview";

export default function Home() {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-black text-white">
      <Header />
      <main className="flex flex-1 flex-col">
        <Hero />
        <ProductPreview />
        <Messaging />
      </main>
      <Footer />
    </div>
  );
}
