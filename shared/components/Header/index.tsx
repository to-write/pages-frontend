import classNames from 'classnames/bind'
import styles from './index.module.scss'

const cx = classNames.bind(styles)

const Header = () => {
  return <header className={cx('header-container')}>header 내용</header>
}

export default Header
