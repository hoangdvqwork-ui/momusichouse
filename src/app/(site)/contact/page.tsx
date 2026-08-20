import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "Contact | Mõ Music House",
  description: "hello@momusichouse.com · 0338 114 494",
};

export default function ContactPage() {
  return (
    <>
      <div className="px-6 md:px-10 pt-32 pb-32 min-h-[70vh] flex flex-col gap-16">
        <h1 className="font-[family-name:var(--font-display-h1)] text-4xl md:text-6xl text-white">
          Contact
        </h1>

        <div className="flex flex-col gap-2 text-white/70">
          {/* momusichouse.com is expired/unclaimed as of the last check
              in this system, this address won't receive anything until
              that's resolved or a working alternative is chosen. */}
          <a href="mailto:hello@momusichouse.com" className="hover:text-accent transition-colors w-fit">
            hello@momusichouse.com
          </a>
          <a href="tel:0338114494" className="hover:text-accent transition-colors w-fit">
            0338 114 494 (Mr. Hoàng)
          </a>
        </div>

        <ContactForm />
      </div>
      <Footer />
    </>
  );
}
