import { NextResponse, type NextRequest } from 'next/server';

const middleware = async (req: NextRequest) => {
  const slug = req.nextUrl.pathname.split('/').pop();

  console.log('BEFORE??');
  if (slug === 'dashboard' || slug === 'sign-in') return;
  console.log('AFTER??');

  const slugFetch = await fetch(`${req.nextUrl.origin}/api/get-url/${slug}`);

  if (slugFetch.status === 404)
    return NextResponse.redirect(req.nextUrl.origin);

  const data = await slugFetch.json();

  if (data?.url) return NextResponse.redirect(data.url);
};

export const config = {
  matcher: ['/((?!api|_next|_proxy|_auth|_static|_vercel|[\\w-]+\\.\\w+).*)'],
};

export default middleware;
