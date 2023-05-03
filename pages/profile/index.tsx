import classNames from 'classnames/bind'
import { useState } from 'react'
import styles from './index.module.scss'

const cx = classNames.bind(styles)

const ProfilePage = () => {
  const [isEditable, setIsEditable] = useState<Boolean>(false)
  return (
    <div className={cx('profile')}>
      <div className={cx(isEditable ? 'profile__image-wrapper--editable' : 'profile__image-wrapper')}>
        <div className='profile__image'>프로필 이미지</div>
      </div>
      <div className={cx(isEditable ? 'profile__introduction-conatiner--editable' : 'profile__introduction-conatiner')}>
        <div className='profile__name'>이름</div>
        <div className='profile__introduction'>자기소개</div>
      </div>
    </div>
  )
}

export default ProfilePage

ProfilePage.LayoutProps = {
  metaTitle: '로그인',
}
