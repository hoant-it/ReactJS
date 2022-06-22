import classNames from 'classnames/bind';
import Styles from './Sidebar.module.scss';
import SidebarItem from './SidebarItem';
import Items from './Data/sidebar.json';

const cx = classNames.bind(Styles);

function Sidebar() {
  return (
    <div className={cx('sidebar')}>
      {Items.map((item, index) => (
        <SidebarItem key={index} {...item} item={item}></SidebarItem>
      ))}
    </div>
  );
}

export default Sidebar;
