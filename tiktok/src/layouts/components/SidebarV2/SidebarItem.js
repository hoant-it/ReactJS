import classNames from 'classnames/bind';
import Styles from './Sidebar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useState, useContext } from 'react';
import MenuItem from './MenuItem';

import { Context } from '~/context/Context';

const cx = classNames.bind(Styles);
function SidebarItem({ item }) {
  const context = useContext(Context);

  const [open, setOpen] = useState(false);

  const handleOpenSidebarItem = (event) => {
    context.handleOpenSidebarItem(event, open);
    setOpen(!open);
  };

  if (item.childrens) {
    let objIndex = context.arrMenuStatus.findIndex((obj) => obj.id === item.id);
    if (objIndex >= 0) {
      return (
        <div className={cx(context.arrMenuStatus[objIndex].status ? 'sidebar-item-open' : 'sidebar-item')}>
          <div className={cx('sidebar-title')} onClick={handleOpenSidebarItem} id={item.id}>
            <span id={item.id}>
              <FontAwesomeIcon icon={faFolder} className={cx('icon')}></FontAwesomeIcon>
              {item.title}
            </span>
            {!context.arrMenuStatus[objIndex].status ? (
              <FontAwesomeIcon id={item.id} icon={faPlus} className={cx('toggle-btn')}></FontAwesomeIcon>
            ) : (
              <FontAwesomeIcon id={item.id} icon={faMinus} className={cx('toggle-btn')}></FontAwesomeIcon>
            )}
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
            {!open ? (
              <FontAwesomeIcon
                id={item.id}
                icon={faPlus}
                className={cx('toggle-btn')}
                // onClick={() => setOpen(!open)}
              ></FontAwesomeIcon>
            ) : (
              <FontAwesomeIcon
                id={item.id}
                icon={faMinus}
                className={cx('toggle-btn')}
                // onClick={() => setOpen(!open)}
              ></FontAwesomeIcon>
            )}
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
