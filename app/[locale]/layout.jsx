import { notFound } from "next/navigation";
import { Toaster } from "react-hot-toast";
import { sora, inter } from "../fonts";
import "../globals.css";
import Navbar from "../_components/Navbar";
import Footer from "../_components/Footer";
import { getDictionary } from "../../lib/i18n";
import { isLocale, locales } from "../../lib/i18n/config";
import { buildMetadata } from "../../lib/seo";
import { getLocalizedProfile } from "../../lib/db/profile";
import { getSiteSettings } from "../../lib/db/settings";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const settings = await getSiteSettings();

  // The admin SEO settings are written in French: they only override the French version.
  const title = (locale === "fr" && settings?.seoTitle) || dict.meta.defaultTitle;
  const description = (locale === "fr" && settings?.seoDescription) || dict.meta.description;

  return {
    ...buildMetadata({ locale, path: "/", title: { absolute: title }, description }),
    title: { default: title, template: `%s — ${dict.meta.siteName}` },
    applicationName: dict.meta.siteName,
    authors: [{ name: dict.meta.siteName }],
    creator: dict.meta.siteName,
    formatDetection: { telephone: false },
  };
}

export const viewport = {
  themeColor: "#09131e",
  colorScheme: "dark",
};

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);
  const profile = await getLocalizedProfile(locale);

  return (
    <html lang={locale}>
      <body className={`${sora.variable} ${inter.variable} site antialiased`}>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-white"
        >
          {dict.a11y.skipToContent}
        </a>
        <Toaster position="top-right" toastOptions={{ duration: 5000 }} />
        <Navbar locale={locale} nav={dict.nav} a11y={dict.a11y} cvUrl={profile?.cvUrl} />
        <main id="main" tabIndex={-1} className="pt-16 outline-none">
          {children}
        </main>
        <Footer locale={locale} dict={dict} profile={profile} />
      </body>
    </html>
  );
}
