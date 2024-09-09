"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillGearFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch, BsJustify, BsFillBellFill } from 'react-icons/bs';
import { BiCategory, BiSolidLogOut } from 'react-icons/bi';
import "../styles/scss/adminDashboard.scss"

export default function Sidebar({ openSidebarToggle, OpenSidebar }: { openSidebarToggle: boolean, OpenSidebar: () => void }) {
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
          <Link href='/'>
            <BiSolidLogOut className='icon' /> Log out
          </Link>
        </li>
      </ul>
    </aside>
  )
}
