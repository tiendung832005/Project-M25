"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Sidebar from '@/app/Sidebar';  
import '../../../../styles/scss/addProducts.scss';

export default function AddProducts() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [product, setProduct] = useState({
    id: 0, // Thêm ID vào state của sản phẩm
    name: '',
    price: 0,
    status: '',
    category: '',
    description: '',
    images: '',
  });

  const router = useRouter();
 
  useEffect(() => {
    // Gửi yêu cầu GET để lấy sản phẩm có ID lớn nhất hiện tại
    const fetchMaxId = async () => {
      try {
        const response = await fetch('http://localhost:8080/products?_sort=id&_order=desc&_limit=1');
        if (response.ok) {
          const data = await response.json();
          const maxId = data.length > 0 ? data[0].id : 0; // Nếu có sản phẩm, lấy ID lớn nhất, ngược lại đặt là 0
          setProduct((prevProduct) => ({ ...prevProduct, id: maxId + 1 })); // Đặt ID mới là maxId + 1
        } else {
          console.error('Failed to fetch the maximum ID.');
        }
      } catch (error) {
        console.error('Error fetching the maximum ID:', error);
      }
    };

    fetchMaxId(); // Gọi hàm fetchMaxId khi component mount
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProduct(prevProduct => ({ ...prevProduct, [name]: value }));
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...product,
          price: parseFloat(product.price.toString()), // Chuyển đổi giá trị price thành số
          date: new Date().toLocaleDateString(), // Thêm ngày hiện tại khi gửi yêu cầu
        }),
      });
      if (response.ok) {
        router.push('/admin/products'); // Điều hướng sau khi thêm sản phẩm thành công
      } else {
        console.error('Failed to add product'); // In lỗi nếu thất bại
      }
    } catch (error) {
      console.error('Error adding product:', error); // In lỗi nếu có lỗi xảy ra trong quá trình thêm sản phẩm
    }
  };

  const formatVND = (value: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  };

  return (
    <div className='container1'>
      <Sidebar openSidebarToggle={sidebarOpen} OpenSidebar={toggleSidebar} />
      <div className="add-product-page">
        <button className="back-button">
          <Link href={'/admin/products'}>Back</Link>
        </button>
        <h1>Add Product</h1>
        <form className="add-product-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Product Name</label>
            <input type="text" name="name" value={product.name} onChange={handleChange} placeholder="Nhập tên sản phẩm" />
          </div>
          <div className="form-group">
            <label>Price</label>
            <input type="text" name="price" value={product.price} onChange={handleChange} placeholder="Nhập giá" />
          </div>
          <div className="form-group">
            <label>Category</label>
            <select name="category" value={product.category} onChange={handleChange}>
              <option value="">Chọn danh mục</option>
              <option value="Áo tuyển Quốc Gia">Áo tuyển Quốc Gia</option>
              <option value="Áo CLB">Áo CLB</option>
              <option value="Áo Retro">Áo Retro</option>
            </select>
          </div>
          <div className="form-group">
            <label>Status</label>
            <select name="status" value={product.status} onChange={handleChange}>
              <option value="">Chọn trạng thái</option>
              <option value="Còn hàng">Còn hàng</option>
              <option value="Sắp hết hàng">Sắp hết hàng</option>
              <option value="Bán hết">Bán hết</option>
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
          <button type="submit" className="submit-button">Add Product</button>
        </form>
      </div>
    </div>
  );
}
