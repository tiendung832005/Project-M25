// app/admin/products/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Product } from '../../../interface/productsAdmin';
import '../../../styles/scss/adminProducts.scss';
import Sidebar from '@/app/Sidebar';

async function fetchProducts(sortCriteria: string, sortDirection: string) {
  const res = await fetch(
    `http://localhost:8080/products?_sort=${sortCriteria}&_order=${sortDirection}`,
    { cache: 'no-store' }
  );
  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }
  return res.json();
}

export default function ProductsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortCriteria, setSortCriteria] = useState<string>('id');
  const [sortDirection, setSortDirection] = useState<string>('asc');
  const [searchTerm, setSearchTerm] = useState(''); // State để lưu giá trị tìm kiếm
  const [products, setProducts] = useState<Product[]>([]); // State để lưu danh sách sản phẩm
  const itemsPerPage = 8;

  const router = useRouter();

  
  // Fetch sản phẩm từ server
  useEffect(() => {
    const fetchData = async () => {
      const productsData = await fetchProducts(sortCriteria, sortDirection);
      setProducts(productsData);
    };

    fetchData();
  }, [sortCriteria, sortDirection]);

  // Hàm để mở hoặc đóng sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Hàm xử lý xóa sản phẩm
  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:8080/products/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        // Cập nhật trực tiếp state products để loại bỏ sản phẩm đã xóa
        setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
      } else {
        console.error('Error deleting product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  // Lọc sản phẩm dựa trên giá trị tìm kiếm
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const formatVND = (value: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  };

  const handleSort = (criteria: string) => {
    setSortCriteria(criteria);
    setSortDirection((prevDirection) => (prevDirection === 'asc' ? 'desc' : 'asc'));
    // Loại bỏ router.refresh();
  };

  return (
    <div className='container1'>
      <Sidebar openSidebarToggle={sidebarOpen} OpenSidebar={toggleSidebar} />
      <div className='product-table'>
        <div className='header'>
          <h1>Sản phẩm</h1>
          <button className='add-product'>
            <a className='add-product' href="/admin/products/addProducts">
              + Thêm sản phẩm
            </a>
          </button>
        </div>

        <div className='product-table-select'>
          {/* Thêm input tìm kiếm sản phẩm */}
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm theo tên..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border border-gray-300 rounded-md mr-auto"
          />
          Sắp xếp theo:
          <select
            className='product-table-select-option'
            onChange={(e) => handleSort(e.target.value)}
            value={sortCriteria}
          >
            <option value="category">Danh Mục</option>
            <option value="price">Giá</option>
          </select>
        </div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên</th>
              <th>Trạng thái</th>
              <th>Danh mục</th>
              <th>Giá</th>
              <th>Ngày</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(currentItems) && currentItems.length > 0 ? (
              currentItems.map((product, index) => (
                <tr key={index}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.status ? 'Còn hàng' : 'Hết hàng'}</td>
                  <td>{product.category}</td>
                  <td>{formatVND(product.price)}</td>
                  <td>{product.date}</td>
                  <td>
                    <button className='view-btn'>Xem</button>
                    <button className='edit-btn'>
                      <a href={`/admin/products/editProducts/${product.id}`} className='edit-btn'>Chỉnh sửa</a>
                    </button>
                    <button className='delete-btn' onClick={() => handleDelete(product.id)}>Xóa</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7}>Không có sản phẩm nào</td>
              </tr>
            )}
          </tbody>
        </table>
        <div className='pagination'>
          {Array.from({ length: Math.ceil(filteredProducts.length / itemsPerPage) }, (_, index) => (
            <button key={index + 1} onClick={() => paginate(index + 1)}>
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
