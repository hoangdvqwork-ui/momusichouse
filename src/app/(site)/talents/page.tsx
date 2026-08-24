import TalentsSection from "@/components/homepage/TalentsSection";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Talents | Mõ Music House",
  description: "mess. and Tailor M8S — the human roster behind Mõ Music House.",
  alternates: { canonical: "/talents" },
  openGraph: {
    title: "Talents | Mõ Music House",
    description: "mess. and Tailor M8S — the human roster behind Mõ Music House.",
  },
};

export default function TalentsPage() {
  return (
    <>
      <TalentsSection />
      <Footer />
    </>
  );
}
