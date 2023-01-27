import '../styles/index.scss'
import Head from 'next/head'
import Script from 'next/script'
import type { AppProps } from 'next/app'
import { FunctionComponent, useState } from 'react'
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { DefaultLayout } from '../shared/layout'
import { GoogleOAuthProvider } from '@react-oauth/google'

export type AppPropsWithLayout<P = Record<string, unknown>> = AppProps<P> & {
  Component: {
    Layout: FunctionComponent
    // FIXME: 추후 LayoutProps 정해지면 수정
    LayoutProps: any
  }
  // FIXME: 추후 Session store 정해지면 수정
  session?: any
}

declare global {
  interface Window {
    Kakao: any
  }
}

const App = ({ Component, pageProps, session }: AppPropsWithLayout) => {
  const Layout = Component.Layout ?? DefaultLayout
  const LayoutProps = Component.LayoutProps ?? {}

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
      })
  )

  const initializeKakao = () => {
    window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY)
    console.log(window.Kakao.isInitialized())
  }

  return (
    <>
      <Head>
        <meta name='referrer' content='unsafe-url' />
        <title>{LayoutProps?.metaTitle || '프로젝트 이름'}</title>
      </Head>
      <Script
        src='https://t1.kakaocdn.net/kakao_js_sdk/2.1.0/kakao.min.js'
        integrity='sha384-dpu02ieKC6NUeKFoGMOKz6102CLEWi9+5RQjWSV0ikYSFFd8M3Wp2reIcquJOemx'
        crossOrigin='anonymous'
        onLoad={initializeKakao}
      />
      <div className='app'>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ''}>
              <Layout {...LayoutProps}>
                <Component {...pageProps} />
              </Layout>
            </GoogleOAuthProvider>
            <div id='root-modal' />
          </Hydrate>
          <ReactQueryDevtools initialIsOpen={process.env.NODE_ENV !== 'production'} />
        </QueryClientProvider>
      </div>
    </>
  )
}

export default App
