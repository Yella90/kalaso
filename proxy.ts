import { NextResponse, type NextRequest } from 'next/server';

// Toutes les pages vivent sous /fr ou /bm : la racine renvoie vers le français.
export function proxy(request: NextRequest) {
  return NextResponse.redirect(new URL('/fr', request.url));
}

export const config = {
  matcher: '/',
};
