import classNames from 'classnames/bind';
import TippyHeadless from '@tippyjs/react/headless'; //tao tooltip
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState, useRef } from 'react';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import styles from './Search.module.scss';
import AccountItem from '~/components/AccountItem';
import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { SearchIcon } from '~/components/Icons';
import { useDebounce } from '~/hooks';

const cx = classNames.bind(styles);
function Search() {
  const [seachValue, setSearchValue] = useState('');
  const [searchReult, setSearchResult] = useState([]);
  const [showResult, setShowResult] = useState(true);
  const [loading, setLoading] = useState(false);

  //1: dau tien debounced nhan ''
  const debounced = useDebounce(seachValue, 800);

  const inputRef = useRef();

  useEffect(() => {
    if (!debounced.trim()) {
      setSearchResult([]);
      return;
    }
    //http://portal.wacoal.com.vn/admin/MenuListLoadWeb/${encodeURIComponent(debounced)}
    //
    fetch(`https://tiktok.fullstack.edu.vn/api/users/search?q=${encodeURIComponent(debounced)}&type=less`)
      .then((res) => res.json())
      .then((res) => {
        setSearchResult(res.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [debounced]);

  const handleClear = () => {
    setSearchValue('');
    setSearchResult([]);
    inputRef.current.focus();
  };

  const handleHideResult = () => {
    setShowResult(false);
  };

  const hanldeChange = (e) => {
    const searchValue = e.target.value;
    if (!seachValue.startsWith(' ')) {
      setSearchValue(searchValue);
    }
  };

  return (
    //Using a wrapper <div> tag around the reference element solves this by creating a new parentNode context.
    <div>
      <TippyHeadless
        interactive={true}
        // appendTo={() => document.body}
        visible={showResult && searchReult.length > 0}
        render={(attrs) => (
          <div className={cx('search-result')} tabIndex="-1" {...attrs}>
            <PopperWrapper>
              <h4 className={cx('search-title')}>Accounts</h4>
              {searchReult.map((result) => (
                <AccountItem key={result.id} data={result}></AccountItem>
                // <AccountItem key={result.MenuCode} data={result}></AccountItem>
              ))}
            </PopperWrapper>
          </div>
        )}
        onClickOutside={handleHideResult}>
        <div className={cx('search')}>
          <input
            ref={inputRef}
            value={seachValue}
            placeholder="Search account and videos"
            spellCheck={false}
            onChange={hanldeChange}
            onFocus={() => setShowResult(true)}></input>
          {!!seachValue && !loading && (
            <button className={cx('clear')} onClick={() => handleClear()}>
              <FontAwesomeIcon icon={faCircleXmark}></FontAwesomeIcon>
            </button>
          )}

          {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner}></FontAwesomeIcon>}

          <button className={cx('search-btn')} onMouseDown={(e) => e.preventDefault()}>
            <SearchIcon></SearchIcon>
          </button>
        </div>
      </TippyHeadless>
    </div>
  );
}

export default Search;
