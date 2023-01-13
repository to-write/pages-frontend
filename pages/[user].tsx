import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

interface BookshelfPageProps {}

const BookshelfPage: React.FC<BookshelfPageProps> = () => {
  // props로 query
  const router = useRouter()
  const urlWithoutQs = router.asPath // 쿼리 스트링 부분 자르기

  useEffect(() => {
    router.replace(urlWithoutQs)
    // 2. 쿼리스트링 제외한 url로 리다이랙트
  }, [])
  return <div>Have a good coding</div>
}
export default BookshelfPage
