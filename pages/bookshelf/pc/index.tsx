import classNames from 'classnames/bind'
import TextField from '../../../shared/components/TextField'
import styles from './index.module.scss'

const cx = classNames.bind(styles)

const BookshelfPcTemplate = () => {
  return (
    <div className={cx('bookshelf-pc')}>
      <section className='bookshelf-pc__contents'>
        <TextField className='bookshelf-pc__input' isSubmit placeholder='문장을 입력해보세요' withProfileImg />
      </section>
    </div>
  )
}

export default BookshelfPcTemplate
