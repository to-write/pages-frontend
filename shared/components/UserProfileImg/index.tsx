import classNames from 'classnames/bind'
import { useSessionStore } from '../../store'
import Icon from '../Icon'
import styles from './index.module.scss'

const cx = classNames.bind(styles)

type Size = 'small' | 'regular'
interface UserProfileImgProps {
  src?: string
  alt?: string
  className?: string
  size?: Size
  editAble?: boolean
  handleEdit?: () => void
}

const MOBILE_ICON_SIZE: Record<Size, number> = {
  small: 16,
  regular: 21,
}

const PC_ICON_SIZE: Record<Size, number> = {
  small: 23,
  regular: 37,
}

const UserProfileImg = ({
  src = '',
  alt = '',
  size = 'regular',
  className = '',
  editAble = false,
  handleEdit,
}: UserProfileImgProps) => {
  const { isMobile } = useSessionStore()

  const handleEditClick = () => {
    editAble && handleEdit?.()
    !editAble && console.log('test')
  }
  // TODO: Default 이미지 디자인 요청
  const DEFAULT_SRC = 'https://cdn.pixabay.com/photo/2014/06/03/19/38/road-sign-361514_960_720.png'

  // TODO: 사진 업로드 모달 작업 필요함

  return (
    <button type='button' className={cx('profile-img', size, className, editAble && 'edit')} onClick={handleEditClick}>
      <div className={cx('profile-img__dimmed')}>
        <Icon iconName='CAMERA' size={isMobile ? MOBILE_ICON_SIZE[size] : PC_ICON_SIZE[size]} />
      </div>
      <img className='profile-img__img' src={src || DEFAULT_SRC} alt={alt} />
    </button>
  )
}

export default UserProfileImg
