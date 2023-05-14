import '../styles/index.scss'
import Head from 'next/head'
import Script from 'next/script'
import type { AppContext, AppProps } from 'next/app'
import { FunctionComponent, useState } from 'react'
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { DefaultLayout } from '../shared/layout'
import { Provider, Session, useCreateStore } from '../shared/store/session'
import { sanitizeCookieString } from '../utils/cookie'
import { axiosAPI } from '../shared/api-client'
import { DefaultLayoutProps } from '../shared/types'

export type AppPropsWithLayout<P = Record<string, unknown>> = AppProps<P> & {
  Component: {
    Layout: FunctionComponent
    LayoutProps: DefaultLayoutProps
  }
  session?: Session
  isMobile?: boolean
}

declare global {
  interface Window {
    Kakao: any
  }
}

const CustomApp = ({ Component, pageProps, session, isMobile }: AppPropsWithLayout) => {
  const createStore = useCreateStore(session)

  const Layout: FunctionComponent<DefaultLayoutProps> = Component.Layout ?? DefaultLayout
  const LayoutProps: DefaultLayoutProps = Component.LayoutProps ?? {}

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
          <Hydrate state={pageProps?.dehydratedState}>
            <Provider createStore={createStore}>
              <Layout {...LayoutProps} isMobile={isMobile}>
                <Component {...pageProps} />
              </Layout>
              <div id='root-modal' />
            </Provider>
          </Hydrate>
          {process.env.NODE_ENV !== 'production' && <ReactQueryDevtools initialIsOpen={false} />}
        </QueryClientProvider>
      </div>
    </>
  )
}

CustomApp.getInitialProps = async ({ Component, ctx }: AppContext) => {
  const { req, res } = ctx

  const userAgent = req?.headers['user-agent']
  const isMobile = userAgent?.includes('Mobile')

  let pageProps: Record<string, any> = {}
  let session: Partial<Session> = {}
  const cookie = sanitizeCookieString(req?.headers?.cookie || '')

  let accessToken = { token: cookie.ACCESS_TOKEN_STORE ?? '', expiresIn: 0 }

  let refreshToken = { token: cookie.REFRESH_TOKEN_STORE ?? '', expiresIn: 0 }

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx)

    // if (pageProps.pageViewData) {
    //   pageViewData = { ...pageViewData, ...pageProps.pageViewData }
    // }
  }

  try {
    if (!accessToken.token) {
      if (!refreshToken.token) {
        // accessToken,refreshToken 둘다 없을 경우 api 호출 X
        return { ...pageProps, session, isMobile }
      }
      const reissueData = await axiosAPI
        .post('http://219.248.110.167:30800/reissue', {
          refreshToken: refreshToken.token,
        })
        .catch((e) => console.log('login error catched', e))
      accessToken = reissueData?.data?.access
      refreshToken = reissueData?.data?.refresh
    }

    // TODO: 에러 핸들링 해야할듯
    const { data: accessData } = await axiosAPI.get(
      `http://219.248.110.167:30800/check-token?token=${accessToken.token}&type=access`
    )

    accessToken = accessData?.access

    session = {
      ...session,
      accessToken: accessToken?.token,
      accessExpire: accessToken?.expiresIn,
      refreshToken: refreshToken?.token,
      refreshExpire: refreshToken?.expiresIn,
      nickname: accessData?.nickname,
    }
  } catch (e) {
    console.log('error catched', e)
  }

  return { ...pageProps, session, isMobile }
}

export default CustomApp
