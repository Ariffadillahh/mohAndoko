import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

function decodeJwt(token: string) {
    try {
        const parts = token.split('.');
        const base64Url = parts[1];
        if (!base64Url) {
            return null;
        }
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
        );
        return JSON.parse(jsonPayload);
    } catch (e) {
        return null;
    }
}

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    
    const refreshToken = request.cookies.get('refreshToken')?.value;

    let userRole = null;
    if (refreshToken) {
        const decodedToken = decodeJwt(refreshToken);
        userRole = decodedToken?.role;
    }

    if (pathname.startsWith('/auth/sign-in') || pathname.startsWith('/auth/sign-up')) {
        if (refreshToken) {
            if (userRole === 'ADMIN' || userRole === 'SUPERADMIN') {
                return NextResponse.redirect(new URL('/dashboard', request.url));
            }
            return NextResponse.redirect(new URL('/', request.url));
        }
        return NextResponse.next();
    }

    if (pathname.startsWith('/dashboard')) {
        if (!refreshToken) {
            const loginUrl = new URL('/auth/sign-in', request.url);
            loginUrl.searchParams.set('redirect', pathname);
            return NextResponse.redirect(loginUrl);
        }

        if (userRole !== 'ADMIN' && userRole !== 'SUPERADMIN') {
            return NextResponse.redirect(new URL('/', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/dashboard/:path*',
        '/auth/sign-in',
        '/auth/sign-up'
    ],
};