"use client"; // Bật chế độ client-side rendering
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation"; // Sử dụng useParams để lấy thông tin từ URL
import {
  FaChevronDown,
  FaFacebookMessenger,
  FaPhoneAlt,
  FaSearch,
  FaShoppingCart,
  FaTruck,
} from "react-icons/fa";
import Image from "next/image"; // Sử dụng Image của Next.js để tối ưu hóa hình ảnh
import Link from "next/link"; 
import { useCart } from "../../contexts/page"; // Điều chỉnh đường dẫn import
import "../../../../styles/scss/home.scss"
type Product = {
  id: number;
  images: string;
  name: string;
  price: number;
  status: string;
  description: string;
  quantity: number;
};

export default function ProductDetail() {
  const { id } = useParams(); // useParams luôn được gọi, không trong điều kiện nào
  const [showDropdown, setShowDropdown] = useState(false);
  const { addToCart, getTotalItems } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  // logic thanh header
  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;
    setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
    setPrevScrollPos(currentScrollPos);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos, visible]);

  useEffect(() => {
    // Đảm bảo rằng id được lấy từ useParams và không gọi hooks trong điều kiện
    if (!id) {
      console.error("No productId found in URL");
      return;
    }

    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/products/${id}` // API URL giữ nguyên
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const productData: Product = await response.json();
        setProduct(productData);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]); // Đảm bảo rằng hook này chỉ chạy khi id thay đổi

  if (!product) {
    return <div>Loading...</div>;
  }

  const productWithQuantity = { ...product, quantity: 1 };

  return (
    <div>
          {/* header */}
      <div className={`header-home ${visible ? "visible" : "hidden"}`}>
        <div className="logo">
          {/* Sử dụng URL tương đối tới ảnh logo */}
          <Link href="/users/home">
            <Image src="/logoHome.png" alt="Logo" width={100} height={50} />
          </Link>
        </div>
        <div className="nav">
          <Link href="/users/home">Trang chủ</Link>
          <a
            href="#"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            Sản phẩm{" "}
            <i className="icon-down">
              <FaChevronDown />
            </i>
            {showDropdown && (
              <div className="dropdown">
                <a href="#country">Áo tuyển Quốc Gia</a>
                <a href="#club">Áo CLB</a>
                <a href="#retro">Áo Retro</a>
              </div>
            )}
          </a>
          <Link href="#">Dịch vụ</Link>
          <Link href="#">Đặt áo đội</Link>
        </div>
        <div className="contact">
          <i className="cart-search">
            <FaSearch />
          </i>
          <span>
            <i>
              <FaPhoneAlt />
            </i>{" "}
            0985842468
          </span>
          <div className="cart">
            <Link href="/users/cart" className="cart-icon">
              <FaShoppingCart />
            </Link>
            <div className="cart-count">{getTotalItems()}</div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-8 p-12 mt-28">
        <div className="w-96 xl:w-3/6">
          {/* Sử dụng Image của Next.js để hiển thị ảnh sản phẩm */}
          <Image
            src={product.images}
            alt={product.name}
            className="w-full border rounded-lg border-gray-300"
            width={400}
            height={400}
          />
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
          <span className="text-red-600 text-xl mb-4">
            {product.price.toLocaleString("vi-VN")}₫
          </span>
          <div className="mb-4">
            <span className="text-orange-500 font-bold">{product.status}</span>
          </div>

          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md cursor-pointer mb-8"
            disabled={product.status == "Hết hàng"}
            onClick={() => addToCart(productWithQuantity)}
          >
            Thêm vào giỏ
          </button>
          <div className="mb-8">
            <a
              href="https://m.me/yourpage"
              className="flex items-center text-blue-500"
            >
              <FaFacebookMessenger className="mr-2" /> Nhắn tin tư vấn ngay
            </a>
            <p className="mt-2">
              In áo: Mua hàng kèm in áo liên hệ ngay qua messenger của shop trên
              web hoặc qua fanpage Facebook
            </p>
            <p className="mt-2">
              <FaTruck className="mr-2" /> Giao hàng dự kiến: Thứ 2 - Thứ 6 từ
              9h00 - 17h00
            </p>
            <p className="mt-2">
              <FaPhoneAlt className="mr-2" /> Hỗ trợ, tư vấn ngay qua messenger
              FB hoặc qua sdt 0985842468
            </p>
          </div>
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">THÔNG TIN SẢN PHẨM</h2>
            <Image
              src="https://file.hstatic.net/200000580329/file/bang_sz_284e0ac587cd4464b8277527545ae682_grande.png"
              alt="Size Chart"
              className="mb-4"
              width={500}
              height={300}
            />
            <p>{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
