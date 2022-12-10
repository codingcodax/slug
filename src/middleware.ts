import { NextResponse, type NextRequest } from 'next/server';

export const middleware = async (req: NextRequest) => {
  const { origin: BASE_URL, pathname } = req.nextUrl;
  const slug = pathname.split('/').pop();

  if (
    pathname === '/' ||
    pathname.startsWith('/_') ||
    pathname.startsWith('/api')
  )
    return NextResponse.next();

  const slugFetch = await fetch(`${BASE_URL}/api/get-url/${slug}`);

  if (slugFetch.status === 404) return NextResponse.redirect(BASE_URL);

  const data = await slugFetch.json();

  if (data?.url) return NextResponse.redirect(data.url);
};

export const config = {
  matcher: [
    '/((?!api|_next|en|_proxy|_auth|_static|_vercel|dashboard|sign-in|account|[\\w-]+\\.\\w+).*)',
  ],
};
