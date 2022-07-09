import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Styles from './Sidebar.module.scss';
import { useContext } from 'react';

import { Context } from '~/context/Context';

const cx = classNames.bind(Styles);

function MenuItem({ title, to, icon }) {
  const context = useContext(Context);
  // luu lai trang thai cua menusidebar
  const handleClickNavLink = () => {
    window.localStorage.setItem('scrollTop', context.sidebarTop);
    window.localStorage.setItem('statusMenu', JSON.stringify(context.arrMenuStatus));
  };

  return (
    <NavLink className={(nav) => cx('menu-item', { active: nav.isActive })} to={to} onClick={handleClickNavLink}>
      {icon}
      <span className={cx('title')}>{title}</span>
    </NavLink>
  );
}

MenuItem.propStyles = {
  title: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
};

export default MenuItem;
