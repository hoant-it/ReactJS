import classNames from 'classnames/bind';
import Styles from './Sidebar.module.scss';
import SidebarItem from './SidebarItem';
import Items from './Data/sidebar.json';
import { memo } from 'react';

const cx = classNames.bind(Styles);

function Sidebar({toggle,expand}) {
  console.log('re-render')
  return (
    <div className={cx(toggle?'sidebar':'sidebar-hide')}>
      {Items.map((item, index) => (
        <SidebarItem key={index} {...item} item={item} expand={expand}></SidebarItem>
      ))}
    </div>
  );
}

export default memo(Sidebar);
