import "../styles/index.css"
import "react-toastify/dist/ReactToastify.css"

import { ToastContainer } from "react-toastify"
import createEmotionCache from "@/utils/createEmotionCache"
import { EmotionCache } from "@emotion/cache"
import { CacheProvider } from "@emotion/react"
import { NextComponentType } from "next"
import { AppInitialProps } from "next/app"
import { Router } from "next/router"

const clientSideEmotionCache = createEmotionCache()

interface AppProps extends AppInitialProps {
  Component: NextComponentType
  router: Router
  emotionCache: EmotionCache
}

export default function App({
  emotionCache = clientSideEmotionCache,
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <CacheProvider value={emotionCache}>
      <Component {...pageProps} />
      <ToastContainer position="bottom-right" autoClose={2000} />
    </CacheProvider>
  )
}
