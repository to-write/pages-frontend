import '../styles/index.scss'
import type { AppProps } from 'next/app'
import { Layout } from '../shared/components'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default App
