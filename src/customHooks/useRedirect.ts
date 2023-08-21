import { useRouter } from "next/router"
import { useEffect, useState } from "react"

export default function useRedirect(redirectTo = "/", seconds = 5) {
  const [secondsRemaining, setSecondsRemaining] = useState(seconds)
  const [activate, setActivate] = useState(false)

  const router = useRouter()

  const activateTimer = () => {
    setActivate(true)
  }

  useEffect(() => {
    if (!activate) return
    const timer = setTimeout(() => {
      setSecondsRemaining((prevSecondsRemaining) => prevSecondsRemaining - 1)
      if (secondsRemaining === 1) router.push(redirectTo)
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [router, secondsRemaining, redirectTo, activate])

  return { secondsRemaining, activateTimer }
}
