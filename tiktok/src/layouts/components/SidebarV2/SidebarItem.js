import classNames from 'classnames/bind';
import Styles from './Sidebar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faFolder } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState, useContext } from 'react';
import MenuItem from './MenuItem';

import { Context } from '~/context/Context';

const cx = classNames.bind(Styles);
const arrMenuStatus = JSON.parse(window.localStorage.getItem('statusMenu')) || [{ id: 'MN00039', status: true }];
function SidebarItem({ item }) {
  const context = useContext(Context);

  const [open, setOpen] = useState(true);

  useEffect(() => {
    setOpen(context.expand);
  }, [context.expand]);

  const handleOpenSidebarItem = (event) => {
    let id = event.target.id;
    let objIndex = arrMenuStatus.findIndex((obj) => obj.id === id);
    if (objIndex >= 0) {
      arrMenuStatus[objIndex].status = !arrMenuStatus[objIndex].status;
    } else {
      let objMenuStatus = {};
      if (id !== '') {
        objMenuStatus.id = id;
        objMenuStatus.status = !open;
        arrMenuStatus.push(objMenuStatus);
      }
    }
    setOpen(!open);
    window.localStorage.setItem('statusMenu', JSON.stringify(arrMenuStatus));
  };

  if (item.childrens) {
    let objIndex = arrMenuStatus.findIndex((obj) => obj.id === item.id);
    if (objIndex >= 0) {
      return (
        <div className={cx(arrMenuStatus[objIndex].status ? 'sidebar-item-open' : 'sidebar-item')}>
          <div className={cx('sidebar-title')} onClick={handleOpenSidebarItem} id={item.id}>
            <span id={item.id}>
              <FontAwesomeIcon icon={faFolder} className={cx('icon')}></FontAwesomeIcon>
              {item.title}
            </span>
            <FontAwesomeIcon
              id={item.id}
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
        <div className={cx(open ? 'sidebar-item-open' : 'sidebar-item')}>
          <div className={cx('sidebar-title')} id={item.id} onClick={handleOpenSidebarItem}>
            <span id={item.id}>
              <FontAwesomeIcon icon={faFolder} className={cx('icon')}></FontAwesomeIcon>
              {item.title}
            </span>
            <FontAwesomeIcon
              id={item.id}
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
    }
  } else {
    return <MenuItem title={item.title} to={item.path || ''} icon={null}></MenuItem>;
  }
}

export default SidebarItem;
