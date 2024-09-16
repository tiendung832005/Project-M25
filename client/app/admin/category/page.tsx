'use client';
import React, { useState, useEffect } from 'react';
import Sidebar from '@/app/Sidebar';
interface Category {
    id: number;
    name: string;
    description: string;
    status: boolean;
  }
// Hàm để lấy dữ liệu danh mục
async function fetchCategories(sortCriteria: string, sortDirection: string) {
  const res = await fetch(
    `http://localhost:8080/classify?_sort=${sortCriteria}&_order=${sortDirection}`,
    { cache: 'no-store' }
  );
  if (!res.ok) {
    throw new Error('Failed to fetch categories');
  }
  return res.json();
}

export default function CategoriesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortCriteria, setSortCriteria] = useState<string>('id');
  const [sortDirection, setSortDirection] = useState<string>('asc');
  const [searchTerm, setSearchTerm] = useState(''); // State để lưu giá trị tìm kiếm
  const [categories, setCategories] = useState<Category[]>([]);
  const itemsPerPage = 8;


  // Fetch danh mục từ server
  useEffect(() => {
    const fetchData = async () => {
      const categoriesData = await fetchCategories(sortCriteria, sortDirection);
      setCategories(categoriesData);
    };

    fetchData();
  }, [sortCriteria, sortDirection]);

  // Hàm để mở hoặc đóng sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Hàm xử lý xóa danh mục
  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:8080/classify/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        // Cập nhật trực tiếp state categories để loại bỏ danh mục đã xóa
        setCategories((prevCategories) => prevCategories.filter((category) => category.id !== id));
      } else {
        console.error('Error deleting category');
      }
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  // Lọc danh mục dựa trên giá trị tìm kiếm
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCategories.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="flex ml bg-white text-black">
        <div className='w-80'>
  <Sidebar  openSidebarToggle={sidebarOpen} OpenSidebar={toggleSidebar} />
        </div>
  <div className="w-full p-6">
    <div className="flex justify-between items-center mb-4">
      <h1 className="text-2xl font-semibold">Danh mục</h1>
      <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600">
        <a href="/admin/category/addCategory" className="text-white">+ Thêm danh mục</a>
      </button>
    </div>

    <div className="flex items-center mb-4">
      <input
        type="text"
        placeholder="Tìm kiếm danh mục theo tên..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="p-2 border border-gray-300 rounded-md mr-4 w-1/2"
      />
    </div>

    <table className="min-w-full bg-white border border-gray-300">
      <thead>
        <tr className="bg-gray-200">
          <th className="py-2 px-4 border-b text-left">ID</th>
          <th className="py-2 px-4 border-b text-left">Tên danh mục</th>
          <th className="py-2 px-4 border-b text-left">Trạng thái</th>
          <th className="py-2 px-4 border-b text-left">Mô tả</th>
          <th className="py-2 px-4 border-b text-left">Hành động</th>
        </tr>
      </thead>
      <tbody>
        {Array.isArray(currentItems) && currentItems.length > 0 ? (
          currentItems.map((category, index) => (
            <tr key={index} className="border-t hover:bg-gray-100">
              <td className="py-2 px-4">{category.id}</td>
              <td className="py-2 px-4">{category.name}</td>
              <td className="py-2 px-4">{category.status ? 'Hoạt động' : 'Ngừng hoạt động'}</td>
              <td className="py-2 px-4">{category.description}</td>
              <td className="py-2 px-4 space-x-2">
                <button
                  className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                  onClick={() => handleDelete(category.id)}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={5} className="py-4 text-center">Không có danh mục nào</td>
          </tr>
        )}
      </tbody>
    </table>

    <div className="flex justify-center space-x-2 mt-4">
      {Array.from({ length: Math.ceil(filteredCategories.length / itemsPerPage) }, (_, index) => (
        <button
          key={index + 1}
          onClick={() => paginate(index + 1)}
          className={`py-1 px-3 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'} hover:bg-blue-600`}
        >
          {index + 1}
        </button>
      ))}
    </div>
  </div>
</div>

  );
}
