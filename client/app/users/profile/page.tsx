"use client";
import { useEffect, useState } from "react";
import { updateUserAPI } from "../../../services/user.service"; // Import hàm updateUserAPI

export default function EditProfile() {
  // State để lưu thông tin người dùng (giả sử đã có thông tin từ API)
  const [user, setUser] = useState({
    id: 836758081, // Giả sử ID người dùng đã biết
    name: "",
    email: "",
    password: "",
    address: "",
    phone: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Giả sử bạn đã lấy thông tin người dùng từ API và đặt vào state
  useEffect(() => {
    // Có thể gọi API lấy thông tin người dùng ở đây
    // Ví dụ: setUser({...}) để thiết lập thông tin ban đầu
  }, []);

  // Hàm xử lý khi nhấn nút Lưu
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Kiểm tra xem mật khẩu và mật khẩu xác nhận có khớp nhau không
    if (user.password !== confirmPassword) {
      setErrorMessage("Mật khẩu và xác nhận mật khẩu không khớp");
      return;
    }

    try {
      // Gọi API để cập nhật thông tin người dùng
      const updatedUser = await updateUserAPI(user);
      setErrorMessage("");
      setSuccessMessage("Thông tin của bạn đã được cập nhật thành công!");
      // Cập nhật lại thông tin người dùng
      setUser(updatedUser);
    } catch (error) {
      setErrorMessage("Có lỗi xảy ra khi cập nhật thông tin.");
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Chỉnh sửa thông tin cá nhân</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Tên
            </label>
            <input
              type="text"
              id="name"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Nhập tên của bạn"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Mật khẩu mới
            </label>
            <input
              type="password"
              id="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Nhập mật khẩu mới"
              required
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Xác nhận mật khẩu
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Nhập lại mật khẩu"
              required
            />
          </div>

          {errorMessage && (
            <p className="text-red-500 text-sm">{errorMessage}</p>
          )}
          
          {successMessage && (
            <p className="text-green-500 text-sm">{successMessage}</p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Lưu
          </button>
        </form>
      </div>
    </div>
  );
}
