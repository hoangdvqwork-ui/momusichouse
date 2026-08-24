import Footer from "@/components/Footer";
import PromptBuilder from "@/components/PromptBuilder";
import PageHeading from "@/components/PageHeading";

export const metadata = {
  title: "Help You Prompt | Mõ Music House",
  description: "Build your brief, one card at a time.",
  alternates: { canonical: "/help-you-prompt" },
  openGraph: { title: "Help You Prompt | Mõ Music House", description: "Build your brief, one card at a time." },
};

export default function HelpYouPromptPage() {
  return (
    <>
      <div className="px-6 md:px-10 pt-32 pb-32 min-h-[70vh]">
        <PageHeading className="font-[family-name:var(--font-display-h1)] text-4xl md:text-6xl text-white mb-16">
          Help You Prompt
        </PageHeading>
        <PromptBuilder />
      </div>
      <Footer />
    </>
  );
}
