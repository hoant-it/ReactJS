import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  // faChevronDown,
  // faChevronUp,
  faCircleQuestion,
  faCoins,
  faEarthAsia,
  faEllipsisVertical,
  faGear,
  faKeyboard,
  faSignOut,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react'; //tao tooltip
import 'tippy.js/dist/tippy.css';
import { Link } from 'react-router-dom';

import styles from './Header.module.scss';
import images from '~/assets/images';
import Button from '~/components/Button';
import Menu from '~/components/Popper/Menu/Menu';
import { InboxIcon, MessageIcon, UploadIcon } from '~/components/Icons';
import Image from '~/components/Image';
import Search from '../Search/Search';
import config from '~/config';
// import { useContext } from 'react';

// import { Context } from '~/context/Context';

const cx = classNames.bind(styles);
const MENU_ITEMS = [
  {
    icon: <FontAwesomeIcon icon={faEarthAsia}></FontAwesomeIcon>,
    title: 'English',
    children: {
      title: 'Language test',
      data: [
        {
          type: 'language',
          code: 'en',
          title: 'English',
        },
        {
          type: 'language',
          code: 'vn',
          title: 'Tiếng Việt',
        },
      ],
    },
  },
  {
    icon: <FontAwesomeIcon icon={faCircleQuestion}></FontAwesomeIcon>,
    title: 'Feedback and help',
    to: '/feedback',
  },
  {
    icon: <FontAwesomeIcon icon={faKeyboard}></FontAwesomeIcon>,
    title: 'Keyboard Shortcuts',
  },
];

function Header({ onToggle }) {
  // const context = useContext(Context);

  const currentUser = true;

  const userMenu = [
    {
      icon: <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>,
      title: 'View Profile',
      to: '/@hoaa',
    },
    {
      icon: <FontAwesomeIcon icon={faCoins}></FontAwesomeIcon>,
      title: 'get coins',
      to: '/coin',
    },
    {
      icon: <FontAwesomeIcon icon={faGear}></FontAwesomeIcon>,
      title: 'Setting',
      to: '/feedback',
    },
    ...MENU_ITEMS,
    {
      icon: <FontAwesomeIcon icon={faSignOut}></FontAwesomeIcon>,
      title: 'Log out',
      to: '/logout',
      separate: true,
    },
  ];

  //Handle logic
  const handleMenuChange = (menuItem) => {
    switch (menuItem.style) {
      case 'language':
        console.log(menuItem);
        break;
      default:
        console.log(menuItem);
    }
  };

  return (
    <header className={cx('wrapper')}>
      <div className={cx('inner')}>
        <div className={cx('logo')}>
          <Link to={config.routes.home} className={cx('logo-link')}>
            <img src={images.logo} alt="tiktok"></img>
          </Link>
          <div className={cx('action-left')}>
            <Tippy delay={[0, 200]} content="Show/Off" placement="bottom" offset={[12, 8]}>
              <button className={cx('toggle-btn')} onClick={onToggle}>
                <FontAwesomeIcon icon={faBars}></FontAwesomeIcon>
              </button>
            </Tippy>
            {/* bo hieu ung expan all

            {!context.expand ? (
              <Tippy delay={[0, 200]} content="Expand" placement="bottom" offset={[12, 8]}>
                <button className={cx('expand-btn')} onClick={context.handleExpand}>
                  <FontAwesomeIcon icon={faChevronDown}></FontAwesomeIcon>
             
                </button>
              </Tippy>
            ) : (
              <Tippy delay={[0, 200]} content="Collapse" placement="bottom" offset={[12, 8]}>
                <button className={cx('expand-btn')} onClick={context.handleExpand}>
              
                  <FontAwesomeIcon icon={faChevronUp}></FontAwesomeIcon>
                </button>
              </Tippy>
            )}
            */}
          </div>
        </div>
        <Search></Search>

        <div className={cx('actions')}>
          {currentUser ? (
            <>
              <Tippy delay={[0, 200]} content="Upload video" placement="bottom" offset={[12, 8]}>
                <button className={cx('action-btn')}>
                  <UploadIcon></UploadIcon>
                </button>
              </Tippy>
              <Tippy delay={[0, 50]} content="Message" placement="bottom">
                <button className={cx('action-btn')}>
                  <MessageIcon />
                </button>
              </Tippy>
              <Tippy delay={[0, 50]} content="Inbox" placement="bottom">
                <button className={cx('action-btn')}>
                  <InboxIcon />
                  <span className={cx('badge')}>12</span>
                </button>
              </Tippy>
            </>
          ) : (
            <>
              <Button text>Upload</Button>
              <Button primary>Log in</Button>
            </>
          )}

          <Menu items={currentUser ? userMenu : MENU_ITEMS} onChange={handleMenuChange}>
            {currentUser ? (
              <Image src="" className={cx('user-avatar')} alt="Nguyen Van A" fallback="/logo192.png"></Image>
            ) : (
              <button className={cx('more-btn')}>
                <FontAwesomeIcon icon={faEllipsisVertical}></FontAwesomeIcon>{' '}
              </button>
            )}
          </Menu>
        </div>
      </div>
    </header>
  );
}

export default Header;
