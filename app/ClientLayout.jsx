import Navbar from "./(screen)/components/Navbar";
import Footer from "./(screen)/components/Footer";

export default function ClientLayout({ children, profile, logoUrl }) {
  return (
    <>
      <Navbar profile={profile} logoUrl={logoUrl} />
      <main className="pt-16">{children}</main>
      <Footer profile={profile} logoUrl={logoUrl} />
    </>
  );
}
