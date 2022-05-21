import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion, faCircleXmark, faEarthAsia, faEllipsisVertical, faKeyboard, faMagnifyingGlass, faSpinner } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless'; //tao tooltip
import { useEffect, useState } from 'react';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import styles from './Header.module.scss';
import images from '~/assets/images';
import AccountItem from '~/components/AccountItem';
import Button from '~/components/Button';
import Menu from '~/components/Popper/Menu';

const cx = classNames.bind(styles);
const MENU_ITEMS=[
{
  icon:<FontAwesomeIcon icon={faEarthAsia}></FontAwesomeIcon>,
  title:'English',
},
{
  icon:<FontAwesomeIcon icon={faCircleQuestion}></FontAwesomeIcon>,
  title:'Feeback and help',
  to:'/feedback'
},
{
  icon:<FontAwesomeIcon icon={faKeyboard}></FontAwesomeIcon>,
  title:'Keybard Shortcuts',
},
]

function Header() {
  const [searchReult, setSearchResult] = useState([]);
  useEffect(() => {
    setTimeout(() => {
      setSearchResult([]);
    }, 0);
  }, []);
  return (
    <header className={cx('wrapper')}>
      <div className={cx('inner')}>
        <div className={cx('logo')}>
          <img src={images.logo} alt="tiktok"></img>
        </div>
        <Tippy
          interactive={true}
          visible={searchReult.length > 0}
          render={(attrs) => (
            <div className={cx('search-result')} tabIndex="-1" {...attrs}>
              <PopperWrapper>
                <h4 className={cx('search-title')}>Accounts</h4>

                <AccountItem />
                <AccountItem />
                <AccountItem />
                <AccountItem />
              </PopperWrapper>
            </div>
          )}>
          <div className={cx('search')}>
            <input placeholder="Search account and videos" spellCheck={false}></input>
            <button className={cx('clear')}>
              <FontAwesomeIcon icon={faCircleXmark}></FontAwesomeIcon>
            </button>
            <FontAwesomeIcon className={cx('loading')} icon={faSpinner}></FontAwesomeIcon>
            {/**Loading */}

            <button className={cx('search-btn')}>
              <FontAwesomeIcon icon={faMagnifyingGlass}></FontAwesomeIcon>
            </button>
          </div>
        </Tippy>
        <div className={cx('actions')}>
          <Button text>Upload</Button>
          <Button primary>Log in</Button>

          <Menu
          items={MENU_ITEMS}
          >
            <button className={cx('more-btn')}>
              <FontAwesomeIcon icon={faEllipsisVertical}></FontAwesomeIcon>{' '}
            </button>
          </Menu>
        </div>
      </div>
    </header>
  );
}

export default Header;
