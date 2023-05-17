import classNames from 'classnames/bind'
import styles from './index.module.scss'

const cx = classNames.bind(styles)

const BookshelfPage = () => {
  return <div className={cx('bookshelf')}>내 책장 페이지</div>
}

export default BookshelfPage

BookshelfPage.LayoutProps = {
  metaTitle: '로그인',
}
