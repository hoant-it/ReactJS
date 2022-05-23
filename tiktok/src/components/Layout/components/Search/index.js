import classNames from 'classnames/bind';
import TippyHeadless from '@tippyjs/react/headless'; //tao tooltip
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState, useRef } from 'react';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import styles from './Search.module.scss';
import AccountItem from '~/components/AccountItem';
import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { SearchIcon } from '~/components/Icons';

const cx = classNames.bind(styles);
function Search() {
  const [seachValue, setSearchValue] = useState('');
  const [searchReult, setSearchResult] = useState([]);
  const [showResult, setShowResult] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!seachValue.trim()) {
      setSearchResult([]);
      return;
    }
    fetch(`https://tiktok.fullstack.edu.vn/api/users/search?q=${encodeURIComponent(seachValue)}&type=less`)
      .then((res) => res.json())
      .then((res) => {
        setSearchResult(res.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [seachValue]);

  //   useEffect(() => {
  //     setTimeout(() => {
  //       setSearchResult([1, 2, 3]);
  //     }, 0);
  //   }, []);

  const inputRef = useRef();

  const handleClear = () => {
    setSearchValue('');
    setSearchResult([]);
    inputRef.current.focus();
  };

  const handleHideResult = () => {
    setShowResult(false);
  };

  return (
    <TippyHeadless
      interactive={true}
      visible={showResult && searchReult.length > 0}
      render={(attrs) => (
        <div className={cx('search-result')} tabIndex="-1" {...attrs}>
          <PopperWrapper>
            <h4 className={cx('search-title')}>Accounts</h4>
            {searchReult.map((result) => (
              <AccountItem key={result.id} data={result}></AccountItem>
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
          onChange={(e) => setSearchValue(e.target.value)}
          onFocus={() => setShowResult(true)}></input>
        {!!seachValue && !loading && (
          <button className={cx('clear')} onClick={() => handleClear()}>
            <FontAwesomeIcon icon={faCircleXmark}></FontAwesomeIcon>
          </button>
        )}

        {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner}></FontAwesomeIcon>}

        <button className={cx('search-btn')}>
          <SearchIcon></SearchIcon>
        </button>
      </div>
    </TippyHeadless>
  );
}

export default Search;
