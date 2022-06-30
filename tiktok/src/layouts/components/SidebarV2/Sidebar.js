import { useRef, memo, useLayoutEffect, useContext, useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import Styles from './Sidebar.module.scss';
import SidebarItem from './SidebarItem';

import { Context } from '~/context/Context';


import * as MainServices from '~/services/main/MainServices';

const cx = classNames.bind(Styles);

function Sidebar({ toggle }) {
  let top = useRef();
  const scrollContext = useContext(Context);
  const [items, setItems] = useState([]);

  useLayoutEffect(() => {
    const fetchApiDataMenuSideBar = async () => {
      const dataSideBarMenu = await MainServices.sp_Wacoal_LoadMenuWeb_V1();
      setItems(dataSideBarMenu);
    };
    fetchApiDataMenuSideBar();
  }, []);

  useEffect(() => {
    console.log('useEffect render');
    const scrollTopDefault = JSON.parse(window.localStorage.getItem('scrollTop'));
    top.current.scrollTop = scrollTopDefault || 0;
  }, [items]);

  return (
    <div
      className={cx(toggle ? 'sidebar' : 'sidebar-hide')}
      id={'sidebar'}
      ref={top}
      onScroll={scrollContext.handleScroll}
    >
      {items.map((item, index) => (
        <SidebarItem key={index} {...item} item={item}></SidebarItem>
      ))}
    </div>
  );
}

export default memo(Sidebar);
