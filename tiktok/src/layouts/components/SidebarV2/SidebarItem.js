import classNames from 'classnames/bind';
import Styles from './Sidebar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faFolder } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import MenuItem from './MenuItem';

const cx = classNames.bind(Styles);

function SidebarItem({ item }) {
  const [open, setOpen] = useState(false);
  if (item.childrens) {
    return (
      <div className={cx(open ? 'sidebar-item-open' : 'sidebar-item')}>
        <div className={cx('sidebar-title')} onClick={() => setOpen(!open)}>
          <span>
            <FontAwesomeIcon icon={faFolder} className={cx('icon')}></FontAwesomeIcon>
            {item.title}
          </span>
          <FontAwesomeIcon
            icon={faChevronDown}
            className={cx('toggle-btn')}
            // onClick={() => setOpen(!open)}
          ></FontAwesomeIcon>
        </div>
        <div className={cx('sidebar-content')}>
          {item.childrens.map((child, index) => (
            <SidebarItem key={index} item={child}></SidebarItem>
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <MenuItem title={item.title} to={item.path || ''} icon={null}></MenuItem>
      // <a href={item.path || '#'} className={cx('sidebar-item')}>
      //   <span>{item.title}</span>
      // </a>
    );
  }
}

export default SidebarItem;
