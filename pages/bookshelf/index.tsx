import classNames from 'classnames/bind'
import TextField from '../../shared/components/TextField'
import { useSessionStore } from '../../shared/store'
import styles from './index.module.scss'
import BookshelfMoTemplate from './mobile'
import BookshelfPcTemplate from './pc'

const cx = classNames.bind(styles)

const BookshelfPage = () => {
  const { isMobile } = useSessionStore()

  return <div className={cx('bookshelf')}>{isMobile ? <BookshelfMoTemplate /> : <BookshelfPcTemplate />}</div>
}

export default BookshelfPage

BookshelfPage.LayoutProps = {
  metaTitle: '로그인',
  menuType: 'BACK',
  menuName: '내 책장',
}
