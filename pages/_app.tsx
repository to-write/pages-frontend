import type { AppProps } from 'next/app'
import Script from 'next/script'
import '../styles/index.scss'

declare global {
  interface Window {
    Kakao: any
  }
}

const App = ({ Component, pageProps }: AppProps) => {
  const kakaoInit = () => {
    window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY)
    console.log(window.Kakao.isInitialized()) // true
  }

  return (
    <>
      <Component {...pageProps} />
      <Script src='https://developers.kakao.com/sdk/js/kakao.js' onLoad={kakaoInit} />
    </>
  )
}

export default App
