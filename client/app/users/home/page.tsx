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
type Customer = {
    id: number;
    name: string;
    email: string;
    address: string;
    banned: boolean;
};

export default function UserHome() {
    const [showDropdown, setShowDropdown] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);
    const { getTotalItems } = useCart(); // Lấy số lượng sản phẩm trong giỏ hàng
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);
    const [userName, setUserName] = useState("");

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
                    <div className="cart">
                        <i className="cart-icon">
                            <FaUser />
                        </i>
                        {userName && <h1>Xin chào, {userName}!</h1>}
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
        </div>
    );
}
