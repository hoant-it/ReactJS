import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import Styles from './Button.module.scss';

const cx = classNames.bind(Styles);

function Button({
  to,
  href,
  primary = false,
  outline = false,
  rounded=false,
  text = false,
  small = false,
  large = false,
  disable = false,
  children,
  className,
  leftIcon,
  rightIcon,
  onClick,
  ...passProps
}) {
  let Comp = 'button';
  const props = {
    onClick,
    ...passProps,
  };

  if (to) {
    props.to = to;
    Comp = Link;
  } else if (href) {
    props.href = href;
    Comp = 'a';
  }
  if (disable) {
    Object.keys(props).forEach(key=>{
        if(key.startsWith('on') && typeof props[key]==='function'){
            delete props[key];
        }
    })
  }

  const classes = cx('wrapper', {
    [className]:className,
    primary,
    outline,
    text,
    small,
    large,
    disable,
    rounded
  });
  return (
    <Comp className={classes} {...props}>
        {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
      <span className={cx('title')}>{children}</span>
      {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
    </Comp>
  );
}

export default Button;