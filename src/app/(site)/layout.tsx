import Nav from "@/components/Nav";
import CursorField from "@/components/CursorField";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CursorField />
      <Nav />
      {children}
    </>
  );
}
