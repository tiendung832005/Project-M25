"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillGearFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch, BsJustify, BsFillBellFill } from 'react-icons/bs';
import { BiCategory, BiSolidLogOut } from 'react-icons/bi';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import "../../../styles/scss/adminDashboard.scss";

// Dữ liệu biểu đồ
const data = [
  { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
  { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
  { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
];

// Sidebar component
function Sidebar({ openSidebarToggle, OpenSidebar }: { openSidebarToggle: boolean, OpenSidebar: () => void }) {
  const router = useRouter();

  const handleLogout = () => {
    document.cookie = 'token=; Max-Age=0; path=/'; // Xóa token
    router.push('/'); // Chuyển hướng về trang đăng nhập
  };

  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
      <div className='sidebar-title'>
        <div className='sidebar-brand'>
          <BsCart3 className='icon_header' /> Vua Áo Bóng Đá
        </div>
        <span className='icon close_icon' onClick={OpenSidebar}>X</span>
      </div>
      <ul className='sidebar-list'>
        <li className='sidebar-list-item'>
          <Link href='/admin/dashboard'>
            <BsGrid1X2Fill className='icon' /> Dashboard
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link href='/admin/products'>
            <BsFillArchiveFill className='icon' /> Products
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link href='/admin/order'>
            <BsFillGrid3X3GapFill className='icon' /> Order
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link href='/admin/customer'>
            <BsPeopleFill className='icon' /> Customers
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link href='/admin/category'>
            <BiCategory  className='icon' /> Category
          </Link>
        </li>
        <li className='sidebar-list-item' style={{ marginTop: "220px" }}>
          <a onClick={handleLogout}>
            <BiSolidLogOut className='icon' /> Log out
          </a>
        </li>
      </ul>
    </aside>
  );
}

// Header component
function Header({ OpenSidebar }: { OpenSidebar: () => void }) {
  return (
    <header className='header'>
      <div className='menu-icon'>
        <BsJustify className='icon' onClick={OpenSidebar} />
      </div>
      <div className='header-left'>
        <BsSearch className='icon' />
      </div>
      <div className='header-right'>
        <BsFillBellFill className='icon' />
        <BsFillEnvelopeFill className='icon' />
        <i><BsPersonCircle className='icon' /></i>
        <p className='hello'>Xin chào Admin!</p>
      </div>
    </header>
  );
}

// Home component với nội dung thực tế
function Home() {
  return (
    <main className='main-container'>
      <div className='main-title'>
        <h3>DASHBOARD</h3>
      </div>

      <div className='main-cards'>
        <div className='card'>
          <div className='card-inner'>
            <h3>PRODUCTS</h3>
            <BsFillArchiveFill className='card_icon' />
          </div>
          <h1>300</h1>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <h3>ORDER</h3>
            <BsFillGrid3X3GapFill className='card_icon' />
          </div>
          <h1>12</h1>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <h3>CUSTOMERS</h3>
            <BsPeopleFill className='card_icon' />
          </div>
          <h1>33</h1>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <h3>ALERTS</h3>
            <BsFillBellFill className='card_icon' />
          </div>
          <h1>42</h1>
        </div>
      </div>

      <div className='charts'>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="pv" fill="#8884d8" />
            <Bar dataKey="uv" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </main>
  );
}

// Main Dashboard Page component
export default function Page() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="grid-container1">
      <Sidebar openSidebarToggle={sidebarOpen} OpenSidebar={toggleSidebar} />
      <Header OpenSidebar={toggleSidebar} />
      <Home />
    </div>
  );
}
