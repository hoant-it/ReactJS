
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Styles from './Sidebar.module.scss';
import { useContext } from 'react';

import { Context } from '~/context/Context';

const cx = classNames.bind(Styles);

function MenuItem({ title, to, icon }) {
const context=useContext(Context)

  return (
    <NavLink className={(nav) => cx('menu-item', { active: nav.isActive })} to={to} onClick={()=>window.localStorage.setItem('scrollTop', context.sidebarTop)}>
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
