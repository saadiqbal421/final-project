import React, { useState, useEffect, useContext, useRef } from "react";
import { Menu } from "antd";
import { Stack, Button } from '@mui/material';
import Logo from '../public/images/logo.png';
import Link from "next/link";
import {
  AppstoreOutlined,
  CoffeeOutlined,
  LoginOutlined,
  LogoutOutlined,
  UserAddOutlined,
  CarryOutOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Context } from "../context";
import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { Layout, theme } from 'antd';

const { Item, SubMenu, ItemGroup } = Menu;
const { Header, Sider, Content } = Layout;

const TopNav = () => {
  const [current, setCurrent] = useState("");

  const { state, dispatch } = useContext(Context);
  const { user } = state;

  const router = useRouter();

  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
  }, [process.browser && window.location.pathname]);

  const logout = async () => {
    dispatch({ type: "LOGOUT" });
    window.localStorage.removeItem("user");
    const { data } = await axios.get("/api/logout");
    toast(data.message);
    router.push("/login");
  };

  return (
    <>
   <Menu mode="horizontal" selectedKeys={[current]} className="Header">
  <div className="container">
    <div className="nav_wrapper">
      <div className="logo">
        <a href="/" className="navbar-brand"><span>Travel Ease</span> </a>
      </div>
      <div className="navigation">
        <ul className="menu">
          <li className="nav__item">
            <a href="http://localhost:3001" className="weight">Shop</a>
          </li>
          {user !== null && (
            <li className="nav__item">
              <a href="http://localhost:3001/createnewpackage" className="weight">Create Tour package</a>
            </li>
          ) }{ (user == null &&
            <li className="nav__item">
              <a href="/user/become-instructor" className="weight" onClick={(e) => {
                e.preventDefault();
                if (!user) {
                  window.location.href = '/login'; // Redirect to login page
                }
              }}>Enlist Agency</a>
            </li>
          )}
          {/* {user && user.role && user.role.includes("Instructor") && (
            <li className="nav__item">
              <a href="/instructor" className="weight">Instructor</a>
            </li>
          )}
          {user !== null && (
            <li className="nav__item">
              <a href="/user" className="weight">Dashboard</a>
            </li>
          )} */}
        <></>
              </ul>
            </div>
            {user === null && (
              <>
                <div className="nav_right">
                  <Button href="/login" className="register_btn" variant="contained">LOGIN</Button>
                  <span className='mobile_menu'>
                    <i class='ri-menu-line'></i>
                  </span>
                </div>
              </>
            )}
            {user !== null && (
              <>
                <div className="nav_right">
                  <Button onClick={logout} href="/register" className="chlogout" variant="contained">
                    LOGOUT
                  </Button>
                  <span className='mobile_menu'>
                    <i class='ri-menu-line'></i>
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </Menu>
    </>
  );
};

export default TopNav;
