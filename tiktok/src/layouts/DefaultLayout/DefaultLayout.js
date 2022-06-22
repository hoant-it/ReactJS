import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Header from '../components/Header';
import Sidebar from '../components/SidebarV2';
import styles from './DefaultLayout.module.scss';
import { memo, useState } from 'react';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
  const [toggle, setToggle] = useState(true);
  const handleToggle = () => {
    setToggle(!toggle);
  };

  const [expand, setExpand] = useState(true);
  const handleExpand = () => {
    setExpand(!expand);
  };

  return (
    <div className={cx('wrapper')}>
      <Header onToggle={handleToggle} onExpand={handleExpand} expand={expand} />
      <div className={cx('container')}>
        <Sidebar toggle={toggle} expand={expand} />

        <div className={cx(toggle ? 'content' : 'content-full')}>{children}</div>
      </div>
    </div>
  );
}
DefaultLayout.prototype = {
  children: PropTypes.node.isRequired,
};

export default memo(DefaultLayout);
