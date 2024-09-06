"use client";
import React, { FormEventHandler, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function Page() {
  console.log("Username: admin1; pass: admin123");
  
  const [username, setUsername] = useState('admin1');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const router = useRouter();

  // Hàm xử lý đăng nhập
  const handleLogin: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    
    // Kiểm tra thông tin đăng nhập
    if (username === 'admin1' && password === 'admin123') {
      // Lưu token vào cookie
      Cookies.set('token', 'your-generated-token', { expires: 1 }); // Token có thể được tạo từ server, expires là thời gian tồn tại (1 ngày)

      // Chuyển hướng tới trang dashboard
      router.push('/admin/dashboard');
    } else {
      setError('Sai tên đăng nhập hoặc mật khẩu');
    }

    console.log(`Username: ${username}, Password: ${password}`);
  };

  return (
    <div className="bg-[#1d2634]">
      <h1 className="flex justify-center text-[#2b6cb0]">Xin chào Admin</h1>
      <div className="min-h-screen flex items-center justify-center bg-[#1d2634]">
        <div className="bg-white shadow rounded-lg flex flex-wrap">
          <div className="hidden md:block w-1/2">
            <img
              src="https://gcs.tripi.vn/public-tripi/tripi-feed/img/474063BWt/anh-binh-minh-dep-me-hon-tren-dinh-ta-chi-nhu-yen-bai_093052267.jpg"
              alt="Scenic Canyon"
              className="w-full h-full object-cover rounded-l-lg"
            />
          </div>
          <div className="p-8 w-full md:w-1/2">
            <h2 className="text-xl font-bold mb-6">Login</h2>
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label className="block text-gray-600">Username</label>
                <input
                  type="text"
                  placeholder="Nhập tên đăng nhập"
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-600 border">Password</label>
                <input
                  type="password"
                  placeholder="Nhập mật khẩu"
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {error && <p className="text-red-500">{error}</p>}
              <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
