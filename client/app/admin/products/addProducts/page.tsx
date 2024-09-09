"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Sidebar from '@/app/Sidebar';  
import '../../../../styles/scss/addProducts.scss';

export default function AddProducts() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [categories, setCategories] = useState([]); // Lưu danh mục từ API
  const [product, setProduct] = useState({
    id: 0,
    name: '',
    price: 0,
    status: '',
    category: '',
    description: '',
    images: '',
  });

  const router = useRouter();

  // Lấy ID sản phẩm có giá trị lớn nhất từ API và đặt ID tiếp theo
  useEffect(() => {
    const fetchMaxId = async () => {
      try {
        const response = await fetch('http://localhost:8080/products?_sort=id&_order=desc&_limit=1');
        if (response.ok) {
          const data = await response.json();
          const maxId = data.length > 0 ? data[0].id : 0;
          setProduct((prevProduct) => ({ ...prevProduct, id: maxId + 1 }));
        } else {
          console.error('Failed to fetch the maximum ID.');
        }
      } catch (error) {
        console.error('Error fetching the maximum ID:', error);
      }
    };

    fetchMaxId();
  }, []);

  // Lấy danh sách các danh mục từ API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:8080/classify');
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        } else {
          console.error('Failed to fetch categories');
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
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
      // Nếu cần xử lý file ảnh (tùy thuộc vào logic bạn muốn thực hiện)
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
          price: parseFloat(product.price.toString()), // Đảm bảo giá trị là số
          date: new Date().toLocaleDateString(), // Thêm ngày hiện tại khi gửi yêu cầu
        }),
      });
      if (response.ok) {
        router.push('/admin/products'); // Điều hướng sau khi thêm sản phẩm thành công
      } else {
        console.error('Failed to add product');
      }
    } catch (error) {
      console.error('Error adding product:', error);
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
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              placeholder="Nhập tên sản phẩm"
              className="input"
            />
          </div>
          <div className="form-group">
            <label>Price</label>
            <input
              type="text"
              name="price"
              value={product.price}
              onChange={handleChange}
              placeholder="Nhập giá"
              className="input"
            />
          </div>
          <div className="form-group">
            <label>Category</label>
            <select name="category" value={product.category} onChange={handleChange} className="input">
              <option value="">Chọn danh mục</option>
              {categories.map((category:any) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Status</label>
            <select name="status" value={product.status} onChange={handleChange} className="input">
              <option value="">Chọn trạng thái</option>
              <option value="Còn hàng">Còn hàng</option>
              <option value="Sắp hết hàng">Sắp hết hàng</option>
              <option value="Bán hết">Bán hết</option>
            </select>
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              placeholder="Type here"
              className="input"
            ></textarea>
          </div>
          <div className="form-group">
            <label>Image</label>
            <input type="file" onChange={handleImageChange} className="input" />
            <div className="image-preview">
              {product.images && <img src={product.images} alt="Product" className="image-preview" />}
            </div>
            <input
              type="text"
              value={product.images}
              onChange={(e) => handleImageUrl(e.target.value)}
              placeholder="Nhập link ảnh"
              className="input"
            />
          </div>
          <button type="submit" className="submit-button">Add Product</button>
        </form>
      </div>
    </div>
  );
}
