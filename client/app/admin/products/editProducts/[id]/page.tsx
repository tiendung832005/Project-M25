'use client';
import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation'; // Sử dụng useParams để lấy 'id'
import Sidebar from '@/app/Sidebar';
import Link from 'next/link';
import "../../../../../styles/scss/addProducts.scss";

export default function EditProducts() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [product, setProduct] = useState({
    name: '',
    price: 0,
    status: '',
    description: '',
    category: '',
    images: '',
  });

  const router = useRouter();
  const { id } = useParams(); // Lấy 'id' từ URL thông qua useParams

  // Kiểm tra xem id có tồn tại không khi component render
  useEffect(() => {
    if (!id) {
      console.error('Không tìm thấy ID sản phẩm trong URL.');
      return;
    }

    // Fetch thông tin sản phẩm từ server dựa trên id
    fetch(`http://localhost:8080/products/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Lỗi khi tìm nạp sản phẩm');
        }
        return response.json();
      })
      .then(data => {
        if (data) {
          setProduct(data); // Cập nhật state với dữ liệu sản phẩm
        }
      })
      .catch(error => console.error('Lỗi khi tìm nạp sản phẩm:', error));
  }, [id]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Xử lý file ảnh nếu cần thiết
    }
  };

  const handleImageUrl = (imageUrl: string) => {
    setProduct(prevProduct => ({ ...prevProduct, images: imageUrl }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProduct(prevProduct => ({ ...prevProduct, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) { // Kiểm tra lại id trước khi tiếp tục
      console.error('Không có ID sản phẩm để cập nhật');
      return;
    }

    fetch(`http://localhost:8080/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    })
      .then(response => {
        if (response.ok) {
          router.push('/admin/products'); // Điều hướng đến trang danh sách sản phẩm sau khi chỉnh sửa thành công
        } else {
          console.error('Lỗi cập nhật sản phẩm');
        }
      })
      .catch(error => console.error('Lỗi cập nhật sản phẩm:', error));
  };

  return (
    <div className='container1'>
      <Sidebar openSidebarToggle={sidebarOpen} OpenSidebar={toggleSidebar} />
      <div className="add-product-page">
        <button className="back-button">
          <Link className="back-button" href={'/admin/products'}>Back</Link>
        </button>
        <h1>Edit Product</h1>
        <form className="add-product-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Product Name</label>
            <input type="text" name="name" value={product.name} onChange={handleChange} placeholder="Nhập tên sản phẩm" />
          </div>
          <div className="form-group">
            <label>Price</label>
            <input type="number" name="price" value={product.price} onChange={handleChange} placeholder="Nhập giá" />
          </div>
          <div className="form-group">
            <label>Category</label>
            <select name="category" value={product.category} onChange={handleChange}>
              <option value="">Chọn danh mục</option>
              <option value="Áo Tuyển Quốc Gia">Áo tuyển Quốc Gia</option>
              <option value="Áo CLB">Áo CLB</option>
              <option value="Áo Retro">Áo Retro</option>
            </select>
          </div>
          <div className="form-group">
            <label>Status</label>
            <select name="status" value={product.status} onChange={handleChange}>
              <option value="">Chọn trạng thái</option>
              <option value="available">Còn hàng</option>
              <option value="out_of_stock">Sắp hết hàng</option>
              <option value="preorder">Bán hết</option>
            </select>
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea name="description" value={product.description} onChange={handleChange} placeholder="Type here"></textarea>
          </div>
          <div className="form-group">
            <label>Image</label>
            <input type="file" onChange={handleImageChange} />
            <div className="image-preview">
              {product.images && <img src={product.images} alt="Product" />}
            </div>
            <input type="text" value={product.images} onChange={(e) => handleImageUrl(e.target.value)} placeholder="Nhập link ảnh" />
          </div>
          <button type="submit" className="submit-button">Edit Product</button>
        </form>
      </div>
    </div>
  );
}
