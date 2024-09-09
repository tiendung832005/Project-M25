"use client";
import React, { useEffect, useState } from "react";
import "../../../styles/scss/home.scss";
import { useCart } from "../contexts/page";
import {
    FaChevronDown,
    FaPhoneAlt,
    FaSearch,
    FaShoppingCart,
    FaUser,
} from "react-icons/fa";
import axios from "axios";
import Image from "next/image"; // Sử dụng next/image để tối ưu hình ảnh
import Link from "next/link"; // Sử dụng Link của Next.js
import logo from "../../../public/logoHome.png";
import carousel1 from "../../../public/slide_1_img.webp";
import carousel2 from "../../../public/slide_2_img.webp";
import carousel3 from "../../../public/slide_3_img.webp";
import feedback1 from "../../../public/feedback1.webp";
import feedback2 from "../../../public/feedback2.webp";
import feedback3 from "../../../public/feedback3.webp";
import feedback4 from "../../../public/feedback4.webp";
import feedback5 from "../../../public/feedback5.webp";
import feedback6 from "../../../public/feedback6.webp";
import feedback7 from "../../../public/feedback7.webp";
import feedback8 from "../../../public/feedback8.webp";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

type Product = {
    id: number;
    name: string;
    images: string;
    status: string;
    category: string;
    price: number;
    date: string;
};

export default function UserHome() {
    const [showDropdown, setShowDropdown] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);
    const { getTotalItems } = useCart(); // Lấy số lượng sản phẩm trong giỏ hàng
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);
    const [userName, setUserName] = useState("");
    const [searchTerm, setSearchTerm] = useState(""); // State cho từ khóa tìm kiếm
    // Lấy thông tin người dùng từ localStorage
    useEffect(() => {
        const userLogin = localStorage.getItem("userLogin");
        if (userLogin) {
            const user = JSON.parse(userLogin);
            setUserName(user.name);
        }
    }, []);
    // logic thanh header
    const handleScroll = () => {
        const currentScrollPos = window.pageYOffset;
        setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
        setPrevScrollPos(currentScrollPos);
    };

    // logic thanh header
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [prevScrollPos, visible]);

    // logic lấy sản phẩm
    useEffect(() => {
        axios
            .get("http://localhost:8080/products") // Giữ nguyên API URL nếu bạn có backend cục bộ
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => {
                console.error("There was an error fetching the data!", error);
            });
    }, []);

    // logic phân loại sản phẩm
    const nationalTeamProducts = products.filter(
        (product) => product.category.trim() === "Áo tuyển Quốc Gia"
    );
    const clubProducts = products.filter(
        (product) => product.category.trim() === "Áo CLB"
    );
    const retroProducts = products.filter(
        (product) => product.category.trim() === "Áo Retro"
    );

    // Lọc sản phẩm theo từ khóa tìm kiếm
    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // format tiền
    const formatVND = (value: number) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(value);
    };

    return (
        <div>
            {/* logic thanh header */}
            <div className={`header-home ${visible ? "visible" : "hidden"}`}>
                <div className="logo">
                    {/* Sử dụng Link của Next.js để điều hướng */}
                    <Link href="/home">
                        <Image src={logo} alt="Logo" />
                    </Link>
                </div>
                <div className="nav">
                    <Link href="/home">Trang chủ</Link>
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
                    {/* Ô nhập tìm kiếm */}
                    <input
                        type="text"
                        placeholder="Tìm kiếm sản phẩm..."
                        className="search-bar"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <i className="cart-search">
                        <FaSearch />
                    </i>
                    <span>
                        <i>
                            <FaPhoneAlt />
                        </i>{" "}
                        0339615866
                    </span>
                    <div className="cart">
                        <Link href="/users/cart" className="cart-icon">
                            <FaShoppingCart />
                        </Link>
                        <div className="cart-count">{getTotalItems()}</div>
                    </div>
                    <div className="cart">
                        <Link href="/users/profile">
                            <i className="cart-icon">
                                <FaUser />
                            </i>
                            {userName && <h1>Xin chào, {userName}!</h1>}
                        </Link>
                        <Link href="/users/login" className="text-red-700">
                            Đăng xuất
                        </Link>
                    </div>
                </div>
            </div>

            {/* Carousel phần chuyển ảnh */}
            <div className="mt-32">
                <Swiper
                    spaceBetween={30}
                    centeredSlides={true}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={true}
                    modules={[Autoplay, Pagination, Navigation]}
                    className="mySwiper"
                >
                    <SwiperSlide>
                        <Image src={carousel1} className="d-block w-100" alt="Slide 1" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Image src={carousel2} className="d-block w-100" alt="Slide 2" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Image src={carousel3} className="d-block w-100" alt="Slide 3" />
                    </SwiperSlide>
                </Swiper>
            </div>

            {/* Kết quả tìm kiếm sản phẩm */}
            {searchTerm && (
                <section className="services" id="search-results">
                    <div className="heading">
                        <h2 className="text-3xl text-center mb-8">Kết quả tìm kiếm</h2>
                    </div>
                    <div id="products" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((product) => (
                                <Link
                                    href={`/users/products/${product.id}`}
                                    key={`search-${product.id}`}
                                    className="block p-4 bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105"
                                >
                                    <div className="relative pb-4/3"> {/* Tạo tỷ lệ 4:3 cho hình ảnh */}
                                        <Image
                                            className="w-full h-full object-cover rounded-lg"
                                            src={product.images}
                                            alt={product.name}
                                            width={400}
                                            height={300} // Điều chỉnh kích thước ảnh cho phù hợp
                                        />
                                    </div>
                                    <div className="mt-4">
                                        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                                        <h2 className="text-xl font-bold text-red-500 mt-2">{formatVND(product.price)}</h2>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <p className="col-span-full text-center text-gray-500">Không tìm thấy sản phẩm nào!</p>
                        )}
                    </div>
                </section>
            )}



            {/* Phần sản phẩm */}
            <section className="services" id="country">
                <div className="heading">
                    <h2 className="text-3xl">Áo bóng đá bản tuyển Quốc Gia</h2>
                </div>
                <div id="products" className="services-container">
                    {nationalTeamProducts.map((product) => (
                        <Link
                            href={`/users/products/${product.id}`}
                            key={`national-${product.id}`}
                            className="box"
                        >
                            <div className="box-img">
                                <Image
                                    className="img-products"
                                    src={product.images}
                                    alt={product.name}
                                    width={400}
                                    height={400}
                                />
                            </div>
                            <h3 className="h3">{product.name}</h3>
                            <h2 className="h2">{formatVND(product.price)}</h2>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Phần sản phẩm CLB */}
            <section className="services" id="club">
                <div className="heading">
                    <h2 className="text-3xl">Áo bóng đá bản CLB</h2>
                </div>
                <div id="products" className="services-container">
                    {clubProducts.map((product) => (
                        <Link
                            href={`/users/products/${product.id}`}
                            key={`club-${product.id}`}
                            className="box"
                        >
                            <div className="box-img">
                                <Image
                                    className="img-products"
                                    src={product.images}
                                    alt={product.name}
                                    width={400} // Đảm bảo thêm width/height trong Image
                                    height={400}
                                />
                            </div>
                            <h3 className="h3">{product.name}</h3>
                            <h2 className="h2">{formatVND(product.price)}</h2>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Phần sản phẩm Retro */}
            <section className="services" id="retro">
                <div className="heading">
                    <h2 className="text-3xl">Áo bóng đá bản Retro</h2>
                </div>
                <div id="products" className="services-container">
                    {retroProducts.map((product) => (
                        <Link
                            href={`/users/products/${product.id}`}
                            key={`retro-${product.id}`}
                            className="box"
                        >
                            <div className="box-img">
                                <Image
                                    className="img-products"
                                    src={product.images}
                                    alt={product.name}
                                    width={400} // Đảm bảo thêm width/height trong Image
                                    height={400}
                                />
                            </div>
                            <h3 className="h3">{product.name}</h3>
                            <h2 className="h2">{formatVND(product.price)}</h2>
                        </Link>
                    ))}
                </div>
            </section>
            {/* Phần feedback */}
            <section>
                <div className="bg-white py-16">
                    <h2 className="text-4xl font-bold text-center mb-12">Awesome feedback</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
                        {/* Feedback 1 */}
                        <div className="relative">
                            <Image
                                src={feedback1}
                                alt="Feedback 1"
                                className="rounded-lg object-cover"
                                width={300}
                                height={300}
                            />
                        </div>

                        {/* Feedback 2 */}
                        <div className="relative">
                            <Image
                                src={feedback2}
                                alt="Feedback 2"
                                className="rounded-lg object-cover"
                                width={300}
                                height={400}
                            />
                        </div>

                        {/* Feedback 3 */}
                        <div className="relative">
                            <Image
                                src={feedback3}
                                alt="Feedback 3"
                                className="rounded-lg object-cover"
                                width={400}
                                height={400}
                            />
                        </div>

                        {/* Feedback 4 */}
                        <div className="relative">
                            <Image
                                src={feedback4}
                                alt="Feedback 4"
                                className="rounded-lg object-cover"
                                width={300}
                                height={400}
                            />
                        </div>

                        {/* Feedback 5 */}
                        <div className="relative">
                            <Image
                                src={feedback5}
                                alt="Feedback 5"
                                className="rounded-lg object-cover"
                                width={300}
                                height={400}
                            />
                        </div>

                        {/* Feedback 6 */}
                        <div className="relative">
                            <Image
                                src={feedback6}
                                alt="Feedback 6"
                                className="rounded-lg object-cover"
                                width={300}
                                height={400}
                            />
                        </div>

                        {/* Feedback 7 */}
                        <div className="relative">
                            <Image
                                src={feedback7}
                                alt="Feedback 7"
                                className="rounded-lg object-cover"
                                width={500}
                                height={600}
                            />
                        </div>

                        {/* Feedback 8 */}
                        <div className="relative">
                            <Image
                                src={feedback8}
                                alt="Feedback 8"
                                className="rounded-lg object-cover"
                                width={300}
                                height={400}
                            />
                        </div>
                    </div>
                </div>
            </section>
            <hr />
                    {/* Phần footer */}
                    <footer className="bg-white py-10">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4 md:px-0">
                
                
                <div>
                    <h2 className="text-2xl font-bold mb-4">VỀ VUA ÁO BÓNG ĐÁ</h2>
                    <p className="text-gray-700">
                        Chúng tôi được tạo ra với mục đích mang lại thật nhiều điều tích cực cho cộng đồng những người yêu bóng đá
                         trên toàn đất nước Việt Nam. Với chất lượng sản phẩm cùng dịch vụ chăm sóc khách hàng kỹ lưỡng,
                        tỉ mỉ, Vua Áo Bóng Đá hi vọng sẽ là một địa chỉ đáng tin cậy dành cho tất cả các anh em yêu bóng đá.
                    </p>
                    <p className="text-gray-700 mt-4">
                        <strong>Điện thoại:</strong> 0339615866
                        <br />
                        <strong>Email:</strong> vuaaobongda6868@gmail.com
                    </p>
                </div>

                <div>
                    <h2 className="text-2xl font-bold mb-4">HỖ TRỢ KHÁCH HÀNG</h2>
                    <ul className="text-gray-700">
                        <li className="mb-2">Tìm kiếm</li>
                        <li className="mb-2">Giới thiệu</li>
                        <li className="mb-2">Chính sách đổi trả</li>
                        <li className="mb-2">Chính sách bảo mật</li>
                        <li className="mb-2">Điều khoản dịch vụ</li>
                        <li className="mb-2">Liên hệ</li>
                    </ul>
                </div>

                <div>
                    <h2 className="text-2xl font-bold mb-4">FANPAGE FACEBOOK</h2>
                    <div className="text-gray-700">
                        {/* Bạn có thể thay phần này bằng đoạn mã của Facebook fanpage plugin */}
                        <p>Theo dõi chúng tôi trên Facebook để cập nhật các tin tức mới nhất!</p>
                        <div className="mt-4">
                           
                        </div>
                    </div>
                </div>
            </div>
        </footer>
        </div>
    );
}
