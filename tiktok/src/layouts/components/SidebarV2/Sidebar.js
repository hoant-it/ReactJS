import classNames from 'classnames/bind';
import Styles from './Sidebar.module.scss';
import SidebarItem from './SidebarItem';
import Items from './Data/sidebar.json';
import { useRef, memo, useLayoutEffect } from 'react';

const cx = classNames.bind(Styles);

function Sidebar({ toggle }) {
  let top = useRef();

  useLayoutEffect(() => {
    top.current.scrollTop = window.localStorage.getItem('scrollTop') || 0;
  }, []);

  const handleScroll = (event) => {
    window.localStorage.setItem('scrollTop', event.target.scrollTop);
  };

  return (
    <div className={cx(toggle ? 'sidebar' : 'sidebar-hide')} id={'sidebar'} ref={top} onScroll={handleScroll}>
      {Items.map((item, index) => (
        <SidebarItem key={index} {...item} item={item} ></SidebarItem>
      ))}
    </div>
  );
}

export default memo(Sidebar);
