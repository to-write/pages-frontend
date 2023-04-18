import classNames from 'classnames/bind'
import styles from './index.module.scss'

const cx = classNames.bind(styles)

const Footer = () => {
  return <footer className={cx('footer-container')}>footer 내용</footer>
}

export default Footer
