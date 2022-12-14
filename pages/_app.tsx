import '../styles/index.scss'
import Head from 'next/head'
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
// TODO Kakao JS SDK Login
// declare global {
//   Kakao 함수를 전역에서 사용할 수 있도록 선언
//   interface Window {
//     Kakao: any
//   }
// }

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
  // TODO Kakao JS SDK Login
  // function kakaoInit() {
  //   window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY)
  //   console.log(window.Kakao.isInitialized())
  // }

  return (
    <>
      <Head>
        <meta name='referrer' content='unsafe-url' />
        <title>{LayoutProps?.metaTitle || '프로젝트 이름'}</title>
      </Head>
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
