import classNames from 'classnames/bind';
import Styles from './Sidebar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faFolder } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import MenuItem from './MenuItem';

const cx = classNames.bind(Styles);
const arrMenuStatus = JSON.parse(window.localStorage.getItem('statusMenu')) || [];
function SidebarItem({ item, expand }) {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    setOpen(expand);
  }, [expand]);

  const handleOpenSidebarItem = (event) => {
    // console.log(event.target.id);
    // arrMenuStatus = JSON.parse(window.localStorage.getItem('statusMenu'));
    let objIndex = arrMenuStatus.findIndex((obj) => obj.id === event.target.id);
    if (objIndex >= 0) {
      arrMenuStatus[objIndex].status = !arrMenuStatus[objIndex].status;
    } else {
      let objMenuStatus = {};
      objMenuStatus.id = event.target.id;
      objMenuStatus.status = !open;
      arrMenuStatus.push(objMenuStatus);
    }
    setOpen(!open);
    window.localStorage.setItem('statusMenu', JSON.stringify(arrMenuStatus));
  };

  if (item.childrens) {
    let objIndex = arrMenuStatus.findIndex((obj) => obj.id === item.title);
    if (objIndex >= 0) {
      return (
        <div className={cx(arrMenuStatus[objIndex].status ? 'sidebar-item-open' : 'sidebar-item')}>
          <div className={cx('sidebar-title')} id={item.title} onClick={handleOpenSidebarItem}>
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
              <SidebarItem key={index} item={child} expand={expand}></SidebarItem>
            ))}
          </div>
        </div>
      );
    } else {
      return (
        <div className={cx(open ? 'sidebar-item-open' : 'sidebar-item')}>
          <div className={cx('sidebar-title')} id={item.title} onClick={handleOpenSidebarItem}>
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
              <SidebarItem key={index} item={child} expand={expand}></SidebarItem>
            ))}
          </div>
        </div>
      );
    }
  } else {
    return <MenuItem title={item.title} to={item.path || ''} icon={null}></MenuItem>;
  }

  //   return (
  //     <div className={cx(open ? 'sidebar-item-open' : 'sidebar-item')}>
  //       <div className={cx('sidebar-title')} id={item.title} onClick={handleOpenSidebarItem}>
  //         <span>
  //           <FontAwesomeIcon icon={faFolder} className={cx('icon')}></FontAwesomeIcon>
  //           {item.title}
  //         </span>
  //         <FontAwesomeIcon
  //           icon={faChevronDown}
  //           className={cx('toggle-btn')}
  //           // onClick={() => setOpen(!open)}
  //         ></FontAwesomeIcon>
  //       </div>
  //       <div className={cx('sidebar-content')}>
  //         {item.childrens.map((child, index) => (
  //           <SidebarItem key={index} item={child} expand={expand}></SidebarItem>
  //         ))}
  //       </div>
  //     </div>
  //   );
  // } else {
  //   return (
  //     <MenuItem title={item.title} to={item.path || ''} icon={null}></MenuItem>
  //     // <a href={item.path || '#'} className={cx('sidebar-item')}>
  //     //   <span>{item.title}</span>
  //     // </a>
  //   );
  // }
}

export default SidebarItem;
