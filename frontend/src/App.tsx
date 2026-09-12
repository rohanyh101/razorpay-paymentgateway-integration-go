import { useEffect } from 'react'
import { CheckoutPage } from './pages/CheckoutPage'
import { FailurePage } from './pages/FailurePage'
import { SuccessPage } from './pages/SuccessPage'
import type { RazorpayOptions } from './types/payment'

import './styles/app.css'

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => { open: () => void }
  }
}

function RazorpayScript() {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.async = true
    document.body.appendChild(script)
    return () => script.remove()
  }, [])
  return null
}

function App() {
  const path = window.location.pathname
  if (path === '/success.html') return <SuccessPage />
  if (path === '/failure.html') return <FailurePage />
  return <><RazorpayScript /><CheckoutPage /></>
}

export default App
