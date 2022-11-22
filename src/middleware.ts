import {
  NextResponse,
  type NextRequest,
  type NextFetchEvent,
} from 'next/server';

export const middleware = async (req: NextRequest, ev: NextFetchEvent) => {
  const slug = req.nextUrl.pathname.split('/').pop();
  const slugFetch = await fetch(`${req.nextUrl.origin}/api/get-url/${slug}`);

  if (slugFetch.status === 404)
    return NextResponse.redirect(req.nextUrl.origin);

  const data = await slugFetch.json();

  if (data?.url) return NextResponse.redirect(data.url);
};

export const config = { matcher: ['/((?!api|_next/static|favicon.ico).*)'] };
// export const config = { matcher: ['/:slug'] };
