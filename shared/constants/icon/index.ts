import {
  Back,
  Book,
  Close,
  GoogleIcon,
  Hamburger,
  Home,
  NotePencil,
  User,
  Camera,
  Kebab,
} from '../../../libs/assets/icons'
import { IconName, IconRes } from '../../types'

export const ICON_NAME: Record<IconName, IconRes> = {
  GOOGLE: GoogleIcon,
  BACK: Back,
  CLOSE: Close,
  HOME: Home,
  BOOK: Book,
  NOTE: NotePencil,
  USER: User,
  HAMBURGER: Hamburger,
  CAMERA: Camera,
  KEBAB: Kebab,
  // FIXME: 임시
  KAKAO: GoogleIcon,
}
