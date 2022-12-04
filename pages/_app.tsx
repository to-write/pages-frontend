import '../styles/index.scss'
import Head from 'next/head'
import type { AppProps } from 'next/app'
import { FunctionComponent, useState } from 'react'
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { DefaultLayout } from '../shared/layout'

export type AppPropsWithLayout<P = Record<string, unknown>> = AppProps<P> & {
  Component: {
    Layout: FunctionComponent
    // FIXME: 추후 LayoutProps 정해지면 수정
    LayoutProps: any
  }
  // FIXME: 추후 Session store 정해지면 수정
  session?: any
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

  return (
    <>
      <Head>
        <meta name='referrer' content='unsafe-url' />
        <title>{LayoutProps?.metaTitle || '프로젝트 이름'}</title>
      </Head>
      <div className='app'>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <Layout {...LayoutProps}>
              <Component {...pageProps} />
            </Layout>
            <div id='root-modal' />
          </Hydrate>
          {process.env.NODE_ENV !== 'production' && <ReactQueryDevtools initialIsOpen={false} />}
        </QueryClientProvider>
      </div>
    </>
  )
}

export default App
