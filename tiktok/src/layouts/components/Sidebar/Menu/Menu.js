import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Styles from './Menu.module.scss';

const cx = classNames.bind(Styles);
function Menu({ children }) {
  return <nav className={cx('menu')}>{children}</nav>;
}

Menu.propStyles = {
  children: PropTypes.node.isRequired,
};

export default Menu;
