import { useState, useEffect } from 'react'
import Head from 'next/head'
import { Router, useRouter } from 'next/router'
import NProgress from 'nprogress'
import themeConfig from 'src/configs/themeConfig'
import UserLayout from 'src/layouts/UserLayout'
import ThemeComponent from 'src/@core/theme/ThemeComponent'
import { SettingsConsumer, SettingsProvider } from 'src/@core/context/settingsContext'
import 'react-perfect-scrollbar/dist/css/styles.css'
import '../../styles/globals.css'
import { TimerProvider } from 'src/@core/context/TimerContext'

// ** Pace Loader
if (themeConfig.routingLoader) {
  Router.events.on('routeChangeStart', () => {
    NProgress.start()
  })
  Router.events.on('routeChangeError', () => {
    NProgress.done()
  })
  Router.events.on('routeChangeComplete', () => {
    NProgress.done()
  })
}

// ** Configure JSS & ClassName
const App = props => {
  const { Component, pageProps } = props

  // Variables
  const getLayout = Component.getLayout ?? (page => <UserLayout>{page}</UserLayout>)

  // For user in already login or not
  const router = useRouter()
  const [, setLoading] = useState(true)

  useEffect(() => {
    const loginToken = JSON.parse(localStorage.getItem('login-details'))

    // Redirect to login if no login details found
    if (!loginToken) {
      if (router.pathname !== '/login') {
        router.push('/login')
      }
    }

    setLoading(false)
  }, [router])

  return (
    <>
      <Head>
        <title>HRM</title>
        <meta name='description' content='Dashboard' />
        <meta name='keywords' content='HRM Super Admin Dashboard' />
        <meta name='viewport' content='initial-scale=1, width=device-width' />
        <link rel='icon' href='/favicon.png' />
      </Head>

      <TimerProvider>
        <SettingsProvider>
          <SettingsConsumer>
            {({ settings }) => {
              return <ThemeComponent settings={settings}>{getLayout(<Component {...pageProps} />)}</ThemeComponent>
            }}
          </SettingsConsumer>
        </SettingsProvider>
      </TimerProvider>
    </>
  )
}

export default App
