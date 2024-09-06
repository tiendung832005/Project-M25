import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token'); // Kiểm tra token đăng nhập trong cookie
  if (!token) {
    return NextResponse.redirect(new URL('/', req.url)); // Chuyển hướng nếu chưa đăng nhập
  }
  return NextResponse.next(); // Cho phép truy cập nếu đã đăng nhập
}

export const config = {
  matcher: ['/admin/:path*'], // Áp dụng middleware cho các trang trong thư mục /admin
};
