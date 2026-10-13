import { NextResponse } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "./lib/auth/session";
import { defaultLocale, locales } from "./lib/i18n/config";

async function guardAdmin(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const session = token ? await verifySessionToken(token) : null;

  if (pathname.startsWith("/admin/login")) {
    if (session) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return NextResponse.next();
  }

  if (!session) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}

function hasLocalePrefix(pathname, locale) {
  return pathname === `/${locale}` || pathname.startsWith(`/${locale}/`);
}

/**
 * Public routing: French (default) is served without prefix and rewritten
 * internally to /fr/...; English is served under /en/...; an explicit /fr
 * prefix is redirected to the unprefixed URL to avoid duplicate content.
 */
function withPathname(request) {
  // Lets server components that do not receive params (not-found) know the URL.
  const headers = new Headers(request.headers);
  headers.set("x-pathname", request.nextUrl.pathname);
  return { request: { headers } };
}

function routeLocale(request) {
  const { pathname } = request.nextUrl;

  if (hasLocalePrefix(pathname, defaultLocale)) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(defaultLocale.length + 1) || "/";
    return NextResponse.redirect(url, 308);
  }

  if (locales.some((locale) => hasLocalePrefix(pathname, locale))) {
    return NextResponse.next(withPathname(request));
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url, withPathname(request));
}

export async function proxy(request) {
  const { pathname } = request.nextUrl;
  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    return guardAdmin(request);
  }
  return routeLocale(request);
}

export const config = {
  // Everything except API routes, Next internals, the OG image route and static files.
  matcher: ["/((?!api|og|_next|.*\\..*).*)"],
};
