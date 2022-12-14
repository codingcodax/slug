import { NextResponse, type NextRequest } from 'next/server';

import { RESERVED_PATHS } from './lib/constants';

export const middleware = async (req: NextRequest) => {
  const { origin: BASE_URL, pathname } = req.nextUrl;
  const slug = pathname.split('/').pop() || '';

  if (pathname === '/') return NextResponse.next();
  if (pathname.startsWith('/static')) {
    return NextResponse.rewrite(
      new URL('/_static' + pathname.split('/static')[1], req.url)
    );
  }
  if (RESERVED_PATHS.has(slug)) return NextResponse.next();

  const slugFetch = await fetch(`${BASE_URL}/api/get-url/${slug}`);

  if (slugFetch.status === 404) return NextResponse.redirect(BASE_URL);

  const data = await slugFetch.json();

  if (data?.url) return NextResponse.redirect(data.url);
};

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /en routes
     * 3. /_next (Next.js internals)
     * 4. /_static (inside /public)
     * 5. /_vercel (Vercel internals)
     * 6. all root files inside /public (e.g. /favicon.ico)
     */
    '/((?!api|en|_next|_static|static|_vercel|[\\w-]+\\.\\w+).*)',
  ],
};
