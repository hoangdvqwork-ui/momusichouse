export default function Footer() {
  return (
    <footer
      id="site-footer"
      className="w-full px-6 md:px-10 py-10 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-sm text-white/70"
    >
      <span>&copy; {new Date().getFullYear()} Mõ Music House Ltd. Designed by 5430 & Co</span>
      <div className="flex flex-col md:flex-row gap-2 md:gap-8">
        <a href="mailto:hello@momusichouse.com" className="hover:text-accent transition-colors">
          hello@momusichouse.com
        </a>
        <a href="tel:+84338114494" className="hover:text-accent transition-colors">
          +84 338 114 494
        </a>
      </div>
    </footer>
  );
}
